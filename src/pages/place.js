import { useSave } from "../SaveContext";
import Junkyard from "./junkyard";
import Parking from "./parking";
import Garage from "./garage";
import Storage from "./storage";
import Market from "./market";
import "../assets/css/place.css";

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
