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
          <p>No Vehicles in Parking</p>
        ) : (
          Array.from(parking.values()).map((pv) => (
            <div key={pv.id}>
              <figure>
                <img src={pv.imgsrc} alt={pv.name} />
                <figcaption>ϟ{pv.parking}</figcaption>
                <button onClick={() => dispatch({ type: "MOVEVEHICLE", vid: pv.id, alert })}>
                  Move
                </button>
              </figure>
            </div>
          ))
        )}
      </article>
    </fieldset>
  );
}
