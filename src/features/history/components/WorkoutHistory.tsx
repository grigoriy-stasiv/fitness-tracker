import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Flame, Timer, Milestone, Trophy, Loader2 } from 'lucide-react';
import { workoutService } from '../../../services/workoutService';

interface WorkoutHistoryProps {
  onBack: () => void;
}

export const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ onBack }) => {
  const { data: workouts = [], isLoading, isError } = useQuery({
    queryKey: ['workouts'],
    queryFn: workoutService.getWorkouts
  });

  const getWorkoutName = (type: string) => {
    switch (type) {
      case 'run': return 'Вільний біг';
      case 'walk': return 'Традиційна ходьба';
      case 'cycling': return 'Велосипед';
      default: return 'Тренування';
    }
  };

  const getWorkoutColorClass = (type: string) => {
    switch (type) {
      case 'run': return 'move-color';
      case 'walk': return 'exercise-color';
      case 'cycling': return 'stand-color';
      default: return '';
    }
  };

  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} ХВ`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="fitness-screen">
      <div className="history-nav-bar">
        <button className="history-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
          <span>Головна</span>
        </button>
        <h1 className="history-main-title">Історія</h1>
      </div>

      <div className="history-list">
        {}
        {isLoading && (
          <div className="no-workouts" style={{ gap: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Loader2 size={36} className="animate-spin" style={{ color: '#9aff00' }} />
            <p>Завантаження історії...</p>
          </div>
        )}

        {}
        {isError && (
          <div className="no-workouts" style={{ color: '#ff3b30' }}>
            <p>Не вдалося завантажити історію тренувань</p>
          </div>
        )}

        {}
        {!isLoading && !isError && workouts.length === 0 ? (
          <div className="no-workouts">
            <Trophy size={48} style={{ color: '#2c2c2e', marginBottom: '12px' }} />
            <p>У вас ще немає завершених тренувань</p>
          </div>
        ) : (
          [...workouts].reverse().map((workout) => (
            <div key={workout.id} className="history-card">
              <div className="history-card-header">
                <span className={`history-card-type ${getWorkoutColorClass(workout.type)}`}>
                  {getWorkoutName(workout.type)}
                </span>
                <span className="history-card-date">{formatDate(workout.createdAt)}</span>
              </div>

              <div className="history-card-grid">
                <div className="history-metric">
                  <div className="history-metric-label"><Timer size={14} /> ЧАС</div>
                  <div className="history-metric-value">{formatDuration(workout.duration)}</div>
                </div>

                <div className="history-metric">
                  <div className="history-metric-label"><Milestone size={14} /> ВІДСТАНЬ</div>
                  <div className="history-metric-value">
                    {workout.distance.toFixed(2)} <span className="history-unit">КМ</span>
                  </div>
                </div>

                <div className="history-metric">
                  <div className="history-metric-label"><Flame size={14} /> КАЛОРІЇ</div>
                  <div className="history-metric-value move-color">
                    {workout.calories} <span className="history-unit">ККАЛ</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
