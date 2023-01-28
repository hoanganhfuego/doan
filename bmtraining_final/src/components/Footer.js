import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
          <Link to='/' className='navbar-logo'>
            BMTraining <i className="fas fa-dumbbell"></i>
          </Link>
          </div>
          <small className='website-rights'>BMTraining © 2021</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to={{ pathname: 'https://www.facebook.com/BMTraining-106110228244700' }}
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to={{ pathname: 'https://www.instagram.com/' }} 
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to={{ pathname: 'https://www.youtube.com/' }} 
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
