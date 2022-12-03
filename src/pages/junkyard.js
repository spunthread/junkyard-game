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
          Garage Cars: {garage.length}
          Garage Space {garagemax}
        </div>
        <div>
          Parking Cars: {parking.length}
          Parking Space {parkingmax}
        </div>
        <div>
          Storage Cars: {storage.length}
          Storage Space {storagemax}
        </div>
      </aside>
      <article>
        {Boolean(junkyard) ? (
          <>
            <figure>
              <img alt="." />
              <figcaption>${junkyard.price}</figcaption>
              <figcaption>{junkyard.name}</figcaption>
            </figure>
            <div>
              <button onClick={() => dispatch({ type: "SKIPVEHICLE", alert })}>Skip</button>
              <button onClick={() => dispatch({ type: "BUYVEHICLE", alert })}>Buy</button>
            </div>
          </>
        ) : (
          <h5>Next Please ...</h5>
        )}
        <h5>Timer: {yardtime} sec</h5>
      </article>
    </fieldset>
  );
}
