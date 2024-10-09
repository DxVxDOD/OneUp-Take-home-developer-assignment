import { FormEvent, useState } from "react";
import { useForm } from "../hooks/useForm";
import { Band } from "./Band";
import { numberParser } from "../utils/numberParser";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorHandling";

export type Commission = {
  commissionPerc: number;
  currCommission: number;
  maxComission: number;
};

type Band = {
  value: number;
  tier: string;
  id: string;
  high: number;
  commission: Commission;
};

const starterData: Band[] = [
  {
    value: 0,
    tier: "0-5k",
    id: "011c73e9-5211-41b5-8c77-b184856105b4",
    high: 5000,
    commission: {
      commissionPerc: 0,
      currCommission: 0,
      maxComission: 0,
    },
  },
  {
    value: 0,
    tier: "5-10k",
    id: "fd6c7fa1-2286-4310-8b1d-dd18813009f2",
    high: 10000,
    commission: {
      commissionPerc: 10,
      currCommission: 0,
      maxComission: 0,
    },
  },
  {
    value: 0,
    tier: "10k-15k",
    id: "18545c18-1bc3-4973-8274-c5fde73abde0",
    high: 15000,
    commission: {
      commissionPerc: 15,
      currCommission: 0,
      maxComission: 0,
    },
  },
  {
    value: 0,
    tier: "15k-20k",
    id: "522776be-9c59-419c-bbd7-dc92718b682f",
    high: 20000,
    commission: {
      commissionPerc: 20,
      currCommission: 0,
      maxComission: 0,
    },
  },
  {
    value: 0,
    tier: "20k+",
    id: "c4f03363-97aa-4460-bec9-4a0bba7611a9",
    high: 20000,
    commission: {
      commissionPerc: 25,
      currCommission: 0,
      maxComission: 0,
    },
  },
];

export default function Widget() {
  // Initializing the maximum commission values avoiding incorrect data display in case of changes on the back end.
  for (let i = 0; i < starterData.length - 1; i++) {
    starterData[i].commission.maxComission =
      50 * starterData[i].commission.commissionPerc;
  }
  const [values, setValues] = useState<Band[]>(starterData);
  const commissionForm = useForm("number");

  async function handleTotalSumChange(e: FormEvent) {
    e.preventDefault();

    // Extra safety if a not a number gets through.
    let totalSum: number;
    try {
      totalSum = numberParser(parseInt(commissionForm.value));
    } catch (err) {
      const error_str = getErrorMessage(err);
      toast.error("Error: please use numbers, " + error_str);
      return;
    }

    const lastElementHigh = starterData[starterData.length - 1].high;
    const updated = [...values];

    // Clearing and initializing the array.
    for (let i = 0; i < updated.length - 1; i++) {
      updated[i].value = 0;
      updated[i].commission.currCommission = 0;
      updated[i].commission.maxComission =
        50 * updated[i].commission.commissionPerc;
    }

    const last_index = updated.length - 1;
    updated[last_index].commission.maxComission = 0;
    updated[last_index].value = 0;
    updated[last_index].commission.currCommission = 0;

    if (totalSum >= lastElementHigh) {
      for (let i = 0; i < updated.length - 1; i++) {
        updated[i].value = 5000;
        const maxComission = 50 * updated[i].commission.commissionPerc;
        updated[i].commission.maxComission = maxComission;
        updated[i].commission.currCommission = maxComission;
      }

      const currCommission = Math.floor(
        (totalSum / 100) * updated[last_index].commission.commissionPerc,
      );
      updated[last_index].commission.currCommission = currCommission;
      updated[last_index].value = 5000;

      setValues(updated);
    } else if (totalSum < starterData[0].high) {
      updated.forEach((band) => (band.value = 0));
      updated[0].value = totalSum;

      setValues(updated);
    } else {
      let tiers = 0;
      let totalSumCopy = structuredClone(totalSum);

      for (let i = 0; i < values.length; i++) {
        if (values[i].high <= totalSum) {
          tiers++;
          totalSumCopy -= 5000;

          const maxComission = 50 * updated[i].commission.commissionPerc;
          updated[i].value = 5000;
          updated[i].commission.currCommission = maxComission;
        }
      }

      // After looping through the array and only updating the necessary fields, we update the last one that is yet to be finished.
      const currCommission = Math.floor(
        (totalSumCopy / 100) * updated[tiers].commission.commissionPerc,
      );
      updated[tiers].value = totalSumCopy;
      updated[tiers].commission.currCommission = currCommission;

      setValues(updated);
    }
  }

  return (
    <article className="widget-container">
      <form onSubmit={handleTotalSumChange}>
        <input {...commissionForm} name="Commission" />
        <button>Sub</button>
        <ul>
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
    </article>
  );
}
