import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Junkyard() {
  const { junkyard, yardtime, garage, garagemax, parking, parkingmax, storage, storagemax } =
    useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <fieldset>
      <aside>
        <div>
          Parking Cars: {parking.size}
          Parking Space {parkingmax}
        </div>
        <div>
          Garage Cars: {garage.size}
          Garage Space {garagemax}
        </div>
        <div>
          Storage Cars: {storage.size}
          Storage Space {storagemax}
        </div>
      </aside>
      <article>
        <div>
          {Boolean(junkyard) ? (
            <figure>
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
            <h4>Next Please ...</h4>
          )}
          <h5>Timer: {yardtime} sec</h5>
        </div>
      </article>
    </fieldset>
  );
}
