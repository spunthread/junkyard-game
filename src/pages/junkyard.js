import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Junkyard() {
  const { save } = useContext(GlobalContext);
  const { junkyard, yardtime, garage, garagemax, parking, parkingmax, storage, storagemax } =
    save;

  return (
    <section>
      <aside>
        <div>
          Garage Cars: {garage.length}
          Garage Space {garagemax}
        </div>
        <div>
          Parking Cars: {parking.length}
          Parking Space {parkingmax}
        </div>
        <div>
          Storage Cars: {storage.length}
          Storage Space {storagemax}
        </div>
      </aside>
      <article>
        {Boolean(junkyard) ? (
          <>
            <figure>
              <img alt="." />
              <figcaption>${junkyard.price}</figcaption>
              <figcaption>{junkyard.name}</figcaption>
            </figure>
            <div>
              <button>Skip</button>
              <button>Buy</button>
            </div>
          </>
        ) : (
          <h5>Next Please ...</h5>
        )}
        <h5>Timer: {yardtime} sec</h5>
      </article>
    </section>
  );
}
