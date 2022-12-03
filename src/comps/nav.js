import { useSave, useSaveDispatch } from "../SaveContext";

export default function Nav() {
  const { place } = useSave();
  const dispatch = useSaveDispatch();

  return (
    <nav>
      <ul>
        <li>
          <button
            disabled={place === 0}
            onClick={() => dispatch({ type: "CHANGEPLACE", place: 0 })}>
            Junkyard
          </button>
        </li>
        <li>
          <button
            disabled={place === 1}
            onClick={() => dispatch({ type: "CHANGEPLACE", place: 1 })}>
            Parking
          </button>
        </li>
        <li>
          <button
            disabled={place === 2}
            onClick={() => dispatch({ type: "CHANGEPLACE", place: 2 })}>
            Garage
          </button>
        </li>
        <li>
          <button
            disabled={place === 3}
            onClick={() => dispatch({ type: "CHANGEPLACE", place: 3 })}>
            Storage
          </button>
        </li>
      </ul>
    </nav>
  );
}
