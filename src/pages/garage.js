import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Garage() {
  const { garage, garagemax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {garage.size}</p>
          <p>Space {garagemax}</p>
        </div>
        <div>
          <strong>${garagemax * 2e3}</strong>
          <button onClick={() => dispatch({ type: "EXPANDGARAGE", alert })}>Expand</button>
        </div>
      </aside>
      <article>
        {garage.size === 0 ? (
          <p>No Vehicles in Garage</p>
        ) : (
          Array.from(garage.values()).map((gv) => (
            <div key={gv.id}>
              <figure>
                <img src={gv.imgsrc} alt={gv.name} />
                <figcaption>{gv.name}</figcaption>
              </figure>
              {gv.stage === -1 ? (
                <div>
                  <p>ϟ{gv.garage}</p>
                  <button onClick={() => dispatch({ type: "WORKVEHICLE", vid: gv.id, alert })}>
                    Start
                  </button>
                </div>
              ) : gv.stage === gv.parts.length ? (
                <div>
                  <p>ϟ{gv.storage}</p>
                  <button onClick={() => dispatch({ type: "STOREVEHICLE", vid: gv.id, alert })}>
                    Store
                  </button>
                </div>
              ) : (
                <>
                  <figure>
                    <img alt="." />
                    <figcaption>{gv.parts[gv.stage].name}</figcaption>
                  </figure>
                  <div>
                    <p>
                      <strong>{gv.time}</strong> -{" "}
                      <strong>{gv.time - gv.parts[gv.stage].time}</strong>
                    </p>
                    <progress
                      max={gv.time}
                      value={gv.time - gv.parts[gv.stage].time}></progress>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </article>
    </fieldset>
  );
}
