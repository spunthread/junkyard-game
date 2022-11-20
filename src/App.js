import { useEffect, useReducer, useState } from "react";
import { GlobalContext, globalReducer, globalState } from "./GlobalContext";
import Header from "./comps/header";
import Storage from "./pages/storage";
import Garage from "./pages/garage";
import Market from "./pages/market";
import Parking from "./pages/parking";
import Junkyard from "./pages/junkyard";

export default function App() {
  const [loc, setLoc] = useState(0);

  const [save, dispatch] = useReducer(globalReducer, globalState);

  // energy auto increase timer
  useEffect(() => {
    const eid = setInterval(() => dispatch({ type: "ENERGYTIME" }), 3e4);
    return () => clearInterval(eid);
  }, []);

  // junkyard vehicle timer
  useEffect(() => {
    const yid = setInterval(() => {
      const { yardtime, junkyard } = save;
      if (yardtime === 0) {
        if (junkyard === null) {
          dispatch({ type: "NEWVEHICLE" });
        } else {
          dispatch({ type: "DELETEVEHICLE" });
        }
      } else {
        dispatch({ type: "KILLTIME", payload: yardtime - 1 });
      }
    }, 1e3);

    return () => clearInterval(yid);
  }, [save.junkyard, save.yardtime]);

  return (
    <GlobalContext.Provider value={{ save, dispatch }}>
      <Header />

      {loc === 0 && <Junkyard />}
      {loc === 1 && <Parking />}
      {loc === 2 && <Garage />}
      {loc === 3 && <Storage />}
      {loc === 4 && <Market />}

      <nav>
        <ul>
          <li>
            <button disabled={loc === 0} onClick={() => setLoc(0)}>
              Junkyard
            </button>
          </li>
          <li>
            <button disabled={loc === 1} onClick={() => setLoc(1)}>
              Parking
            </button>
          </li>
          <li>
            <button disabled={loc === 2} onClick={() => setLoc(2)}>
              Garage
            </button>
          </li>
          <li>
            <button disabled={loc === 3} onClick={() => setLoc(3)}>
              Storage
            </button>
          </li>
        </ul>
      </nav>
    </GlobalContext.Provider>
  );
}
