<script>
  import { getContext } from "svelte";
  import { save } from "../lib/DataStore";

  const setAlert = getContext("alerts");

  function skipVehicle() {
    const data = $save;
    data.junkyardvehicle = null;
    data.yardtime = 30;
    $save = data;
  }

  function buyVehicle() {
    const data = $save;

    if (data.money < data.junkyardvehicle.price) {
      setAlert("d", "You're Broke ! Not enough Money for Vehicle.", "");
      return;
    }

    if (data.parkingvehicles.size === data.parkingmax) {
      setAlert("w", "Too Crammed ! Not enough Space in Parking.", "");
      return;
    }

    const vehicle = data.junkyardvehicle;
    const currentlevel = data.level;
    const nextpoints = data.points + vehicle.level;
    data.money = data.money - vehicle.price;
    data.points = nextpoints % (currentlevel * 1e3);
    data.level = currentlevel + (nextpoints >= currentlevel * 1e3);
    data.parkingvehicles.set(vehicle.id, vehicle);
    data.junkyardvehicle = null;
    data.yardtime = 60;
    setAlert("s", "Vehicle Bought ! Find it in the Parking.", "P");

    $save = data;
  }
</script>

<section class="place">
  <div class="place-header">
    <h2>Junkyard</h2>
  </div>
  <article class="place-main">
    <aside class="info">
      <p>Parking = {$save.parkingvehicles.size} / {$save.parkingmax}</p>
      <p>Garage = {$save.garagevehicles.size} / {$save.garagemax}</p>
      <p>Storage = {$save.storagevehicles.size} / {$save.storagemax}</p>
    </aside>
    <aside class="action">
      {#if $save.junkyardvehicle == null}
        <h3>Awaiting Next Vehicle</h3>
      {:else}
        <figure>
          <img
            src={`assets/vehicles/${$save.junkyardvehicle.level}-${$save.junkyardvehicle.sub}.png`}
            alt={$save.junkyardvehicle.name}
          />
          <figcaption>{$save.junkyardvehicle.name}</figcaption>
        </figure>
        <aside>
          <strong class="txt-s">{$save.junkyardvehicle.price.toFixed(2)}</strong>
          <p class="control">
            <button on:click={skipVehicle}>Skip</button>
            <button on:click={buyVehicle}>Buy</button>
          </p>
        </aside>
      {/if}
      <h3>Timer = {$save.yardtime}</h3>
    </aside>
  </article>
</section>

<style>
  h2 {
    grid-column: 1 / span 3;
  }

  p {
    margin: 2rem 0;
  }

  p.control {
    margin: 0.8rem 0;
  }

  button {
    margin: 0 0.2rem;
  }

  article {
    grid-template-rows: 100%;
    grid-template-columns: repeat(2, 1fr);
  }

  article > aside {
    display: flex;
    flex-flow: column nowrap;
  }

  article > aside.info {
    justify-content: center;
  }

  article > aside.action {
    justify-content: space-around;
  }
</style>
