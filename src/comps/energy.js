import { useSave } from "../SaveContext";
import thunder from "../assets/images/thunder.png";

export default function Energy() {
  const { energy, level, energytime } = useSave();

  return (
    <figure className="stats-item">
      <img src={thunder} alt="energy" />
      <strong>
        {energy} / {level * 1e2}
      </strong>
      <progress value={30 - energytime} max={30}></progress>
    </figure>
  );
}
