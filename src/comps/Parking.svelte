<script>
  import { getContext } from "svelte";
  import { save } from "../lib/DataStore";

  const setAlert = getContext("alerts");

  function expandParking() {
    const data = $save;

    if (data.money < data.parkingmax * 1e3) {
      setAlert("d", "You're Broke ! Not enough Money to expand Parking.", "");
      return;
    }

    data.money = data.money - data.parkingmax * 1e3;
    data.parkingmax = data.parkingmax + 1;
    setAlert("s", `Parking Expanded ! Now Holds upto ${data.parkingmax} Vehicles.`, "");

    $save = data;
  }

  function moveVehicle(id) {
    const data = $save;

    const vehicle = data.parkingvehicles.get(id);

    if (data.energy < vehicle.parkingenergy) {
      setAlert("d", "You're Tired ! Not enough Energy to Move Vehicle.", "");
      return;
    }

    if (data.garagevehicles.size === data.garagemax) {
      setAlert("w", "Too Crammed ! Not enough Space in Garage.", "");
      return;
    }

    const currentlevel = data.level;
    const nextpoints = data.points + vehicle.level;
    data.energy = data.energy - vehicle.parkingenergy;
    data.points = nextpoints % (currentlevel * 1e3);
    data.level = currentlevel + (nextpoints >= currentlevel * 1e3);
    data.parkingvehicles.delete(id);
    data.garagevehicles.set(id, vehicle);
    setAlert("s", "Vehicle Moved ! Overhaul it in the Garage.", "G");

    $save = data;
  }
</script>

<section class="place">
  <div class="place-header">
    <p>{$save.parkingvehicles.size} / {$save.parkingmax}</p>
    <h2>Parking</h2>
    <p>
      <strong class="txt-s">{$save.parkingmax * 1e3}</strong>
      <br />
      <button on:click={expandParking}>Expand</button>
    </p>
  </div>
  <article class="place-main">
    {#each [...$save.parkingvehicles.values()] as vehicle (vehicle.id)}
      <div>
        <figure>
          <img
            src={`assets/vehicles/${vehicle.level}-${vehicle.sub}.png`}
            alt={vehicle.name}
          />
          <figcaption>{vehicle.name}</figcaption>
        </figure>
        <aside>
          <strong class="txt-w">{vehicle.parkingenergy}</strong>
          <button on:click={() => moveVehicle(vehicle.id)}>Move</button>
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

  aside > * {
    margin: 0 0.4rem;
  }
</style>
