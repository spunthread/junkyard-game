import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Storage() {
  const { storage, storagemax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <section className="place">
      <aside className="place-top">
        <div>
          {storage.size} / {storagemax}
        </div>
        <h2>Storage</h2>
        <div className="">
          <strong>{storagemax * 15e2}</strong>
          <button onClick={() => dispatch({ type: "EXPANDSTORAGE", alert })}>Expand</button>
        </div>
      </aside>
      <article className="place-down">
        {storage.size === 0 ? (
          <span className="place-down-span">No Vehicles in Parking</span>
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
