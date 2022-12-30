import { useAlert, useSave, useSaveDispatch } from "../SaveContext";
import "../assets/css/parkingstorage.css";

export default function Parking() {
  const { parking, parkingmax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <section className="place">
      <aside className="place-top">
        <div>
          {parking.size} / {parkingmax}
        </div>
        <h2>Parking</h2>
        <div>
          <strong className="text-success">{parkingmax * 1e3}</strong>
          <button onClick={() => dispatch({ type: "EXPANDPARKING", alert })}>Expand</button>
        </div>
      </aside>
      <article className="place-down parking-storage">
        {parking.size === 0 ? (
          <strong className="place-down-span">Parking is Empty</strong>
        ) : (
          Array.from(parking.values()).map((pv) => (
            <figure key={pv.id}>
              <img src={`/res/${pv.name}.png`} alt={pv.name} />
              <figcaption className="parking controls">
                <strong className="text-warning">{pv.parking}</strong>
                <button onClick={() => dispatch({ type: "MOVEVEHICLE", vid: pv.id, alert })}>
                  Move
                </button>
              </figcaption>
            </figure>
          ))
        )}
      </article>
    </section>
  );
}
