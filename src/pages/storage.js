import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Storage() {
  const { save } = useContext(GlobalContext);
  const { storage, storagemax } = save;

  return (
    <section>
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
    </section>
  );
}
