import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Header() {
  const { save, dispatch } = useContext(GlobalContext);
  const { money, points, level, energy } = save;

  return (
    <header>
      <div>${money}</div>
      <div>
        <p>{points}</p>
        <p>{level}</p>
      </div>
      <div>
        <p>{energy}</p>
        <p>{level * 1e2}</p>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "SAVE" })}>Save</button>
      </div>
    </header>
  );
}
