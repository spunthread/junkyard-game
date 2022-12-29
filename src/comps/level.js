import { useSave } from "../SaveContext";
import star from "../assets/images/star.png";

export default function Level() {
  const { level, points } = useSave();

  return (
    <figure className="stats-item">
      <img src={star} alt="level" />
      <strong>
        {level} : {points}
      </strong>
      <progress value={points} max={level * 1e3}></progress>
    </figure>
  );
}
