import { useSave } from "../SaveContext";

export default function Garage() {
  const { garage, garagemax } = useSave();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {garage.length}</p>
          <p>Space {garagemax}</p>
        </div>
        <div>
          <strong>${garagemax * 1e3}</strong>
          <button>Expand</button>
        </div>
      </aside>
    </fieldset>
  );
}
