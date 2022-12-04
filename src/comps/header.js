import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Header() {
  const { money, points, level, energy, energytime } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  return (
    <header>
      <figure className="header-figure">
        <img src="/res/Dollar0.png" alt="Dollar" />
        <figcaption>
          <p>Money</p>
          <strong>${money.toFixed(2)}</strong>
        </figcaption>
      </figure>

      <figure className="header-figure">
        <img src="/res/Star.png" alt="Star" />
        <figcaption>
          <p>
            Level <strong>{level}</strong>
          </p>
          <p>
            Points <strong>{points}</strong>
          </p>
        </figcaption>
      </figure>

      <figure className="header-figure">
        <img src="/res/Energy0.png" alt="Thunder" />
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

      <div>
        <button onClick={() => dispatch({ type: "SAVEGAME", alert })}>Save</button>
      </div>
    </header>
  );
}
