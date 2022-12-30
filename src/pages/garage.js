import { useAlert, useSave, useSaveDispatch } from "../SaveContext";
import "../assets/css/garage.css";

export default function Garage() {
  const { garage, garagemax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <section className="place">
      <aside className="place-top">
        <div>
          {garage.size} / {garagemax}
        </div>
        <h2>Garage</h2>
        <div>
          <strong className="text-success">{garagemax * 2e3}</strong>
          <button onClick={() => dispatch({ type: "EXPANDGARAGE", alert })}>Expand</button>
        </div>
      </aside>
      <article className="place-down garage">
        {garage.size === 0 ? (
          <strong className="place-down-span">Garage is Empty</strong>
        ) : (
          Array.from(garage.values()).map((gv) => (
            <div className="garage-item" key={gv.id}>
              <figure className="garage-figone">
                <img src={`/res/${gv.name}.png`} alt={gv.name} />
                <span>{gv.name}</span>
              </figure>
              {gv.stage === -1 ? (
                <figcaption className="garage-figthree">
                  <strong className="text-warning">{gv.garage}</strong>
                  <button onClick={() => dispatch({ type: "WORKVEHICLE", vid: gv.id, alert })}>
                    Work
                  </button>
                </figcaption>
              ) : gv.stage === gv.parts.length ? (
                <figcaption className="garage-figthree">
                  <strong className="text-warning">{gv.storage}</strong>
                  <button onClick={() => dispatch({ type: "STOREVEHICLE", vid: gv.id, alert })}>
                    Store
                  </button>
                </figcaption>
              ) : (
                <>
                  <figure className="garage-figtwo">
                    <img
                      src={`/res/${gv.parts[gv.stage].name}.png`}
                      alt={gv.parts[gv.stage].name}
                    />
                    <span>{gv.parts[gv.stage].name}</span>
                  </figure>
                  <figcaption className="garage-figthree">
                    <strong>
                      {gv.time} - {gv.time - gv.parts[gv.stage].time}
                    </strong>
                    <progress
                      max={gv.time}
                      value={gv.time - gv.parts[gv.stage].time}></progress>
                  </figcaption>
                </>
              )}
            </div>
          ))
        )}
      </article>
    </section>
  );
}
