import { useAlert, useSave, useSaveDispatch } from "../SaveContext";
import "../assets/css/junkyard.css";

export default function Junkyard() {
  const { junkyard, yardtime, garage, garagemax, parking, parkingmax, storage, storagemax } =
    useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <section className="place">
      <aside className="place-top">
        <h2 className="place-top-span">Junkyard</h2>
      </aside>
      <article className="place-down junkyard">
        <div className="junkyard-left">
          <p>
            Parking:{" "}
            <strong>
              {parking.size}/{parkingmax}
            </strong>
          </p>
          <p>
            Garage:{" "}
            <strong>
              {garage.size}/{garagemax}
            </strong>
          </p>
          <p>
            Storage:{" "}
            <strong>
              {storage.size}/{storagemax}
            </strong>
          </p>
        </div>
        <div className="junkyard-right">
          {Boolean(junkyard) ? (
            <figure className="junkyard-figure">
              <img src={junkyard.imgsrc} alt={junkyard.name} />
              <figcaption>{junkyard.name}</figcaption>
              <figcaption>
                <strong>${junkyard.price.toFixed(2)}</strong>
              </figcaption>
              <figcaption className="junkyard-controls">
                <button onClick={() => dispatch({ type: "SKIPVEHICLE", alert })}>Skip</button>
                <button onClick={() => dispatch({ type: "BUYVEHICLE", alert })}>Buy</button>
              </figcaption>
            </figure>
          ) : (
            <h3>Next Please ...</h3>
          )}
          <h3>Timer: {yardtime} sec</h3>
        </div>
      </article>
    </section>
  );
}
