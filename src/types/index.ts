export type WorkoutType = 'run' | 'walk' | 'cycling';

export interface LocationCoordinate {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number;      
  distance: number;      
  calories: number;      
  route: LocationCoordinate[]; 
  createdAt: number;     
}

export interface DailyActivity {
  move: { current: number; goal: number };     
  exercise: { current: number; goal: number }; 
  stand: { current: number; goal: number };    
}
