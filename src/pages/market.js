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
        <figure className="">
          <img src={market.imgsrc} alt={market.name} />
          <figcaption>{market.name}</figcaption>
        </figure>
        <h2>Market</h2>
        <div className="">
          <span>
            B:<strong>{market.price.toFixed(2)}</strong>
          </span>
          <span>
            S:<strong>{total.toFixed(2)}</strong>
          </span>
          <span>
            C:<strong>{(total - market.price).toFixed(2)}</strong>
          </span>
        </div>
      </aside>
      <article className="place-down">
        {market.parts.map((mp, ix) => (
          <figure key={mp.name}>
            <img src={`/res/part${ix}.png`} alt={mp.name} />
            <figcaption>{mp.name}</figcaption>
            <figcaption>
              <strong>${prices[ix].toFixed(2)}</strong>
            </figcaption>
            <figcaption>
              {mp.price > 0 ? (
                <span>Sold</span>
              ) : (
                <button
                  disabled={mp.price > 0}
                  onClick={() => {
                    setTotal((t) => t + prices[ix]);
                    dispatch({ type: "SELLPART", price: prices[ix], pix: ix, alert });
                  }}>
                  Sell
                </button>
              )}
            </figcaption>
          </figure>
        ))}
      </article>
    </section>
  );
}
