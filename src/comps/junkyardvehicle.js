import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function JunkyardVehicle() {
  const { junkyard } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return Boolean(junkyard) ? (
    <figure className="first-child">
      <img src={`res/${junkyard.name}.png`} alt={junkyard.name} />
      <figcaption>{junkyard.name}</figcaption>
      <strong className="text-success">{junkyard.price.toFixed(2)}</strong>
      <span className="controls">
        <button onClick={() => dispatch({ type: "SKIPVEHICLE", alert })}>Skip</button>
        <button onClick={() => dispatch({ type: "BUYVEHICLE", alert })}>Buy</button>
      </span>
    </figure>
  ) : (
    <h3 className="first-child">Next Please ...</h3>
  );
}
