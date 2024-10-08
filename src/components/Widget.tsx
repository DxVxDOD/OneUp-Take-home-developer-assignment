import { FormEvent, useState } from "react";
import { useForm } from "../hooks/useForm";
import { Band } from "./Band";

type Band = {
  value: number;
  tier: string;
  id: string;
  commission: number;
  high: number;
};

const starterData: Band[] = [
  {
    value: 0,
    tier: "0-5k",
    id: "011c73e9-5211-41b5-8c77-b184856105b4",
    commission: 0,
    high: 50,
  },
  {
    value: 0,
    tier: "10-15k",
    id: "fd6c7fa1-2286-4310-8b1d-dd18813009f2",
    commission: 10,
    high: 100,
  },
  {
    value: 0,
    tier: "15k-20k",
    id: "18545c18-1bc3-4973-8274-c5fde73abde0",
    commission: 15,
    high: 150,
  },
  {
    value: 0,
    tier: "20k+",
    id: "c4f03363-97aa-4460-bec9-4a0bba7611a9",
    commission: 20,
    high: 200,
  },
];

export default function Widget() {
  const [values, setValues] = useState<Band[]>(starterData);

  const comissionForm = useForm("number");

  function handleTotalSumChange(e: FormEvent) {
    e.preventDefault();
    const max = starterData[starterData.length - 1].high;
    const totalSum = parseInt(comissionForm.value);
    const updated = [...values];
    if (totalSum > max) {
      updated.forEach((band) => (band.value = 100));
      setValues(updated);
    } else if (totalSum < starterData[0].high) {
      updated.forEach((band) => (band.value = 0));
      updated[0].value = totalSum;
      setValues(updated);
    } else {
      let tiers = 0;
      let totalSumCopy = structuredClone(totalSum);

      values.forEach((band) => {
        if (band.high <= totalSum) {
          tiers++;
        }
      });

      let i = 0;
      while (i < tiers) {
        updated[i].value = 100;
        totalSumCopy -= 50;
        i++;
      }

      updated[tiers].value = totalSumCopy;
      i++;

      while (i < updated.length) {
        updated[i].value = 0;
        i++;
      }

      setValues(updated);
    }
  }

  return (
    <article className="widget-container">
      <form onSubmit={handleTotalSumChange}>
        <input {...comissionForm} name="Commission" />
        <button>Sub</button>
        <ul>
          {values.map((band) => (
            <li key={band.id} className="widget-li">
              <Band value={band.value} tier={band.tier} />
            </li>
          ))}
        </ul>
      </form>
    </article>
  );
}
