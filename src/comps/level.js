import { useSave } from "../SaveContext";
import star from "../assets/images/star.png";

export default function Level() {
  const { level, points } = useSave();

  return (
    <figure className="">
      <img src={star} alt="level" />

      <figcaption>
        <p>
          Level <strong>{level}</strong>
        </p>

        <p>
          Points <strong>{points}</strong>
        </p>
      </figcaption>
    </figure>
  );
}
