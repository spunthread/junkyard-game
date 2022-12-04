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
    <section>
      <aside>
        <figure>
          <img src={market.imgsrc} alt={market.name} />
          <figcaption>{market.name}</figcaption>
        </figure>
        <h2>Market</h2>
        <div>
          <p>
            Buy: <strong>${market.price.toFixed(2)}</strong>
          </p>
          <p>
            Sell: <strong>${total.toFixed(2)}</strong>
          </p>
          <p>
            Margin: <strong>${(total - market.price).toFixed(2)}</strong>
          </p>
        </div>
      </aside>
      <article>
        {market.parts.map((mp, ix) => (
          <figure key={mp.name}>
            <img alt="." />
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
