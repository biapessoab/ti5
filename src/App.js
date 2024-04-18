import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import coordinates from './coordinates.json';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhcGVzc29hYiIsImEiOiJjbGRuZXR4Z2YwY3VoM3ZvNGpoeW1yZmZnIn0.IUZFAtmrh6HRT_62ziwTIQ';

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const lastIndex = coordinates.length - 1; 

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates[lastIndex].lng, coordinates[lastIndex].lat], // Última coordenada
      zoom: 12
    });

    marker.current = new mapboxgl.Marker()
      .setLngLat([coordinates[lastIndex].lng, coordinates[lastIndex].lat]) // Última coordenada
      .addTo(map.current);

    const updateMarker = () => {
      const { lng, lat } = coordinates[lastIndex];
      marker.current.setLngLat([lng, lat]);
    };

    const intervalId = setInterval(updateMarker, 2000);

    return () => clearInterval(intervalId);
  }, [lastIndex]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Mapbox;
