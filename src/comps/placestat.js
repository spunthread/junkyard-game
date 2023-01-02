export default function PlaceStat({ place, size, max }) {
  return (
    <span className="rounded">
      {place}: {size}/{max}
    </span>
  );
}
