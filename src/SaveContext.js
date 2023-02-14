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
    // const callback = (timestamp) => {
    //   if (start === 0 || timestamp - start >= 1000) {
    //     start = timestamp;
    //     dispatch({ type: "NEXTTICK", alert });
    //   }
    //   rid = window.requestAnimationFrame(callback);
    // };
    let from = 0;
    const callback = (time) => {
      if (from !== 0) {
        dispatch({ type: "NEXTTICK", alert, tms: Math.round(time - from) });
      }
      from = time;
      rid = window.requestAnimationFrame(callback);
    };
    let rid = window.requestAnimationFrame(callback);
    return () => window.cancelAnimationFrame(rid);
  }, [alert, dispatch]);

  useEffect(() => {
    const saveGame = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem(
          "save",
          JSON.stringify(save, (_, value) =>
            value instanceof Map
              ? { dataType: "MAP", value: Array.from(value.entries()) }
              : value
          )
        );
      }
    };
    document.addEventListener("visibilitychange", saveGame);
    return () => document.removeEventListener("visibilitychange", saveGame);
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
