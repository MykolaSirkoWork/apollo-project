/* eslint-disable no-console */
/* eslint-disable max-len */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { GET_ALL_FRUITS } from '../../api/fruits';
import { GET_ALL_VEGETABLES } from '../../api/vegetables';
import { AddForm } from '../../components/AddForm';
import { ItemsList } from '../../components/ItemsList';
import { AppContext } from '../../context/AppContext';
import './HomePage.scss';

export const HomePage = () => {
  const {
    role,
    setRole,
    setAccessToken,
    setFruits,
    setVegetables,
  } = useContext(AppContext);

  const [getFruitsFromServer, { data: fruitsFromServer, loading: load }] = useLazyQuery(GET_ALL_FRUITS);
  const [getVegetablesFromServer, { data: vegetablesFromServer, loading }]
  = useLazyQuery(GET_ALL_VEGETABLES);

  useEffect(() => {
    console.log('render');
    getFruitsFromServer();
    if (fruitsFromServer && fruitsFromServer.fruits) {
      setFruits(fruitsFromServer.fruits.map(
        ({ id, name, price }: {id: string, name: string, price: number }) => ({ id, name, price }),
      ));
    }
  }, [load]);

  useEffect(() => {
    getVegetablesFromServer();
    if (vegetablesFromServer && vegetablesFromServer.vegetables) {
      setVegetables(vegetablesFromServer.vegetables.map(
        ({ id, name, price }: {id: string, name: string, price: number }) => ({ id, name, price }),
      ));
    }
  }, [loading]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    setRole('');
    setAccessToken(null);
  };

  return (
    <div className="home">
      <button
        type="button"
        onClick={handleLogout}
        className="home__log-out"
      >
        Logout
      </button>
      <div className="home__title">Items List</div>
      <p>{`(Your role is: ${role})`}</p>
      <AddForm />
      <div className="list">
        <ItemsList />
      </div>
    </div>
  );
};
