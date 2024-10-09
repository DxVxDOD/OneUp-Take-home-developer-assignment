import { useComissionWidget } from "../hooks/useCommissionWidget";
import { Band } from "./Band";

export default function Widget() {
  const { values, handleComissonChange, commissionForm } = useComissionWidget();

  return (
    <form className="widget-container" onSubmit={handleComissonChange}>
      <input
        placeholder="Ex: 18000"
        aria-label="User numerical input for reveneu value"
        {...commissionForm}
        name="Commission"
        className="widget-input"
      />
      <button
        className="widget-button"
        aria-label="Button for submitting the provided revenue input value."
      >
        Submit
      </button>
      <ul className="widget-ul">
        {values.map((band, i) => (
          <li key={band.id} className="widget-li">
            <Band
              commission={band.commission}
              value={band.value}
              tier={band.tier}
              index={i}
              length={values.length}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}
