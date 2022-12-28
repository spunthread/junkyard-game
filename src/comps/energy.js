import thunder from "../assets/images/thunder.png";
import { useSave } from "../SaveContext";

export default function Energy() {
  const { energy, level, energytime } = useSave();
  return (
    <figure className="header-figure">
      <img src={thunder} alt="energy" />

      <figcaption>
        <p>
          Energy{" "}
          <strong>
            {energy}/{level * 1e2}
          </strong>
        </p>

        <progress value={30 - energytime} max={30}></progress>
      </figcaption>
    </figure>
  );
}
