import { useSave } from "../SaveContext";

export default function Level() {
  const { level, points } = useSave();

  return (
    <figure className="stats-item">
      <img src="/res/Star.png" alt="Level" />
      <strong>
        {level} : {points}
      </strong>
      <progress value={points} max={level * 1e3}></progress>
    </figure>
  );
}
