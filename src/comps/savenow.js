import { useAlert, useSaveDispatch } from "../SaveContext";

export default function Savenow() {
  const alert = useAlert();
  const dispatch = useSaveDispatch();

  return (
    <aside>
      <button onClick={() => dispatch({ type: "SAVEGAME", alert })}>Save</button>
    </aside>
  );
}
