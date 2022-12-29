import { useSave } from "../SaveContext";
import dollar from "../assets/images/dollar.png";
import "../assets/css/money.css";

export default function Money() {
  const { money } = useSave();

  return (
    <figure className="stats-item">
      <img src={dollar} alt="money" />
      <strong className="money-value">{money.toFixed(2)}</strong>
    </figure>
  );
}
