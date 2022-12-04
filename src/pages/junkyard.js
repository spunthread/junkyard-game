import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Junkyard() {
  const { junkyard, yardtime, garage, garagemax, parking, parkingmax, storage, storagemax } =
    useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <section>
      <aside>
        <h2>Junkyard</h2>
      </aside>
      <article className="junkyard-article">
        <div>
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
        <div>
          {Boolean(junkyard) ? (
            <figure className="junkyard-figure">
              <img src={junkyard.imgsrc} alt={junkyard.name} />
              <figcaption>{junkyard.name}</figcaption>
              <figcaption>
                <strong>${junkyard.price.toFixed(2)}</strong>
              </figcaption>
              <figcaption>
                <button onClick={() => dispatch({ type: "SKIPVEHICLE", alert })}>Skip</button>
                <button onClick={() => dispatch({ type: "BUYVEHICLE", alert })}>Buy</button>
              </figcaption>
            </figure>
          ) : (
            <h3>Next Please ...</h3>
          )}
          <h4>Timer: {yardtime} sec</h4>
        </div>
      </article>
    </section>
  );
}
