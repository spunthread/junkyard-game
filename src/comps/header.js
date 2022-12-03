import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Header() {
  const { money, points, level, energy } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <header>
      <div>${money.toFixed(2)}</div>
      <div>
        <p>{points}</p>
        <p>{level}</p>
      </div>
      <div>
        <p>{energy}</p>
        <p>{level * 1e2}</p>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "SAVEGAME", alert })}>Save</button>
      </div>
    </header>
  );
}
