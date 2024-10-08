import { Band } from "./Band";

export default function Widget() {
  return (
    <article className="widget-container">
      <ul>
        <li className="widget-li">
          <Band value={100} tier={"0-5k"} />
        </li>
        <li className="widget-li">
          <Band value={100} tier={"10k-15k"} />
        </li>
        <li className="widget-li">
          <Band value={100} tier={"15-20k"} />
        </li>
        <li className="widget-li">
          <Band value={80} tier={"20k+"} />
        </li>
      </ul>
    </article>
  );
}
