import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Storage() {
  const { storage, storagemax } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <fieldset>
      <aside>
        <div>
          <p>Cars: {storage.size}</p>
          <p>Space {storagemax}</p>
        </div>
        <div>
          <strong>${storagemax * 15e2}</strong>
          <button onClick={() => dispatch({ type: "EXPANDSTORAGE", alert })}>Expand</button>
        </div>
      </aside>
    </fieldset>
  );
}
