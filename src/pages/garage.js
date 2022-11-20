import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Garage() {
  const { save } = useContext(GlobalContext);
  const { garage, garagemax } = save;

  return (
    <section>
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
    </section>
  );
}
