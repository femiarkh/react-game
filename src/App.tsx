import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

const GAME_SIZE = 3;

export const App = () => (
  <div className="container">
    <Header />
    <Main />
    <Footer />
  </div>
);


