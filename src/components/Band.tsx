import { Commission } from "./Widget";

type ProgressBand = {
  value: number;
  tier: string;
  commission: Commission;
  index: number;
  length: number;
};

export const Band = ({
  value,
  tier,
  commission,
  index,
  length,
}: ProgressBand) => {
  const perc = Math.floor((value / 100) * 2);
  return (
    <>
      <p className="band-p" data-value={perc}>
        {tier}
      </p>
      <progress max="5000" value={value} className="html5">
        <div className="progress-bar">
          <span className="">{value * 2}</span>
        </div>
      </progress>
      <span className="band-span">
        Commission: {commission.currCommission}{" "}
        {index === length - 1 && 100 === perc
          ? ""
          : `/ ${commission.maxComission}`}
      </span>
      <span data-commission={commission} className="band-span"></span>
    </>
  );
};
