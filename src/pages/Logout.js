import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../tailwind.css';

const Header = () => {
  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log('Logout bem-sucedido');
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
    });
  };

  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">iCollar</h1>
      <button onClick={handleLogout} className="bg-white text-blue-600 py-1 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">Logout</button>
    </header>
  );
};

export default Header;
