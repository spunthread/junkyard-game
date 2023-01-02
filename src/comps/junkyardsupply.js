import { useSave } from "../SaveContext";
import JunkyardVehicle from "./junkyardvehicle";

export default function JunkyardSupply() {
  const { yardtime } = useSave();

  return (
    <div className="junkyard-right">
      <JunkyardVehicle />
      <h3>Timer: {yardtime} sec</h3>
    </div>
  );
}
