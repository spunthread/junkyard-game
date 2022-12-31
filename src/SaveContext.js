import { createContext, useContext, useEffect } from "react";
import { AlertContainer, useAlertAction } from "./Alerts";
import useSaveReducer from "./SaveReducer";

const AlertContext = createContext(null);
const SaveContext = createContext(null);
const SaveDispatchContext = createContext(null);

export function useAlert() {
  return useContext(AlertContext);
}

export function useSave() {
  return useContext(SaveContext);
}

export function useSaveDispatch() {
  return useContext(SaveDispatchContext);
}

export function SaveProvider({ children }) {
  const [alerts, alert] = useAlertAction();
  const [save, dispatch] = useSaveReducer();

  useEffect(() => {
    const iid = setInterval(() => dispatch({ type: "NEXTTICK", alert }), 1e3);
    return () => clearInterval(iid);
  }, [alert, dispatch]);

  useEffect(() => {
    const saveGame = (evt) => {
      evt.preventDefault();
      localStorage.setItem(
        "save",
        JSON.stringify(save, (_, value) =>
          value instanceof Map ? { dataType: "MAP", value: Array.from(value.entries()) } : value
        )
      );
      return (evt.returnValue = "See Ya Later ?");
    };
    window.addEventListener("beforeunload", saveGame, { passive: true, once: true });
    return () => window.removeEventListener("beforeunload", saveGame);
  }, [save]);

  return (
    <SaveContext.Provider value={save}>
      <SaveDispatchContext.Provider value={dispatch}>
        <AlertContext.Provider value={alert}>
          <>
            {children}
            <AlertContainer alerts={alerts} />
          </>
        </AlertContext.Provider>
      </SaveDispatchContext.Provider>
    </SaveContext.Provider>
  );
}
