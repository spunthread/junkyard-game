import { useState, useEffect } from "react";
import { useAlert, useSave, useSaveDispatch } from "../SaveContext";

export default function Market() {
  const { market } = useSave();
  const dispatch = useSaveDispatch();
  const alert = useAlert();

  const [total, setTotal] = useState(market.parts.reduce((t, p) => t + p.price, 0));
  const [prices, setPrices] = useState(market.parts.map((p) => p.price));

  useEffect(
    () =>
      setPrices(
        market.parts.map((mp) =>
          mp.price > 0 ? mp.price : market.price * mp.ratio * (0.6 + Math.random())
        )
      ),
    [market.parts, market.price, market.stage]
  );

  return (
    <section className="place">
      <aside className="place-top">
        <figure className="place-start">
          <img src={`res/${market.name}.png`} alt={market.name} />
          <figcaption>{market.name}</figcaption>
        </figure>
        <h2>Market</h2>
        <div className="place-end">
          <span>
            B:<strong>{market.price.toFixed(2)}</strong>
          </span>
          <span>
            S:<strong>{total.toFixed(2)}</strong>
          </span>
          <span className={`text${total - market.price > 0 ? "-success" : "-danger"}`}>
            C:<strong>{(total - market.price).toFixed(2)}</strong>
          </span>
        </div>
      </aside>
      <article className="place-down parking-storage">
        {market.parts.map((mp, ix) => (
          <figure key={mp.name}>
            <img src={`res/${mp.name}.png`} alt={mp.name} />
            <figcaption>{mp.name}</figcaption>
            <strong className={mp.price > 0 ? "text-success" : ""}>
              {prices[ix].toFixed(2)}
            </strong>
            {mp.price > 0 ? (
              <span>Sold</span>
            ) : (
              <button
                onClick={() => {
                  setTotal((t) => t + prices[ix]);
                  dispatch({ type: "SELLPART", price: prices[ix], pix: ix, alert });
                }}>
                Sell
              </button>
            )}
          </figure>
        ))}
      </article>
    </section>
  );
}
