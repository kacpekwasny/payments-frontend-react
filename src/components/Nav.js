import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeLanguage } from '../libs/language/i18n';

import './Nav.scss';

const Nav = ({
  username, saldo, roomName, baseURL, reload,
}) => (
  <nav>
    <div className="row left">
      <Link to={`${baseURL}/room-create-pick`} className="arrow-back">
        &#10229;
      </Link>
      <p className="p-username">{username}</p>
      <span>&nbsp;:&nbsp;</span>
      <p className="p-saldo">{saldo}</p>
      <button onClick={reload} className="reload-arrow clear-bg" type="button" aria-label="blah">&#8634;</button>
    </div>
    <div className="middle">
      <p>{roomName}</p>
    </div>
    <div className="row right">
      <button type="button" className="pl" onClick={() => { changeLanguage('pl'); }}>pl</button>
      <button type="button" className="en" onClick={() => { changeLanguage('en'); }}>en</button>
    </div>
  </nav>
);

Nav.propTypes = {
  username: PropTypes.string.isRequired,
  saldo: PropTypes.number.isRequired,
  roomName: PropTypes.string.isRequired,
  baseURL: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
};

export default Nav;
