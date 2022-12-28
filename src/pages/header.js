import Money from "../comps/money";
import Level from "../comps/level";
import Energy from "../comps/energy";
import Savenow from "../comps/savenow";
import "../assets/css/header.css";

export default function Header() {
  return (
    <header className="upper">
      <Money />
      <Level />
      <Energy />
      <Savenow />
    </header>
  );
}
