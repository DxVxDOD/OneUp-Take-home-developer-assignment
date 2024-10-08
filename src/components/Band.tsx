type ProgressBand = {
  value: number;
  tier: string;
};

export const Band = ({ value, tier }: ProgressBand) => {
  return (
    <>
      <p className="band-p" data-value={value}>
        {tier}
      </p>
      <progress max="100" value={value} className="html5">
        <div className="progress-bar">
          <span className="">{value}</span>
        </div>
      </progress>
    </>
  );
};
