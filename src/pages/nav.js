import Navbutton from "../comps/navbutton";
import "../assets/css/nav.css";

export default function Nav() {
  return (
    <nav className="navs">
      <Navbutton toPlace={0}>Junkyard</Navbutton>
      <Navbutton toPlace={1}>Parking</Navbutton>
      <Navbutton toPlace={2}>Garage</Navbutton>
      <Navbutton toPlace={3}>Storage</Navbutton>
    </nav>
  );
}
