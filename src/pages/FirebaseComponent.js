import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from './Logout';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhcGVzc29hYiIsImEiOiJjbGRuZXR4Z2YwY3VoM3ZvNGpoeW1yZmZnIn0.IUZFAtmrh6HRT_62ziwTIQ';

const FirebaseComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyARwIIxDFyN_Qx2JHLdLJjVWhSnn-U-sWA",
      authDomain: "arduino-ti5.firebaseapp.com",
      databaseURL: "https://arduino-ti5-default-rtdb.firebaseio.com",
      projectId: "arduino-ti5",
      storageBucket: "arduino-ti5.appspot.com",
      messagingSenderId: "1026824030016",
      appId: "1:1026824030016:web:c368404d5d43c0fd1e9ca5"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); 
    }

    const database = firebase.database();
    const user = firebase.auth().currentUser;
    const uid = user ? user.uid : ''; // Obter o UID do usuário atual

    const dataRef = database.ref(`coordenadas-${uid}`); // Criar uma tabela específica para o usuário

    dataRef.on('value', (snapshot) => {
      setData(snapshot.val());
    });

    return () => {
      dataRef.off('value');
    };
  }, []); 

  useEffect(() => {
    if (!data) return; 

    const coordinates = Object.values(data);
    console.log(JSON.stringify(coordinates)); // Test 1: Verificar os dados recebidos do Firebase

    const lastIndex = coordinates.length - 1;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coordinates[lastIndex].longitude, coordinates[lastIndex].latitude],
        zoom: 12
      });
    }

    if (!marker.current) {
      marker.current = new mapboxgl.Marker()
        .setLngLat([coordinates[lastIndex].longitude, coordinates[lastIndex].latitude])
        .addTo(map.current);
    }

    const updateMarker = () => {
      const { longitude, latitude } = coordinates[lastIndex];
      marker.current.setLngLat([longitude, latitude]);
    };

    const intervalId = setInterval(updateMarker, 2000); // Test 3: Verificar se o marcador está sendo atualizado

    return () => clearInterval(intervalId);
  }, [data]);

  const saveCoordinates = (longitude, latitude) => {
    const userUid = firebase.auth().currentUser.uid; // Obter UID do usuário atual
    const database = firebase.database();
    const coordinatesRef = database.ref(`coordenadas-${userUid}`); // Usar o UID do usuário para criar a tabela específica

    // Incluir o UID do usuário como parte dos dados
    coordinatesRef.push({
      longitude,
      latitude
    });
  };

  return (
    <>
      <div>
        <Header />
        <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
      </div>
    </>
  );
};

export default FirebaseComponent;
