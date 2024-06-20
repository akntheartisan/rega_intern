import React from "react";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                <div className="site-logo">
                  <Link href="index.html">
                    <img src="assets/img/logo.png" alt />
                  </Link>
                </div>
                <nav className="main-menu">
                  <ul>
                    <li className="current-list-item">
                      <Link to="/">Home</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="index.html">Static Home</Link>
                        </li>
                        <li>
                          <Link href="index_2.html">Slider Home</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="about.html">About</Link>
                    </li>
                    <li>
                      <Link href="#">Pages</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="404.html">404 page</Link>
                        </li>
                        <li>
                          <Link href="about.html">About</Link>
                        </li>
                        <li>
                          <Link href="cart.html">Cart</Link>
                        </li>
                        <li>
                          <Link href="checkout.html">Check Out</Link>
                        </li>
                        <li>
                          <Link href="contact.html">Contact</Link>
                        </li>
                        <li>
                          <Link href="news.html">News</Link>
                        </li>
                        <li>
                          <Link href="shop.html">Shop</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="news.html">News</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="news.html">News</Link>
                        </li>
                        <li>
                          <Link href="single-news.html">Single News</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                      <Link href="shop.html">Shop</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="shop.html">Shop</Link>
                        </li>
                        <li>
                          <Link href="checkout.html">Check Out</Link>
                        </li>
                        <li>
                          <Link href="single-product.html">Single Product</Link>
                        </li>
                        <li>
                          <Link href="cart.html">Cart</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="header-icons">
                        <Link className="shopping-cart" href="cart.html">
                          <i className="fas fa-shopping-cart" />
                        </Link>
                        <Link className="mobile-hide search-bar-icon" href="#">
                          <i className="fas fa-search" />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </nav>
                <Link className="mobile-show search-bar-icon" href="#">
                  <i className="fas fa-search" />
                </Link>
                <div className="mobile-menu" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
