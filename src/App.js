import { useEffect } from "react";
import { useAlert, useSaveDispatch } from "./SaveContext";
import Header from "./comps/header";
import Place from "./comps/place";
import Nav from "./comps/nav";

export default function App() {
  const alert = useAlert();
  const dispatch = useSaveDispatch();

  useEffect(() => {
    const iid = setInterval(() => dispatch({ type: "NEXTTICK", alert }), 1e3);
    return () => clearInterval(iid);
  }, [alert, dispatch]);

  return (
    <>
      <Header />
      <Place />
      <Nav />
    </>
  );
}
