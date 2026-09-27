import React from 'react';
import { ActivityRing } from './ActivityRing';
import type { DailyActivity } from '../../../types';

interface ActivityRingsContainerProps {
  activity: DailyActivity;
}

export const ActivityRingsContainer: React.FC<ActivityRingsContainerProps> = ({ activity }) => {
  const strokeWidth = 14;
  const baseRadius = 60; 

  return (
    <div style={{ 
      position: 'relative', 
      width: '160px', 
      height: '160px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      margin: '0 auto'
    }}>
      {}
      <ActivityRing
        current={activity.move.current}
        goal={activity.move.goal}
        strokeWidth={strokeWidth}
        radius={baseRadius}
        color="#fa114f"
        backgroundColor="#3c0414"
      />
      
      {}
      <ActivityRing
        current={activity.exercise.current}
        goal={activity.exercise.goal}
        strokeWidth={strokeWidth}
        radius={baseRadius - strokeWidth - 2} 
        color="#9aff00"
        backgroundColor="#243e00"
      />
      
      {}
      <ActivityRing
        current={activity.stand.current}
        goal={activity.stand.goal}
        strokeWidth={strokeWidth}
        radius={baseRadius - (strokeWidth * 2) - 4} 
        color="#00f5ff"
        backgroundColor="#00353a"
      />
    </div>
  );
};
