import { useSave } from "../SaveContext";
import PlaceStat from "./placestat";

export default function JunkyardStats() {
  const { garage, garagemax, parking, parkingmax, storage, storagemax } = useSave();
  return (
    <div className="junkyard-left">
      <PlaceStat place="Parking" size={parking.size} max={parkingmax} />
      <PlaceStat place="Garage" size={garage.size} max={garagemax} />
      <PlaceStat place="Parking" size={storage.size} max={storagemax} />
    </div>
  );
}
