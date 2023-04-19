import * as Route from '@/constants/routes';
import logo from '@/images/med-logo.png';
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavToggle from './nav/NavToggle';

const HomeNav = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return (
    <div id="nav-main" className="nav-sprite">
      <div className='nav-container'>
      <div className="nav-mobile"><a className="nav-a" href="#!">All</a>
          <a className="nav-a" href="#!">Today's Deal</a>
          <a className="nav-a" href="#!">Best Seller</a>
          <a className="nav-a" href="#!">Today's Deal</a>
          <a className="nav-a" href="#!">Customer Services</a>
          <a className="nav-a" href="#!">Registry</a>
          <a className="nav-a" href="/">Shop Deals</a>
          </div>
        <nav>
          
          <ul className="nav-list">
            <li>
            <NavToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link basket-toggle"
                onClick={onClickToggle}
                type="button"
              >

               All
              </button>
            )}
          </NavToggle>
            
            </li>
            <li>
              <a href="#!">Today's Deal</a>
            </li>
            <li>
              <a href="#!">Customer Services</a>
            </li>
            <li>
              <a href="#!">Registry</a>
            </li>
            <li>
              <a href="#!">Gift Cards</a>
            </li>
          </ul>
        </nav>
        <div className="nav-right nav-list">
          <a href="/">Shop Deals</a>
        </div>
      </div>
    </div>

  );
};

export default HomeNav;
