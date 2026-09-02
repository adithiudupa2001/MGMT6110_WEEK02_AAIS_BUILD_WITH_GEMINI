import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  isPositive?: boolean;
  showGradient?: boolean;
  strokeWidth?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 36,
  isPositive,
  showGradient = true,
  strokeWidth = 2,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;
  const effectiveHeight = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 8) + 4;
    const y = height - padding - ((val - min) / range) * effectiveHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - 4},${height} L 4,${height} Z`;

  const positive = isPositive !== undefined ? isPositive : data[data.length - 1] >= data[0];
  const strokeColor = positive ? '#089981' : '#f23645';
  const gradientId = `spark-grad-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <svg width={width} height={height} className="overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity={showGradient ? 0.25 : 0} />
          <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      {showGradient && <path d={areaD} fill={`url(#${gradientId})`} />}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
