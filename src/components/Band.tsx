type ProgressBand = {
  value: number;
  tier: string;
};

export const Band = ({ value, tier }: ProgressBand) => {
  return (
    <>
      <p className="band-p" data-value={value * 2}>
        {tier}
      </p>
      <progress max="50" value={value} className="html5">
        <div className="progress-bar">
          <span className="">{value * 2}</span>
        </div>
      </progress>
      <span data-commission={value * 2} className="band-span">
        Commission:
      </span>
    </>
  );
};
