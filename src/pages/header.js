import Money from "../comps/money";
import Level from "../comps/level";
import Energy from "../comps/energy";
import "../assets/css/header.css";

export default function Header() {
  return (
    <header className="stats">
      <Money />
      <Level />
      <Energy />
      {/* <Savenow /> */}
    </header>
  );
}
