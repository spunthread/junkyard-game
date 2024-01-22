<script>
  import { getContext } from "svelte";
  import { save } from "../lib/DataStore";

  const setAlert = getContext("alerts");

  let vehicle = $save.storagevehicles.get($save.marketvehicleid);

  $: total = vehicle.parts.reduce((t, p) => t + p.sellprice, 0);

  function generatePartsPrice() {
    return vehicle.parts.map((part) =>
      part.sellprice > 0 ? part.sellprice : part.ratio * (Math.random() + Math.random())
    );
  }

  let partsPrice = generatePartsPrice();

  $: {
    if ($save.markettime === 0) {
      partsPrice = generatePartsPrice();
    }
  }

  let margin = 1.5;

  function sellPart(ix) {
    const data = $save;

    const partSellPrice = partsPrice[ix];

    vehicle.parts[ix].sellprice = partSellPrice;

    const currentlevel = data.level;
    const nextpoints = data.points + vehicle.level;
    data.money = data.money + partSellPrice;
    data.points = nextpoints % (currentlevel * 1e3);
    data.level = currentlevel + (nextpoints >= currentlevel * 1e3);

    if (vehicle.parts.every((part) => part.sellprice > 0)) {
      data.storagevehicles.delete(vehicle.id);
      setAlert("s", "All Vehicle Parts Sold ! Let's Sell some more.", "S");
    }

    $save = data;
  }
</script>

<section class="market-place">
  <div class="place-header">
    <figure>
      <img
        src={`assets/vehicles/${vehicle.level}-${vehicle.sub}.png`}
        alt={vehicle.name}
      />
      <figcaption>{vehicle.name}</figcaption>
    </figure>
    <h2>Market</h2>
    <aside>
      <p>B:&nbsp;<strong>{vehicle.price.toFixed(2)}</strong></p>
      <p>S:&nbsp;<strong>{total.toFixed(2)}</strong></p>
      <p class={`txt-${total - vehicle.price < 0 ? "d" : "s"}`}>
        R:&nbsp;<strong>{(total - vehicle.price).toFixed(2)}</strong>
      </p>
      <p>
        <input
          type="range"
          min={1}
          max={2}
          step={0.1}
          bind:value={margin}
        />
      </p>
      <p>
        M:&nbsp;<strong>{`${margin === 2 ? "1" : ""}${margin.toPrecision(3).substring(margin === 1 ? 3 : 2)}`}%</strong>
      </p>
    </aside>
  </div>
  <article class="place-main">
    {#each vehicle.parts as part, index (index)}
      <div>
        <figure>
          <img
            src={`assets/parts/${index}.png`}
            alt={part.name}
          />
          <figcaption>{part.name}</figcaption>
        </figure>
        <aside>
          <strong
            class={part.sellprice === 0 ? "" : partsPrice[index] < part.ratio * margin ? "txt-w" : "txt-i"}
            class:txt-s={part.sellprice === 0 && partsPrice[index] >= part.ratio * margin}
            >{partsPrice[index].toFixed(2)}</strong
          >
          <br />
          {#if part.sellprice > 0}
            <button disabled>Sold</button>
          {:else}
            <button on:click={() => sellPart(index)}>Sell</button>
          {/if}
        </aside>
      </div>
    {/each}
  </article>
</section>

<style>
  section.market-place {
    display: grid;
    grid-template-rows: 30% 70%;
    grid-template-columns: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  article {
    grid-template-rows: min-content;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
</style>
