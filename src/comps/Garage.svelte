<script>
  import { getContext } from "svelte";
  import { save } from "../lib/DataStore";

  const setAlert = getContext("alerts");

  function expandGarage() {
    const data = $save;

    if (data.money < data.garagemax * 2e3) {
      setAlert("d", "You're Broke ! Not enough Money to expand Garage.", "");
      return;
    }

    data.money = data.money - data.garagemax * 2e3;
    data.garagemax = data.garagemax + 1;
    setAlert("s", `Garage Expanded ! Now Holds upto ${data.garagemax} Vehicles.`, "");

    $save = data;
  }

  function workVehicle(id) {
    const data = $save;

    const vehicle = data.garagevehicles.get(id);

    if (data.energy < vehicle.garageenergy) {
      setAlert("d", "You're Tired ! Not enough Energy to Overhaul Vehicle.", "");
      return;
    }

    const currentlevel = data.level;
    const nextpoints = data.points + vehicle.level;
    vehicle.garagestage = 0;
    data.energy = data.energy - vehicle.garageenergy;
    data.points = nextpoints % (currentlevel * 1e3);
    data.level = currentlevel + (nextpoints >= currentlevel * 1e3);

    $save = data;
  }

  function storeVehicle(id) {
    const data = $save;

    const vehicle = data.garagevehicles.get(id);

    if (data.energy < vehicle.storageenergy) {
      setAlert("d", "You're Tired ! Not enough Energy to Store Vehicle Parts.", "");
      return;
    }

    if (data.storagevehicles.size === data.storagemax) {
      setAlert("w", "Too Crammed ! Not enough Space in Storage.", "");
      return;
    }

    const currentlevel = data.level;
    const nextpoints = data.points + vehicle.level;
    data.energy = data.energy - vehicle.storageenergy;
    data.points = nextpoints % (currentlevel * 1e3);
    data.level = currentlevel + (nextpoints >= currentlevel * 1e3);
    data.garagevehicles.delete(id);
    data.storagevehicles.set(id, vehicle);
    setAlert("s", "Vehicle Stored ! Sell it's Parts in the Storage.", "S");

    $save = data;
  }
</script>

<section class="place">
  <div class="place-header">
    <p>{$save.garagevehicles.size} / {$save.garagemax}</p>
    <h2>Garage</h2>
    <p>
      <strong class="txt-s">{$save.garagemax * 2e3}</strong>
      <br />
      <button on:click={expandGarage}>Expand</button>
    </p>
  </div>
  <article class="place-main">
    {#each [...$save.garagevehicles.values()] as vehicle (vehicle.id)}
      <div>
        <figure>
          <img
            src={`assets/vehicles/${vehicle.level}-${vehicle.sub}.png`}
            alt={vehicle.name}
          />
          <figcaption>{vehicle.name}</figcaption>
        </figure>
        {#if vehicle.garagestage === -1}
          <aside class="work">
            <strong class="txt-w">{vehicle.garageenergy}</strong>
            <button on:click={() => workVehicle(vehicle.id)}>Work</button>
          </aside>
        {:else if vehicle.garagestage === vehicle.parts.length}
          <aside class="work">
            <strong class="txt-w">{vehicle.storageenergy}</strong>
            <button on:click={() => storeVehicle(vehicle.id)}>Store</button>
          </aside>
        {:else}
          <figure>
            <img
              src={`assets/parts/${vehicle.garagestage}.png`}
              alt={vehicle.parts[vehicle.garagestage].name}
            />
            <figcaption>{vehicle.parts[vehicle.garagestage].name}</figcaption>
          </figure>
          <aside>
            <p class="txt-i">{vehicle.garagetime} => {vehicle.parts[vehicle.garagestage].time}</p>
            <progress
              max={vehicle.parts[vehicle.garagestage].time}
              value={vehicle.garagetime}
            />
          </aside>
        {/if}
      </div>
    {/each}
  </article>
</section>

<style>
  article {
    grid-template-rows: min-content;
    grid-template-columns: 100%;
  }

  article > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100%;
  }

  aside {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    place-items: center;
  }

  aside.work {
    grid-column: 2 / span 2;
  }

  aside > * {
    margin: 0.4rem 0;
  }
</style>
