import { useSave } from "../SaveContext";

export default function Energy() {
  const { energy, level, energytime } = useSave();

  return (
    <figure className="stats-item">
      <img src="res/Energy0.png" alt="Energy" />
      <strong className="text-warning">
        {energy} / {level * 1e2}
      </strong>
      <progress value={30 - energytime} max={30}></progress>
    </figure>
  );
}
