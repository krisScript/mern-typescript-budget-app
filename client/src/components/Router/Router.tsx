import React, { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Loader from '../../Loader';
import Navbar from '../Navbar/Navbar';
// const ExpenseForm = lazy(() => import('./ExpenseForm/ExpenseForm'));
// const Home = lazy(() => import('./Home'));
const Router: FunctionComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="main-container">
          <Switch />
        </div>
      </>
    </BrowserRouter>
  );
};

export default Router;
