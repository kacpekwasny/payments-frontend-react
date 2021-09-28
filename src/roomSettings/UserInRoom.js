import React from 'react';
import PropTypes from 'prop-types';

const UserInRoom = ({
  username, isAdmin,
}) => (
  <li>
    <p>
      {`${username} is ${isAdmin ? 'Admin' : 'Standard'}`}
    </p>
  </li>
);

export default UserInRoom;

UserInRoom.propTypes = {
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
