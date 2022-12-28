import { useSave, useSaveDispatch } from "../SaveContext";

export default function Navbutton({ toPlace, children }) {
  const { place } = useSave();
  const dispatch = useSaveDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch({ type: "CHANGEPLACE", place: toPlace })}
        disabled={place === toPlace}>
        {children}
      </button>
    </div>
  );
}
