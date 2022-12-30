import { useReducer } from "react";
import Vehicle from "./VehicleFactory";

export default function useSaveReducer() {
  const storage = localStorage.getItem("save");

  const defaultSave = {
    place: 0,
    money: 500,
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
    market: null,
    marktime: 3
  };

  const initialSave = storage
    ? JSON.parse(storage, (_, value) =>
        typeof value === "object" && value !== null && value.dataType === "MAP"
          ? new Map(value.value)
          : value
      )
    : defaultSave;

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
            text: "Not enough money to expand Parking."
          });
          return save;
        }

        save.money = money - parkingmax * 1e3;
        save.parkingmax = parkingmax + 1;
        action.alert({
          type: "success",
          title: "Parking Expanded !",
          text: `Maximum upto ${parkingmax + 1} Vehicles.`
        });
        return { ...save };
      }
      case "EXPANDGARAGE": {
        const { money, garagemax } = save;

        if (money < garagemax * 2e3) {
          action.alert({
            type: "danger",
            title: "You're Broke !",
            text: "Not enough money to expand Garage."
          });
          return save;
        }

        save.money = money - garagemax * 2e3;
        save.garagemax = garagemax + 1;
        action.alert({
          type: "success",
          title: "Garage Expanded !",
          text: `Maximum upto ${garagemax + 1} Vehicles.`
        });
        return { ...save };
      }
      case "EXPANDSTORAGE": {
        const { money, storagemax } = save;

        if (money < storagemax * 15e2) {
          action.alert({
            type: "danger",
            title: "You're Broke !",
            text: "Not enough money to expand Storage."
          });
          return save;
        }

        save.money = money - storagemax * 15e2;
        save.storagemax = storagemax + 1;
        action.alert({
          type: "success",
          title: "Storage Expanded !",
          text: `Maximum upto ${storagemax + 1} Vehicles.`
        });
        return { ...save };
      }
      case "NEXTTICK": {
        const {
          place,
          energy,
          energytime,
          level,
          yardtime,
          junkyard,
          garage,
          market,
          marktime
        } = save;

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
              text: "Grabe it before it's gone."
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
          if (stage > -1 && stage < parts.length) {
            if (parts[stage].time === 0) {
              gv.stage = stage + 1;
              if (stage + 1 === parts.length) {
                gv.time = 0;
                action.alert({
                  type: "info",
                  title: "Vehicle Overhauled !",
                  text: "Store the parts for selling."
                });
              } else {
                gv.time = parts[stage + 1].time;
              }
            } else {
              parts[stage].time -= 1;
            }
          }
        });

        if (market !== null) {
          if (marktime === 0) {
            if (place === 4) {
              save.market.stage += 1;
            }
            save.marktime = 3;
          } else {
            save.marktime = marktime - 1;
          }
        }

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
            text: "Not enough money for Vehicle."
          });
          return save;
        }

        if (parking.size === parkingmax) {
          action.alert({
            type: "warning",
            title: "Too Crammed !",
            text: "Not enough space in Parking."
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
          text: "Find it in the Parking."
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
            text: "Not enough energy for Vehicle."
          });
          return save;
        }

        if (garage.size === garagemax) {
          action.alert({
            type: "warning",
            title: "Too Crammed !",
            text: "Not enough space in Garage."
          });
          return save;
        }

        save.energy = energy - vehicle.parking;
        save.garage.set(action.vid, vehicle);
        save.parking.delete(action.vid);
        action.alert({
          type: "success",
          title: "Vehicle Moved !",
          text: "Overhaul it in the Garage."
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
            text: "Not enough energy for Vehicle."
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
            text: "Not enough energy for Vehicle."
          });
          return save;
        }

        if (storage.size === storagemax) {
          action.alert({
            type: "warning",
            title: "Too Crammed !",
            text: "Not enough space in Storage."
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
          text: "Sell it's parts from the Storage."
        });
        return { ...save };
      }
      case "SELLVEHICLE": {
        const { storage } = save;
        const vehicle = storage.get(action.vid);
        save.market = vehicle;
        save.place = 4;
        return { ...save };
      }
      case "SELLPART": {
        const { money, points, level, market, storage } = save;

        save.money = money + action.price;
        save.points = (points + market.level) % (level * 1e3);
        save.level = level + (points + market.level >= level * 1e3);
        market.parts[action.pix].price = action.price;

        if (market.parts.every((p) => p.price > 0)) {
          storage.delete(market.id);
          action.alert({
            type: "success",
            title: "Vehicle Sold !",
            text: "All Vehicle parts sold."
          });
        }

        return { ...save };
      }
      default: {
        throw Error("Unknown action type: " + action.type);
      }
    }
  }

  return useReducer(saveReducer, initialSave);
}
