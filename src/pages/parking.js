import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Parking() {
  const { parking, parkingmax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {parking.size}</p>
          <p>Space {parkingmax}</p>
        </div>
        <div>
          <strong>${parkingmax * 1e3}</strong>
          <button onClick={() => dispatch({ type: "EXPANDPARKING", alert })}>Expand</button>
        </div>
      </aside>
      <article>
        {parking.size === 0 ? (
          <div>No Vehicles in Parking</div>
        ) : (
          <div>
            {Array.from(parking.values()).map((pv) => (
              <figure key={pv.id}>
                <img src={pv.imgsrc} alt={pv.name} />
                <figcaption>${pv.parking}</figcaption>
                <button onClick={() => dispatch({ type: "MOVEVEHICLE", vid: pv.id, alert })}>
                  Move
                </button>
              </figure>
            ))}
          </div>
        )}
      </article>
    </fieldset>
  );
}
