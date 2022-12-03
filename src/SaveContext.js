import { createContext, useContext, useReducer } from "react";
import { AlertContainer, useAlertAction } from "./Alerts";
import Vehicle from "./VehicleFactory";

const AlertContext = createContext(null);

const SaveContext = createContext(null);

const SaveDispatchContext = createContext(null);

export function SaveProvider({ children }) {
  const [alerts, alert] = useAlertAction();
  const [save, dispatch] = useReducer(saveReducer, initialSave);

  return (
    <SaveContext.Provider value={save}>
      <SaveDispatchContext.Provider value={dispatch}>
        <AlertContext.Provider value={alert}>
          <>
            {children}
            <AlertContainer alerts={alerts} />
          </>
        </AlertContext.Provider>
      </SaveDispatchContext.Provider>
    </SaveContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

export function useSave() {
  return useContext(SaveContext);
}

export function useSaveDispatch() {
  return useContext(SaveDispatchContext);
}

function saveReducer(save, action) {
  switch (action.type) {
    case "CHANGEPLACE": {
      save.place = action.place;
      return { ...save };
    }
    case "EXPANDPARKING": {
      const { money, parkingmax } = save;

      if (money < parkingmax * 1e3) {
        action.alert({
          type: "danger",
          title: "You're Broke !",
          text: "Not enough money to expand parking space."
        });
        return save;
      }

      save.money = money - parkingmax * 1e3;
      save.parkingmax = parkingmax + 1;
      action.alert({
        type: "success",
        title: "Parking Expanded !",
        text: "Parking space has now been expanded for use."
      });
      return { ...save };
    }
    case "EXPANDGARAGE": {
      const { money, garagemax } = save;

      if (money < garagemax * 2e3) {
        action.alert({
          type: "danger",
          title: "You're Broke !",
          text: "Not enough money to expand garage space."
        });
        return save;
      }

      save.money = money - garagemax * 2e3;
      save.garagemax = garagemax + 1;
      action.alert({
        type: "success",
        title: "Garage Expanded !",
        text: "Garage space has now been expanded for use."
      });
      return { ...save };
    }
    case "EXPANDSTORAGE": {
      const { money, storagemax } = save;

      if (money < storagemax * 15e2) {
        action.alert({
          type: "danger",
          title: "You're Broke !",
          text: "Not enough money to expand storage space."
        });
        return save;
      }

      save.money = money - storagemax * 15e2;
      save.storagemax = storagemax + 1;
      action.alert({
        type: "success",
        title: "Storage Expanded !",
        text: "Storage space has now been expanded for use."
      });
      return { ...save };
    }
    case "NEXTTICK": {
      // TODO implementing next tick
      const { energy, energytime, level, yardtime, junkyard, garage } = save;

      if (energytime === 0) {
        save.energy = Math.min(energy + 10, level * 100);
        save.energytime = 30;
      } else {
        save.energytime = energytime - 1;
      }

      if (yardtime === 0) {
        if (junkyard === null) {
          save.junkyard = new Vehicle(level);
          save.yardtime = 30;
          action.alert({
            type: "info",
            title: "New Vehicle !",
            text: "Grabe it before it's too late."
          });
        } else {
          save.junkyard = null;
          save.yardtime = 90;
        }
      } else {
        save.yardtime = yardtime - 1;
      }

      Array.from(garage.values()).forEach((gv) => {
        const { stage, parts } = gv;
        if (!isNaN(stage) && stage > -1) {
          if (parts[stage].time === 0) {
            if (stage + 1 === parts.length) {
              gv.stage = -1;
              gv.time = 0;
              action.alert({
                type: "info",
                title: "Vehicle Done !",
                text: "A vhicle has been dismantled completely."
              });
            } else {
              gv.stage = stage + 1;
              gv.time = parts[stage + 1].time;
            }
          } else {
            parts[stage].time -= 1;
          }
        }
      });

      return { ...save };
    }
    case "SKIPVEHICLE": {
      save.junkyard = null;
      save.yardtime = 30;
      return { ...save };
    }
    case "BUYVEHICLE": {
      const { money, points, level, junkyard, parking, parkingmax } = save;

      if (money < junkyard.price) {
        action.alert({
          type: "danger",
          title: "You're Broke !",
          text: "Not enough money to buy this vehicle."
        });
        return save;
      }

      if (parking.size === parkingmax) {
        action.alert({
          type: "warning",
          title: "Too Crammed Yo !",
          text: "Not enough space in the parking area."
        });
        return save;
      }

      save.money = money - junkyard.price;
      save.points = (points + junkyard.level) % (level * 1e3);
      save.level = level + (points + junkyard.level >= level * 1e3);
      save.parking.set(junkyard.id, junkyard);
      save.junkyard = null;
      save.yardtime = 60;
      action.alert({
        type: "success",
        title: "Vehicle Bought !",
        text: "The new vehicle is in the parking area."
      });
      return { ...save };
    }
    case "MOVEVEHICLE": {
      const { energy, parking, garage, garagemax } = save;
      const vehicle = parking.get(action.vid);

      if (energy < vehicle.parking) {
        action.alert({
          type: "danger",
          title: "You're Tired !",
          text: "Not enough energy to move this vehicle."
        });
        return save;
      }

      if (garage.size === garagemax) {
        action.alert({
          type: "warning",
          title: "Too Crammed Yo !",
          text: "Not enough space in the garage area."
        });
        return save;
      }

      save.energy = energy - vehicle.parking;
      save.garage.set(action.vid, vehicle);
      save.parking.delete(action.vid);
      action.alert({
        type: "success",
        title: "Vehicle Moved !",
        text: "The vehicle has been moved in the garage area."
      });
      return { ...save };
    }
    case "WORKVEHICLE": {
      const { energy, garage } = save;
      const vehicle = garage.get(action.vid);

      if (energy < vehicle.garage) {
        action.alert({
          type: "danger",
          title: "You're Tired !",
          text: "Not enough energy to work on this vehicle."
        });
        return save;
      }

      save.energy = energy - vehicle.garage;
      vehicle.stage = 0;
      vehicle.time = vehicle.parts[0].time;
      return { ...save };
    }
    case "STOREVEHICLE": {
      const { energy, points, level, garage, storage, storagemax } = save;
      const vehicle = garage.get(action.vid);

      if (energy < vehicle.storage) {
        action.alert({
          type: "danger",
          title: "You're Tired !",
          text: "Not enough energy to store this vehicle's parts."
        });
        return save;
      }

      if (storage.size === storagemax) {
        action.alert({
          type: "warning",
          title: "Too Crammed Yo !",
          text: "Not enough space in the storage area."
        });
        return save;
      }

      save.energy = energy - vehicle.storage;
      save.points = (points + vehicle.level * 10) % (level * 1e3);
      save.level = level + (points + vehicle.level * 10 >= level * 1e3);
      save.storage.set(action.vid, vehicle);
      save.garage.delete(action.vid);
      action.alert({
        type: "success",
        title: "Vehicle Stored !",
        text: "The vehicle's parts has been stored in the storage area."
      });
      return { ...save };
    }
    case "SAVEGAME": {
      localStorage.setItem(
        "save",
        JSON.stringify(save, (_, value) =>
          value instanceof Map ? { dataType: "Map", value: Array.from(value.entries()) } : value
        )
      );
      action.alert({
        type: "success",
        title: "Game Saved !",
        text: "See you very soon."
      });
      return save;
    }
    default: {
      throw Error("Unknown action type: " + action.type);
    }
  }
}

const defaultSave = {
  place: 0,
  money: 5000,
  points: 0,
  level: 1,
  energy: 60,
  energytime: 30,
  parking: new Map(),
  parkingmax: 1,
  garage: new Map(),
  garagemax: 1,
  storage: new Map(),
  storagemax: 1,
  junkyard: null,
  yardtime: 15,
  market: null
};

const storage = localStorage.getItem("save");

const initialSave = storage
  ? JSON.parse(storage, (_, value) =>
      typeof value === "object" && value !== null && value.dataType === "Map"
        ? new Map(value.value)
        : value
    )
  : defaultSave;
