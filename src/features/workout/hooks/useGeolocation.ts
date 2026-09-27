import { useState, useEffect, useRef } from 'react';
import type { LocationCoordinate } from '../../../types';

export const useGeolocation = (isTracking: boolean) => {
  const [route, setRoute] = useState<LocationCoordinate[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationCoordinate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isTracking) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим устройством');
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true, 
      timeout: 10000,           
      maximumAge: 0,            
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      
      const newCoordinate: LocationCoordinate = {
        latitude,
        longitude,
        timestamp: position.timestamp,
      };

      setCurrentLocation(newCoordinate);
      
      setRoute((prevRoute) => [...prevRoute, newCoordinate]);
    };

    const handleError = (geoError: GeolocationPositionError) => {
      switch (geoError.code) {
        case geoError.PERMISSION_DENIED:
          setError('Пожалуйста, разрешите доступ к геопозиции в настройках iPhone');
          break;
        case geoError.POSITION_UNAVAILABLE:
          setError('Сигнал GPS недоступен. Выйдите на открытое пространство');
          break;
        case geoError.TIMEOUT:
          setError('Время ожидания ответа от GPS истекло');
          break;
        default:
          setError('Произошла неизвестная ошибка геолокации');
      }
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking]);

  const resetRoute = () => {
    setRoute([]);
    setCurrentLocation(null);
    setError(null);
  };

  return { route, currentLocation, error, resetRoute };
};
