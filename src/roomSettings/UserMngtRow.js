import React from 'react';
import PropTypes from 'prop-types';

const UserMngtRow = ({
  username, isAdmin, changeUserRole, removeUser, myName,
}) => {
  const role = isAdmin ? 'Admin' : 'Standard';
  const notRole = !isAdmin ? 'Admin' : 'Standard';
  return (
    <tr>
      <td>{`${username} is ${role}`}</td>
      <td>
        <button
          className="change-user-role"
          onClick={() => changeUserRole(username, !isAdmin ? 'admin' : 'standard')}
          type="button"
          aria-label="blah"
          disabled={username === myName}
        >
          {`Make ${notRole}`}
        </button>
      </td>
      <td>
        <button
          className="remove-user"
          onClick={() => { if (window.confirm(`Are you sure you wish to remove ${username} from this room, after re-adding his saldo will reset to '0'?`)) removeUser(username); }}
          type="button"
          aria-label="blah"
          disabled={username === myName}
        >
          Remove from room
        </button>
      </td>
    </tr>
  );
};

export default UserMngtRow;

UserMngtRow.propTypes = {
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  changeUserRole: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  myName: PropTypes.func.isRequired,
};
