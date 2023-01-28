import React, { useState, useEffect, useContext } from 'react';
import { Button, LOButton } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../services/auth.service';
import { DataContext } from './Context'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Navbar() {
  const [currentUser, setUser] = useState(undefined);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [LObutton, setLOButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      setLOButton(false);
    } else {
      setButton(true);
      setLOButton(true);
    }
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    showButton();

    if (user) {
      setUser(user);
    }
  }, []);

  const logOut = () => {
    if (window.confirm("Do you really want to logout?")) {
      AuthService.logout();
      window.location.replace('/login');
      removeAllProduct();
      deleteAllCookies();
    }
  };

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const { cart, removeAllProduct } = useContext(DataContext);
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            BMTraining <i className="fas fa-dumbbell"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                HOME
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/training'
                className='nav-links'
                onClick={closeMobileMenu}
              >TRAINING
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/forum'
                className='nav-links'
                onClick={closeMobileMenu}
              >FORUM
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/shop'
                className='nav-links'
                onClick={closeMobileMenu}
              >SHOP
              </Link>
            </li>

            {currentUser ? (
              undefined
            ) : (
              <li>
                <Link
                  to='/sign-up'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >Sign Up
              </Link>
              </li>
            )}
            <li className='nav-item mobile'>
              <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            {
              currentUser ? (
                <>

                  <li className='nav-item mobile'>
                    <NavDropdown title={<i className="far fa-user" style={{ color: "white" }} align="right"></i>} id="nav-dropdown" >
                      <Link to={`/profile/${currentUser.username}`} className='nav-links' onClick={handleClick}>
                        <NavDropdown.Item href={`/profile/${currentUser.username}`}>Profile Setting</NavDropdown.Item>
                      </Link>
                      <Link to={`/purchased/${currentUser.username}`} className='nav-links' onClick={handleClick}>
                        <NavDropdown.Item href={`/purchased/${currentUser.username}`}>Purchased</NavDropdown.Item>
                      </Link>
                      <Link to={`/chart/${currentUser.username}`} className='nav-links' onClick={handleClick}>
                        <NavDropdown.Item href={`/chart/${currentUser.username}`}>BMI Tracker</NavDropdown.Item>
                      </Link>
                      <Link className='nav-links' onClick={handleClick}>
                        <NavDropdown.Item onClick={logOut}>Log Out, {currentUser.username}</NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                  </li>
                </>
              ) : (<div buttonStyle='btn--outline'></div>)
            }


          </ul>
          {
            currentUser ? (
              <>
                <li className='nav-item desktop'>
                  <Link to='/cart' className='nav-links' onClick={handleClick}>
                    <span className='countcart'>{cart.length}</span>
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </li>
                <li className='nav-item desktop'>
                  <NavDropdown title={<i className="far fa-user" style={{ color: "white", marginTop: "23px" }} > </i>} id="nav-dropdown" >
                    <Link to={`/profile/${currentUser.username}`} className='nav-links' onClick={handleClick}>
                      <NavDropdown.Item href={`/profile/${currentUser.username}`}>Profile Setting</NavDropdown.Item>
                    </Link>
                    <Link to={`/purchased/${currentUser.username}`} className='nav-links' onClick={handleClick}>
                      <NavDropdown.Item href={`/purchased/${currentUser.username}`}>Purchased</NavDropdown.Item>
                    </Link>
                    <Link to={`/chart/${currentUser.username}`} className='nav-links' onClick={handleClick}>
                      <NavDropdown.Item href={`/chart/${currentUser.username}`}>BMI Tracker</NavDropdown.Item>
                    </Link>
                    <Link className='nav-links' onClick={handleClick}>
                      <NavDropdown.Item onClick={logOut}>Log Out, {currentUser.username}</NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                </li>
              </>
            ) : (button ? (<Button buttonStyle='btn--outline'>SIGN UP</Button>) : (undefined))
          }

        </div>
      </nav>
    </>
  );
}

export default Navbar;
