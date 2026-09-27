import React from 'react';
import { ActivityRingsContainer } from './ActivityRingsContainer';
import { Play, Flame, Milestone, Timer } from 'lucide-react';
import type { DailyActivity, WorkoutType } from '../../../types';

interface DashboardProps {
  onStartWorkoutClick: () => void;
  selectedType: WorkoutType;
  onTypeChange: (type: WorkoutType) => void;
}

const mockActivity: DailyActivity = {
  move: { current: 380, goal: 600 },
  exercise: { current: 22, goal: 30 },
  stand: { current: 8, goal: 12 },
};

export const Dashboard: React.FC<DashboardProps> = ({ 
  onStartWorkoutClick, 
  selectedType, 
  onTypeChange 
}) => {
  return (
    <div className="fitness-screen">
      <div className="fitness-header">
        <span className="fitness-date">НЕДІЛЯ, 27 ВЕРЕСНЯ</span>
        <h1 className="fitness-title">Активність</h1>
      </div>

      {}
      <div className="fitness-card rings-card">
        <ActivityRingsContainer activity={mockActivity} />
        
        <div className="rings-stats">
          <div className="stat-row move-color">
            <span>Рух</span>
            <strong>{mockActivity.move.current} / {mockActivity.move.goal} ККАЛ</strong>
          </div>
          <div className="stat-row exercise-color">
            <span>Вправи</span>
            <strong>{mockActivity.exercise.current} / {mockActivity.exercise.goal} ХВ</strong>
          </div>
          <div className="stat-row stand-color">
            <span>Розминка</span>
            <strong>{mockActivity.stand.current} / {mockActivity.stand.goal} ГОД</strong>
          </div>
        </div>
      </div>

      {}
      <div className="workout-type-selector" style={{ marginTop: '10px' }}>
        <span className="fitness-date" style={{ display: 'block', marginBottom: '10px' }}>Виберіть вид активності</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <button 
            className={`type-btn ${selectedType === 'run' ? 'active-run' : ''}`}
            onClick={() => onTypeChange('run')}
          >
            <Flame size={18} />
            <span>Біг</span>
          </button>
          <button 
            className={`type-btn ${selectedType === 'walk' ? 'active-walk' : ''}`}
            onClick={() => onTypeChange('walk')}
          >
            <Milestone size={18} />
            <span>Ходьба</span>
          </button>
          <button 
            className={`type-btn ${selectedType === 'cycling' ? 'active-cycling' : ''}`}
            onClick={() => onTypeChange('cycling')}
          >
            <Timer size={18} />
            <span>Вело</span>
          </button>
        </div>
      </div>

      {}
      <button className="start-workout-btn" onClick={onStartWorkoutClick} style={{ marginTop: 'auto' }}>
        <Play size={20} fill="black" />
        <span>Почати тренування</span>
      </button>
    </div>
  );
};
