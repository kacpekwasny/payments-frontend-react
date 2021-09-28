import React from 'react';
import { Link, useLocation, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import './WallLink.scss';

const WallLink = ({ LR, urlParams, baseURL }) => {
  const location = useLocation();
  const urlMap = new Map();
  urlMap.set(`${baseURL}/main`, {
    leftLink: `${baseURL}/new-payment${urlParams}`,
    rightLink: `${baseURL}/settings${urlParams}`,
    leftText: 'New payment',
    rightText: 'Settings',
  });

  urlMap.set(`${baseURL}/new-payment`, {
    leftLink: '',
    rightLink: `${baseURL}/main${urlParams}`,
    rightText: 'Room',
  });

  urlMap.set(`${baseURL}/settings`, {
    leftLink: `${baseURL}/main${urlParams}`,
    rightLink: '',
    leftText: 'Room',
  });

  const obj = urlMap.get(location.pathname);
  if (obj === undefined) {
    return <Route path="hasydewbgdffudsn" />;
  }
  if (LR === 'left' && obj.leftLink !== '') {
    return (
      <Link to={obj.leftLink} className="wallLink leftLink">
        <div>{obj.leftText}</div>
      </Link>
    );
  }

  if (LR === 'right' && obj.rightLink !== '') {
    return (
      <Link to={obj.rightLink} className="wallLink rightLink">
        <div>{obj.rightText}</div>
      </Link>
    );
  }

  return (
    <div style={{ display: 'none' }} />
  );
};

export default WallLink;

WallLink.propTypes = {
  LR: PropTypes.string.isRequired,
  urlParams: PropTypes.string.isRequired,
  baseURL: PropTypes.string.isRequired,
};
