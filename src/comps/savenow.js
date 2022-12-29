import { useAlert, useSaveDispatch } from "../SaveContext";

export default function Savenow() {
  const alert = useAlert();
  const dispatch = useSaveDispatch();

  return (
    <aside className="stats-item">
      <button onClick={() => dispatch({ type: "SAVEGAME", alert })}>Save</button>
    </aside>
  );
}
