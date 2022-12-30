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
          <span className="rounded">
            Parking: {parking.size}/{parkingmax}
          </span>
          <span className="rounded">
            Garage: {garage.size}/{garagemax}
          </span>
          <span className="rounded">
            Storage: {storage.size}/{storagemax}
          </span>
        </div>
        <div className="junkyard-right">
          {Boolean(junkyard) ? (
            <figure className="first-child">
              <img src={`res/${junkyard.name}.png`} alt={junkyard.name} />
              <figcaption>{junkyard.name}</figcaption>
              <strong className="text-success">{junkyard.price.toFixed(2)}</strong>
              <span className="controls">
                <button onClick={() => dispatch({ type: "SKIPVEHICLE", alert })}>Skip</button>
                <button onClick={() => dispatch({ type: "BUYVEHICLE", alert })}>Buy</button>
              </span>
            </figure>
          ) : (
            <h3 className="first-child">Next Please ...</h3>
          )}
          <h3>Timer: {yardtime} sec</h3>
        </div>
      </article>
    </section>
  );
}
