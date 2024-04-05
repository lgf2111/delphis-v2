import React from "react";
import { type IconType } from "react-icons";

interface StatisticProps {
  tip: string;
  icon: IconType;
  value: string | number;
  className?: string;
}

export default function Statistic(props: StatisticProps) {
  const { tip, icon: Icon, value, className } = props;
  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      <span className="tooltip tooltip-right" data-tip={tip}>
        <Icon />
      </span>
      <span className="truncate">{value}</span>
    </div>
  );
}
