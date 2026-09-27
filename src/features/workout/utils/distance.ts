import type { LocationCoordinate } from '../../../types';


const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const calculateDistanceBetweenPoints = (
  point1: LocationCoordinate,
  point2: LocationCoordinate
): number => {
  const EARTH_RADIUS = 6371000; 

  const dLat = toRadians(point2.latitude - point1.latitude);
  const dLon = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.latitude)) *
      Math.cos(toRadians(point2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return EARTH_RADIUS * c; 
};


export const calculateTotalDistance = (route: LocationCoordinate[]): number => {
  if (route.length < 2) return 0;

  let totalMeters = 0;

  for (let i = 0; i < route.length - 1; i++) {
    totalMeters += calculateDistanceBetweenPoints(route[i], route[i + 1]);
  }

  return totalMeters / 1000;
};
