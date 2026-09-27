import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dashboard } from './features/dashboard/components/Dashboard';
import { ActiveWorkoutContainer } from './features/workout/components/ActiveWorkoutContainer';
import { WorkoutHistory } from './features/history/components/WorkoutHistory';
import { workoutService } from './services/workoutService';
import { History } from 'lucide-react';

type ScreenType = 'dashboard' | 'workout_active' | 'history';



function App() {
  const [screen, setScreen] = useState<ScreenType>('dashboard');
  const queryClient = useQueryClient();
  const [workoutType, setWorkoutType] = useState<'run' | 'walk' | 'cycling'>('run');

  const saveWorkoutMutation = useMutation({
    mutationFn: workoutService.saveWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      setScreen('dashboard');
    },
    onError: (error) => {
      console.error('Помилка при збереженні тренування:', error);
      alert('Не вдалося зберегти тренування. Перевірте з’єднання.');
    }
  });

  const handleStopWorkout = (duration: number, distance: number, calories: number) => {
    const newWorkout = {
      type: workoutType, 
      duration,
      distance,
      calories,
      route: [],
      createdAt: Date.now()
    };

    saveWorkoutMutation.mutate(newWorkout);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <button 
        onClick={() => setScreen('history')}
        style={{
          position: 'absolute', top: '38px', right: '16px', background: '#1c1c1e',
          border: 'none', color: '#9aff00', padding: '10px', borderRadius: '50%',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
        }}
      >
        <History size={22} />
      </button>

      {}
      <Dashboard 
        onStartWorkoutClick={() => setScreen('workout_active')} 
        selectedType={workoutType}
        onTypeChange={setWorkoutType}
      />
    </div>
  );
      case 'workout_active':
        return <ActiveWorkoutContainer onStopWorkout={handleStopWorkout} />;
      case 'history':
        return <WorkoutHistory onBack={() => setScreen('dashboard')} />;
      default:
        return <Dashboard 
  onStartWorkoutClick={() => setScreen('workout_active')} 
  selectedType={workoutType}
  onTypeChange={setWorkoutType}
/>;
    }
  };

  return <>{renderScreen()}</>;
}

export default App;
