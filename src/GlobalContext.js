import { createContext } from "react";
import Vehicle from "./VehicleFactory";

export const GlobalContext = createContext();

const defaultSave = {
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

  // more would acumulate ...
};

const storage = localStorage.getItem("save");

export const globalState = storage ? JSON.parse(storage) : defaultSave;

export const globalReducer = (save, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ENERGYTIME": {
      const { energy, level } = save;
      return { ...save, energy: Math.min(energy + 10, level * 100) };
    }
    case "USEENERGY": {
      const { energy } = save;
      return { ...save, energy: energy - payload };
    }
    case "KILLTIME": {
      return { ...save, yardtime: payload };
    }
    case "SKIPVEHICLE": {
      return { ...save, junkyard: null, yardtime: 30 };
    }
    case "BUYVEHICLE": {
      const { money, junkyard, parking } = save;
      return {
        ...save,
        money: money - junkyard.price,
        parking: parking.concat(junkyard),
        junkyard: null,
        yardtime: 60
      };
    }
    case "GENERATEVEHICLE": {
      const { level } = save;
      const vehicle = new Vehicle(level);
      return { ...save, junkyard: vehicle, yardtime: 30 };
    }
    case "DESTROYVEHICLE": {
      return { ...save, junkyard: null, yardtime: 90 };
    }
    case "SAVE": {
      localStorage.setItem("save", JSON.stringify(save));
      return save;
    }
    default:
      return save;
  }
};

// the entire app and all it's sub components re-renders every dispatch
// react dom diffs the markup but still has to re-run all js layer logics
// check render behaviour with context consumers
// ideally try to abstract the save as a class with props and methods
