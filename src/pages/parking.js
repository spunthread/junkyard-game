import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Parking() {
  const { save } = useContext(GlobalContext);
  const { parking, parkingmax } = save;

  return (
    <section>
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
    </section>
  );
}
