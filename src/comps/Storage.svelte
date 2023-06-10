<script>
  import { getContext } from "svelte";
  import { save } from "../lib/DataStore";
  import Market from "./Market.svelte";

  const setPlace = getContext("places");
  const setAlert = getContext("alerts");

  function expandStorage() {
    const data = $save;

    if (data.money < data.storagemax * 15e2) {
      setAlert("d", "You're Broke ! Not enough Money to expand Storage.", "");
      return;
    }

    data.money = data.money - data.storagemax * 15e2;
    data.storagemax = data.storagemax + 1;
    setAlert("s", `Storage Expanded ! Now Holds upto ${data.storagemax} Vehicle Parts.`, "");

    $save = data;
  }

  function sellVehicle(id) {
    const data = $save;

    data.marketvehicleid = id;

    $save = data;

    setPlace(Market);
  }
</script>

<section class="place">
  <div class="place-header">
    <p>{$save.storagevehicles.size} / {$save.storagemax}</p>
    <h2>Storage</h2>
    <p>
      <strong class="txt-s">{$save.storagemax * 15e2}</strong>
      <br />
      <button on:click={expandStorage}>Expand</button>
    </p>
  </div>
  <article class="place-main">
    {#each [...$save.storagevehicles.values()] as vehicle (vehicle.id)}
      <div>
        <figure>
          <img src={`assets/vehicles/${vehicle.level}-${vehicle.sub}.png`} alt={vehicle.name} />
          <figcaption>{vehicle.name}</figcaption>
        </figure>
        <aside>
          <button on:click={() => sellVehicle(vehicle.id)}>Sell</button>
        </aside>
      </div>
    {/each}
  </article>
</section>

<style>
  article {
    grid-template-rows: min-content;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
</style>
