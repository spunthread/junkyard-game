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
    case "NEXTTICK": {
      // TODO implementing next tick
      const { energy, level, yardtime, junkyard } = save;

      save.energy = Math.min(energy + 10, level * 100);

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

      return { ...save };
    }
    case "SKIPVEHICLE": {
      save.junkyard = null;
      save.yardtime = 30;
      return { ...save };
    }
    case "BUYVEHICLE": {
      const { money, junkyard, parking, parkingmax } = save;

      if (money < junkyard.price) {
        action.alert({
          type: "danger",
          title: "You're Broke !",
          text: "Not enough money to buy this vehicle."
        });
        return save;
      }

      if (parking.length === parkingmax) {
        action.alert({
          type: "warning",
          title: "Too Crammed Yo !",
          text: "Not enough space in the parking area."
        });
        return save;
      }

      save.money = money - junkyard.price;
      save.parking.push(junkyard);
      save.junkyard = null;
      save.yardtime = 60;
      action.alert({
        type: "success",
        title: "Vehicle Bought !",
        text: "The new vehicle is in the parking area."
      });
      return { ...save };
    }
    case "SAVEGAME": {
      localStorage.setItem("save", JSON.stringify(save));
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
  money: 500,
  points: 0,
  level: 1,
  energy: 60,
  parking: [],
  parkingmax: 1,
  garage: [],
  garagemax: 1,
  storage: [],
  storagemax: 1,
  junkyard: null,
  yardtime: 15,
  market: null
};

const storage = localStorage.getItem("save");

const initialSave = storage ? JSON.parse(storage) : defaultSave;
