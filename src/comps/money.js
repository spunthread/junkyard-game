import { useSave } from "../SaveContext";
import "../assets/css/money.css";

export default function Money() {
  const { money } = useSave();

  return (
    <figure className="stats-item">
      <img src="/res/Dollar0.png" alt="Money" />
      <strong className="money-value text-success">{money.toFixed(2)}</strong>
    </figure>
  );
}
