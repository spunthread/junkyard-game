import { useSave } from "../SaveContext";

export default function Parking() {
  const { parking, parkingmax } = useSave();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {parking.length}</p>
          <p>Space {parkingmax}</p>
        </div>
        <div>
          <strong>${parkingmax * 1e3}</strong>
          <button>Expand</button>
        </div>
      </aside>
    </fieldset>
  );
}
