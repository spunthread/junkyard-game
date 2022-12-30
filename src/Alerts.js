import { useCallback, useState } from "react";
import "./assets/css/alerts.css";

export function useAlertAction() {
  const [list, setList] = useState([]);

  const addAlert = useCallback(
    (alert) => {
      const id = setTimeout(() => delAlert(), 6e3);
      const delAlert = () => {
        clearTimeout(id);
        setList((l) => l.filter((a) => a.id !== id));
      };
      setList((l) => l.concat({ id, delAlert, ...alert }));
    },
    [setList]
  );

  return [list, addAlert];
}

function Alert({ type, title, text, delAlert }) {
  return (
    <h4 className={`alert alert-${type}`} role="alert" onClick={delAlert}>
      <div className="alert-title">{title}</div>
      <div className="alert-text">{text}</div>
    </h4>
  );
}

export function AlertContainer({ alerts }) {
  return (
    <aside>
      <section className="alert-container">
        {alerts.map((alert) => (
          <Alert key={alert.id} {...alert} />
        ))}
      </section>
    </aside>
  );
}
