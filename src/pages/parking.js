import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

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
        <div className="">
          <strong>{parkingmax * 1e3}</strong>
          <button onClick={() => dispatch({ type: "EXPANDPARKING", alert })}>Expand</button>
        </div>
      </aside>
      <article className="place-down">
        {parking.size === 0 ? (
          <span className="place-down-span">No Vehicles in Parking</span>
        ) : (
          Array.from(parking.values()).map((pv) => (
            <div key={pv.id}>
              <figure>
                <img src={pv.imgsrc} alt={pv.name} />
                <figcaption>{pv.parking}</figcaption>
                <button onClick={() => dispatch({ type: "MOVEVEHICLE", vid: pv.id, alert })}>
                  Move
                </button>
              </figure>
            </div>
          ))
        )}
      </article>
    </section>
  );
}
