import axios from 'axios';
import type { Workout } from '../types';

const API_URL = 'https://6ab95de8f84897980b729014.mockapi.io/workouts';

export const workoutService = {
  getWorkouts: async (): Promise<Workout[]> => {
    const response = await axios.get<Workout[]>(API_URL);
    return response.data;
  },

  saveWorkout: async (newWorkout: Omit<Workout, 'id'>): Promise<Workout> => {
    const response = await axios.post<Workout>(API_URL, newWorkout);
    return response.data;
  }
};
