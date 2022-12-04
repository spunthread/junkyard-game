import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Storage() {
  const { storage, storagemax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <section>
      <aside>
        <div>
          <p>Cars: {storage.size}</p>
          <p>Space {storagemax}</p>
        </div>
        <h2>Storage</h2>
        <div>
          <strong>${storagemax * 15e2}</strong>
          <button onClick={() => dispatch({ type: "EXPANDSTORAGE", alert })}>Expand</button>
        </div>
      </aside>
      <article>
        {storage.size === 0 ? (
          <p>No Vehicles in Storage</p>
        ) : (
          Array.from(storage.values()).map((sv) => (
            <div key={sv.id}>
              <figure>
                <img src={sv.imgsrc} alt={sv.name} />
                <button onClick={() => dispatch({ type: "SELLVEHICLE", vid: sv.id })}>
                  Sell
                </button>
              </figure>
            </div>
          ))
        )}
      </article>
    </section>
  );
}
