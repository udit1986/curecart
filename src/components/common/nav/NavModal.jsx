/* eslint-disable max-len */
import NavToggle from './NavToggle';
import { Boundary, Modal } from '@/components/common';
import { CHECKOUT_STEP_1 } from '@/constants/routes';
import firebase from 'firebase/firebase';
import { calculateTotal, displayMoney } from '@/helpers/utils';
import { useDidMount, useModal } from '@/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { clearBasket } from '@/redux/actions/basketActions';
import { Link } from 'react-router-dom';

const NavModal = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.auth
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount && firebase.auth.currentUser && basket.length !== 0) {
      firebase.saveBasketItems(basket, firebase.auth.currentUser.uid)
        .then(() => {
          console.log('Item saved to basket');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [basket.length]);

  const onCheckOut = () => {
    if ((basket.length !== 0 && user)) {
      document.body.classList.remove('is-nav-open');
      history.push(CHECKOUT_STEP_1);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove('nav-open');
    history.push(CHECKOUT_STEP_1);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };

  const handleLinkClick = (event) => {
    event.preventDefault();

    // find element and append class
    let currentItem = document.querySelector(`#hmenu-content ul[data-menu-id="${event.currentTarget.getAttribute('data-menu-id')}"]`);
    currentItem.classList.add('hmenu-visible');
    currentItem.classList.add('hmenu-translateX');
    currentItem.classList.remove('hmenu-translateX-right');
    let nextItem = document.querySelector(`#hmenu-content ul[data-menu-id="1"]`);
    nextItem.classList.remove('hmenu-translateX');
    nextItem.classList.remove('hmenu-visible');
    nextItem.classList.add('hmenu-translateX-left');
  };

  const handleLinkBackClick = (event) => {
    event.preventDefault();
    let currentItem = document.querySelector(`#hmenu-content ul[data-menu-id="${event.currentTarget.getAttribute('data-menu-id')}"]`);
    currentItem.classList.remove('hmenu-visible');
    currentItem.classList.remove('hmenu-translateX');
    currentItem.classList.add('hmenu-translateX-right');
    let nextItem = document.querySelector(`#hmenu-content ul[data-menu-id="1"]`);
    nextItem.classList.add('hmenu-translateX');
    nextItem.classList.add('hmenu-visible');
    nextItem.classList.remove('hmenu-translateX-left');
  }

  return user && user.role === 'ADMIN' ? null : (
    <Boundary>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
      >
        <p className="text-center">You must sign in to continue checking out</p>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-border button-border-gray button-small"
            onClick={onCloseModal}
            type="button"
          >
            Continue shopping
          </button>
          &nbsp;
          <button
            className="button button-small"
            onClick={onSignInClick}
            type="button"
          >
            Sign in to checkout
          </button>
        </div>
      </Modal>
      <div className="navbasket" id="hmenu-container">
        <div className="navmenu-list " id="hmenu-canvas">
          <div id="hmenu-customer-profile-link"
            onclick="$Nav.getNow('signInRedirect')('nav_em_hd_re_signin', '/gp/css/homepage.html?ref_=nav_em_your_account', 'nav_em_hd_clc_signin')"
            data-nav-ref="nav_em_hd_re_signin">
            <div id="hmenu-customer-profile">
              <div id="hmenu-customer-profile-left" className="hmenu-avatar-icon">
                <div id="hmenu-customer-avatar-icon" className="nav-sprite"></div>
              </div>
              <div id="hmenu-customer-profile-right">
                <div id="hmenu-customer-name">
                  <b>Hello, Guest</b>
                </div>
                <NavToggle>
                  {({ onClickToggle }) => (
                    <span
                      className="nav-toggle button button-border button-border-gray button-small"
                      onClick={onClickToggle}
                      role="presentation"
                    >
                      Close
                    </span>
                  )}
                </NavToggle>
              </div>
            </div>
          </div>
          <div id="hmenu-content">
            <ul className='hmenu hmenu-visible hmenu-translateX' data-menu-id="1" >
              <li>
                <div className="hmenu-item hmenu-title ">Trending</div>
              </li>
              <li>
                <Link className={"hmenu-item"} to="/about">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link className={"hmenu-item"} to="/about">
                  New Release
                </Link>
              </li>
              <li className="hmenu-separator"></li>
              <li>
                <div className="hmenu-item hmenu-title ">Shop by Category</div>
              </li>
              <li>
                <Link className={"hmenu-item"} onClick={handleLinkClick} to="/about" data-menu-id="2">
                  <div>Fever, Cough </div>
                  <i className="nav-sprite hmenu-arrow-next"></i>
                </Link>
              </li>
              <li>
                <Link className={"hmenu-item"} onClick={handleLinkClick} to="/about" data-menu-id="3">
                  <div>Diabetes </div>
                  <i className="nav-sprite hmenu-arrow-next"></i>
                </Link>
              </li>
            </ul>
            <ul className='hmenu hmenu-translateX-right' data-menu-id="2" >
              <li>
                <Link className={"hmenu-item hmenu-back-button"} onClick={handleLinkBackClick} to="/about" data-menu-id="2">
                  <i className="nav-sprite hmenu-arrow-prev"></i>
                  <div style={{ "alignItems": "center" }}>Main Menu</div>

                </Link>
              </li>
              <li>
                <div className="hmenu-item hmenu-title ">Trending</div>
              </li>
              <li>
                <Link className={"hmenu-item"} to="/about">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link className={"hmenu-item"} to="/about">
                  New Release
                </Link>
              </li>

            </ul>
            <ul className='hmenu hmenu-translateX-right' data-menu-id="3" >
              <li>
                <Link className={"hmenu-item hmenu-back-button"} onClick={handleLinkBackClick} to="/" data-menu-id="3">
                  <i className="nav-sprite hmenu-arrow-prev"></i>
                  <div style={{ "alignItems": "center" }}>Main Menu</div>
                </Link>
              </li>
              <li>
                <div className="hmenu-item hmenu-title ">Trending</div>
              </li>
              <li>
                <a href="/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2" className="hmenu-item">Menu 3</a>
              </li>
              <li>
                <a href="/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2" className="hmenu-item">Menu 3</a>
              </li>

            </ul>
          </div>
        </div>
        <div className="basket-checkout">

        </div>
      </div>
    </Boundary>
  );
};

export default NavModal;
