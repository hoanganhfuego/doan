import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Searchbar.css';

class Searchbar extends Component {
    render()  {
      return (
        <>
          <div className='searchbar'>
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search....." aria-label="Search"
                aria-describedby="search-addon" id="search-input" />
              <span className="input-group-text border-0 noborder" id="search-addon">
                <Link className='search-links' id="search-button" >
                  <i className="fas fa-search"></i>
                </Link>
              </span>
            </div>
          </div>
        </>
    
      );
    }
}

export default Searchbar;


