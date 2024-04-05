import React from "react";

interface StatisticProps {
  tip: string;
  icon: React.JSX.Element;
  value: string | number;
  className?: string;
}

export default function Statistic(props: StatisticProps) {
  const { tip, icon, value, className } = props;
  return (
    <div className={`flex items-baseline gap-1 ${className ?? ""}`}>
      <span className="tooltip tooltip-right" data-tip={tip}>
        {icon}
      </span>
      <span className="truncate">{value}</span>
    </div>
  );
}
