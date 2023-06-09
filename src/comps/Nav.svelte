<script>
  import { getContext } from "svelte";

  import Garage from "./Garage.svelte";
  import Junkyard from "./Junkyard.svelte";
  import Parking from "./Parking.svelte";
  import Storage from "./Storage.svelte";

  const setPlace = getContext("places");
</script>

<nav>
  <button on:click={() => setPlace(Junkyard)}>Junkyard</button>
  <button on:click={() => setPlace(Parking)}>Parking</button>
  <button on:click={() => setPlace(Garage)}>Garage</button>
  <button on:click={() => setPlace(Storage)}>Storage</button>
</nav>

<style>
  nav {
    display: grid;
    place-items: center;
    grid-template-rows: auto;
    grid-template-columns: repeat(4, 1fr);
  }

  button {
    margin: 0 0.2rem;
  }
</style>
