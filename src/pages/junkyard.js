import JunkyardStats from "../comps/junkyardstats";
import JunkyardSupply from "../comps/junkyardsupply";
import "../assets/css/junkyard.css";

export default function Junkyard() {
  return (
    <section className="place">
      <aside className="place-top">
        <h2 className="place-top-span">Junkyard</h2>
      </aside>
      <article className="place-down junkyard">
        <JunkyardStats />
        <JunkyardSupply />
      </article>
    </section>
  );
}
