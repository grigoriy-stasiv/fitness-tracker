import React, { useState, useEffect } from 'react';
import { calculateTotalDistance } from '../utils/distance';
import { WorkoutMap } from './WorkoutMap';
import { useGeolocation } from '../hooks/useGeolocation';
import { Square, Flame, Timer, Milestone } from 'lucide-react';

interface ActiveWorkoutContainerProps {
  onStopWorkout: (duration: number, distance: number, calories: number) => void;
}

export const ActiveWorkoutContainer: React.FC<ActiveWorkoutContainerProps> = ({ onStopWorkout }) => {
  const { route, currentLocation, error } = useGeolocation(true);

  
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0); 
  const [calories, setCalories] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      setCalories(Math.round((seconds * 0.12) * 10) / 10);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);
useEffect(() => {
  const totalKm = calculateTotalDistance(route);
  setDistance(totalKm);
}, [route]);
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, '0');

    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div className="fitness-screen">
      <div className="fitness-header">
        <span className="fitness-date" style={{ color: '#9aff00' }}>ТРЕНИРОВКА ИДЕТ</span>
        <h1 className="fitness-title">Свободный бег</h1>
      </div>

      {}
      <WorkoutMap currentLocation={currentLocation} route={route} />

      {}
      {error && (
        <div style={{ color: '#ff3b30', fontSize: '14px', textAlign: 'center', backgroundColor: '#2c0d0d', padding: '10px', borderRadius: '8px' }}>
          ⚠️ {error}
        </div>
      )}

      {}
      <div className="metrics-grid">
        <div className="metric-box">
          <div className="metric-label"><Timer size={16} /> ВРЕМЯ</div>
          <div className="metric-value">{formatTime(seconds)}</div>
        </div>

        <div className="metric-box">
          <div className="metric-label"><Milestone size={16} /> ДИСТАНЦИЯ</div>
          <div className="metric-value">{distance.toFixed(2)} <span className="metric-unit">КМ</span></div>
        </div>

        <div className="metric-box">
          <div className="metric-label"><Flame size={16} /> АКТИВНЫЕ ККАЛ</div>
          <div className="metric-value move-color">{calories}</div>
        </div>
      </div>

      {}
      <button 
        className="stop-workout-btn" 
        onClick={() => onStopWorkout(seconds, distance, calories)}
      >
        <Square size={20} fill="white" />
        <span>Завершить</span>
      </button>
    </div>
  );
};
