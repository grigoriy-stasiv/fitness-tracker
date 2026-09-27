import React from 'react';

interface ActivityRingProps {
  current: number;
  goal: number;
  strokeWidth: number;
  radius: number;
  color: string;
  backgroundColor: string;
}

export const ActivityRing: React.FC<ActivityRingProps> = ({
  current,
  goal,
  strokeWidth,
  radius,
  color,
  backgroundColor,
}) => {
  const center = radius + strokeWidth;
  const size = center * 2;
  const circumference = 2 * Math.PI * radius;
  
  const percentage = Math.min(current / goal, 1);
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
      {}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />
      {}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
      />
    </svg>
  );
};
