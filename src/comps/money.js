import { useSave } from "../SaveContext";
import dollar from "../assets/images/dollar.png";

export default function Money() {
  const { money } = useSave();

  return (
    <figure className="">
      <img src={dollar} alt="money" />

      <figcaption>
        <p>Money</p>

        <strong>${money.toFixed(2)}</strong>
      </figcaption>
    </figure>
  );
}
