import { writable } from "svelte/store";

const defaultSave = {
  money: 300,
  points: 0,
  level: 1,
  energy: 30,
  energytime: 30,
  parkingvehicles: new Map(),
  parkingmax: 1,
  garagevehicles: new Map(),
  garagemax: 1,
  storagevehicles: new Map(),
  storagemax: 1,
  junkyardvehicle: null,
  yardtime: 15,
  marketvehicleid: "",
  markettime: 3
};

function checkSave() {
  const storage = localStorage.getItem("save");

  if (storage) {
    try {
      return JSON.parse(storage, (key, value) => {
        let data;

        switch (key) {
          case "parkingvehicles":
          case "garagevehicles":
          case "storagevehicles":
            data = new Map(value);
            break;

          default:
            data = value;
            break;
        }

        return data;
      });
    } catch (error) {
      console.warn(error);
      return defaultSave;
    }
  } else {
    return defaultSave;
  }
}

export const save = writable(checkSave());

save.subscribe((data) => {
  localStorage.setItem(
    "save",
    JSON.stringify(data, (key, value) => {
      let data;

      switch (key) {
        case "parkingvehicles":
        case "garagevehicles":
        case "storagevehicles":
          data = Array.from(value.entries());
          break;

        default:
          data = value;
          break;
      }

      return data;
    })
  );
});
