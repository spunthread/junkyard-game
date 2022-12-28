import Navbutton from "../comps/navbutton";

export default function Nav() {
  return (
    <nav>
      <Navbutton toPlace={0}>Junkyard</Navbutton>
      <Navbutton toPlace={1}>Parking</Navbutton>
      <Navbutton toPlace={2}>Garage</Navbutton>
      <Navbutton toPlace={3}>Storage</Navbutton>
    </nav>
  );
}
