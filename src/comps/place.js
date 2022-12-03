import { useSave } from "../SaveContext";
import Junkyard from "../pages/junkyard";
import Parking from "../pages/parking";
import Garage from "../pages/garage";
import Storage from "../pages/storage";
import Market from "../pages/market";

export default function Place() {
  const { place } = useSave();

  switch (place) {
    case 0:
      return <Junkyard />;
    case 1:
      return <Parking />;
    case 2:
      return <Garage />;
    case 3:
      return <Storage />;
    case 4:
      return <Market />;
    default:
      throw Error("Unknown place: " + place);
  }
}
