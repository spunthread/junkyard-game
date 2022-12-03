import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Garage() {
  const { garage, garagemax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {garage.size}</p>
          <p>Space {garagemax}</p>
        </div>
        <div>
          <strong>${garagemax * 2e3}</strong>
          <button onClick={() => dispatch({ type: "EXPANDGARAGE", alert })}>Expand</button>
        </div>
      </aside>
    </fieldset>
  );
}
