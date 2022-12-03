import { useSave } from "../SaveContext";

export default function Storage() {
  const { storage, storagemax } = useSave();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {storage.length}</p>
          <p>Space {storagemax}</p>
        </div>
        <div>
          <strong>${storagemax * 1e3}</strong>
          <button>Expand</button>
        </div>
      </aside>
    </fieldset>
  );
}
