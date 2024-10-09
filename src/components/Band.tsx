import { useEffect, useRef } from "react";
import { Commission } from "../hooks/useCommissionWidget";

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
  const progressRef = useRef<HTMLProgressElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    document.documentElement.style.setProperty(
      "--progress-color",
      `hsl(0, 60%, 52.5%)`,
    );
    if (progress) {
      if (perc <= 100) {
        const hue = 1.2 * perc;
        progress.style.setProperty(
          "--progress-color",
          `hsl(${hue}, 60%, 52.5%)`,
        );
      }
    }
  }, [perc]);

  return (
    <>
      <p className="band-p" data-value={perc}>
        <b>£{tier}</b>
      </p>
      <progress ref={progressRef} max="5000" value={value} className="html5">
        <div className="progress-bar">
          <span className="">{value * 2}</span>
        </div>
      </progress>
      <span className="band-span">
        <b>Commission: £{commission.currCommission}{" "}
        {index === length - 1 && 100 === perc
          ? " £"
          : `/ £${commission.maxCommission}`}</b>
      </span>
    </>
  );
};
