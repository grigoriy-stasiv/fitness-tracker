import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LocationCoordinate } from '../../../types';

interface WorkoutMapProps {
  currentLocation: LocationCoordinate | null;
  route: LocationCoordinate[];
}

const ChangeMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom()); 
  }, [center, map]);
  return null;
};


const iosLocationIcon = new L.Icon({
  iconUrl: 'https://wikimedia.org',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});



export const WorkoutMap: React.FC<WorkoutMapProps> = ({ currentLocation, route }) => {
  const defaultCenter: [number, number] = [50.4501, 30.5234];
  
  const currentCenter: [number, number] = currentLocation 
    ? [currentLocation.latitude, currentLocation.longitude] 
    : defaultCenter;

  const polylinePositions: [number, number][] = route.map(point => [
    point.latitude,
    point.longitude
  ]);

  return (
    <div style={{ 
      width: '100%', 
      height: '350px', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      position: 'relative',
      border: '1px solid #2c2c2e',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    }}>
      <MapContainer 
        center={currentCenter} 
        zoom={16} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false} 
      >
        {}
        <TileLayer
          url="https://{s}://{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>'
        />

        {}
        {currentLocation && (
          <>
            <Marker position={currentCenter} icon={iosLocationIcon} />
            <ChangeMapCenter center={currentCenter} />
          </>
        )}

        {}
        {polylinePositions.length > 1 && (
          <Polyline 
            positions={polylinePositions} 
            pathOptions={{ 
              color: '#9aff00', 
              weight: 5, 
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round'
            }} 
          />
        )}
      </MapContainer>
    </div>
  );
};
