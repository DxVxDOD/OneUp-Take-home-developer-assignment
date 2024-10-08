import { FormEvent, useCallback, useMemo, useState } from "react";
import { Band } from "./Band";
import { useForm } from "../hooks/useForm";

type Band = {
  value: number;
  tier: string;
  id: string;
  commission: number;
  high: number;
};

const starterData: Band[] = [
  {
    value: 80,
    tier: "0-5k",
    id: "011c73e9-5211-41b5-8c77-b184856105b4",
    commission: 0,
    high: 5,
  },
  {
    value: 80,
    tier: "10-15k",
    id: "fd6c7fa1-2286-4310-8b1d-dd18813009f2",
    commission: 10,
    high: 10,
  },
  {
    value: 80,
    tier: "15k-20k",
    id: "18545c18-1bc3-4973-8274-c5fde73abde0",
    commission: 15,
    high: 15,
  },
  {
    value: 80,
    tier: "20k+",
    id: "c4f03363-97aa-4460-bec9-4a0bba7611a9",
    commission: 20,
    high: 20,
  },
  {
    value: 80,
    tier: "20k+",
    id: "7454ae59-cb6e-4f51-b840-e780e90a34ff",
    commission: 20,
    high: 20,
  },
];

export default function Widget() {
  const [values, setValues] = useState<Band[]>(starterData);

  const comissionForm = useForm("number");

  const handleTotalSumChange = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const max = starterData[starterData.length - 1].high;
      const totalSum = parseInt(comissionForm.value);
      console.log(totalSum);
      if (totalSum > max) {
        const updated = [...values];
        updated.forEach((band) => (band.value = 100));
        setValues(updated);
      }
    },
    [comissionForm.value, values],
  );

  return (
    <article className="widget-container">
      <form onSubmit={handleTotalSumChange}>
        <input {...comissionForm} name="Commission" />
        <ul>
          {values.map((band) => (
            <li key={band.id} className="widget-li">
              <Band value={band.value} tier={band.tier} />
            </li>
          ))}
        </ul>
        <button>Sub</button>
      </form>
    </article>
  );
}
