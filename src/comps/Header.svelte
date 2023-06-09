<script>
  import { save } from "../lib/DataStore";
</script>

<header>
  <figure>
    <img src={`assets/stats/0.png`} alt="img" />
    <figcaption><p class="txt-s">{$save.money.toFixed(2)}</p></figcaption>
  </figure>

  <figure>
    <img src={`assets/stats/1.png`} alt="img" />
    <figcaption>
      <p class="txt-i">{$save.level} : {$save.points}</p>
      <progress max={$save.level * 1000} value={$save.points} />
    </figcaption>
  </figure>

  <figure>
    <img src={`assets/stats/2.png`} alt="img" />
    <figcaption>
      <p class="txt-w">{$save.energy} / {$save.level * 100}</p>
      <progress max={30} value={30 - $save.energytime} />
    </figcaption>
  </figure>
</header>

<style>
  header {
    display: grid;
    align-items: stretch;
    grid-template-rows: 100%;
    grid-template-columns: repeat(3, 1fr);
  }

  figure {
    display: grid;
    place-items: center;
    grid-template-rows: 60% 40%;
  }

  figcaption {
    width: 80%;
  }
</style>
