import { Commission } from "./Widget";

type ProgressBand = {
  value: number;
  tier: string;
  commission: Commission;
};

export const Band = ({ value, tier, commission }: ProgressBand) => {
  return (
    <>
      <p className="band-p" data-value={(value / 100) * 2}>
        {tier}
      </p>
      <progress max="5000" value={value} className="html5">
        <div className="progress-bar">
          <span className="">{value * 2}</span>
        </div>
      </progress>
      <span className="band-span">
        Commission: {commission.currCommission} / {commission.maxComission}
      </span>
      <span data-commission={commission} className="band-span"></span>
    </>
  );
};
