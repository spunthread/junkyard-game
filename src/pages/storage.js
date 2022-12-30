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
          <strong className="text-success">{storagemax * 15e2}</strong>
          <button onClick={() => dispatch({ type: "EXPANDSTORAGE", alert })}>Expand</button>
        </div>
      </aside>
      <article className="place-down parking-storage">
        {storage.size === 0 ? (
          <strong className="place-down-span">Storage is Empty</strong>
        ) : (
          Array.from(storage.values()).map((sv) => (
            <figure key={sv.id}>
              <img src={`res/${sv.name}.png`} alt={sv.name} />
              <button onClick={() => dispatch({ type: "SELLVEHICLE", vid: sv.id })}>
                Sell
              </button>
            </figure>
          ))
        )}
      </article>
    </section>
  );
}
