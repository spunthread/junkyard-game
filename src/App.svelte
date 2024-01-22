<script>
  // @ts-nocheck
  import { onMount, setContext } from "svelte";
  import { save } from "./lib/DataStore";
  import Vehicle from "./lib/Vehicle";
  import Header from "./comps/Header.svelte";
  import Nav from "./comps/Nav.svelte";
  import Junkyard from "./comps/Junkyard.svelte";
  import Parking from "./comps/Parking.svelte";
  import Garage from "./comps/Garage.svelte";
  import Storage from "./comps/Storage.svelte";

  let place = Junkyard;

  const setPlace = (p) => (place = p);

  setContext("places", setPlace);

  let alerts = [];

  const clearAlert = (id) => (alerts = alerts.filter((a) => a.id !== id));

  function setAlert(type, message, place) {
    const id = setTimeout(() => clearAlert(id), 3e3);
    alerts = alerts.concat({ id, type, message, place });
  }

  setContext("alerts", setAlert);

  function alertAction(id, pl) {
    clearTimeout(id);
    clearAlert(id);
    switch (pl) {
      case "J":
        setPlace(Junkyard);
        break;
      case "P":
        setPlace(Parking);
        break;
      case "G":
        setPlace(Garage);
        break;
      case "S":
        setPlace(Storage);
        break;
      default:
        break;
    }
  }

  onMount(() => {
    const interval = setInterval(() => {
      const data = $save;

      if (data.energytime === 0) {
        data.energy = Math.min(data.energy + 10, data.level * 100);
        data.energytime = 30;
      } else {
        data.energytime = data.energytime - 1;
      }

      if (data.yardtime === 0) {
        if (data.junkyardvehicle === null) {
          data.junkyardvehicle = new Vehicle(data.level);
          data.yardtime = 30;
          setAlert("i", "New Vehicle ! Grabe it Before it's Gone.", "J");
        } else {
          data.junkyardvehicle = null;
          data.yardtime = 90;
        }
      } else {
        data.yardtime = data.yardtime - 1;
      }

      for (const vehicle of data.garagevehicles.values()) {
        const { garagestage, garagetime, parts } = vehicle;
        if (garagestage > -1 && garagestage < parts.length) {
          if (parts[garagestage].time === garagetime) {
            const currentlevel = data.level;
            const nextstage = garagestage + 1;
            const nextpoints = data.points + vehicle.level;
            vehicle.garagetime = 0;
            vehicle.garagestage = nextstage;
            data.points = nextpoints % (currentlevel * 1e3);
            data.level = currentlevel + (nextpoints >= currentlevel * 1e3);
            if (nextstage === parts.length) {
              setAlert("i", "Vehicle Overhauled ! Store it's Parts for Selling.", "G");
            }
          } else {
            vehicle.garagetime += 1;
          }
        }
      }

      if (data.storagevehicles.has(data.marketvehicleid)) {
        if (data.markettime === 0) {
          data.markettime = 3;
        } else {
          data.markettime -= 1;
        }
      }

      $save = data;
    }, 1e3);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<Header />

<svelte:component this={place} />

<Nav />

<div>
  {#each alerts as alert (alert.id)}
    <strong
      class={`alert-${alert.type}`}
      on:keypress={() => alertAction(alert.id, alert.place)}
      on:click={() => alertAction(alert.id, alert.place)}
    >
      {alert.message}
    </strong>
  {/each}
</div>

<style>
  div {
    left: 0;
    right: 0;
    top: 4%;
    z-index: 99;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
  }

  strong {
    background-color: var(--alert-color);
    border: 0.4rem double #fff;
    border-radius: 0.8rem;
    padding: 0.4rem 1rem;
    margin: 0.4rem auto;
    cursor: pointer;
    color: #fff;
    max-width: 70%;
  }

  .alert-i {
    --alert-color: #2488cb;
  }

  .alert-s {
    --alert-color: #21bb25;
  }

  .alert-w {
    --alert-color: #caa40b;
  }

  .alert-d {
    --alert-color: #d5301e;
  }
</style>
