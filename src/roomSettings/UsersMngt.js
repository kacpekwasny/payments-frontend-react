import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserMngtRow from './UserMngtRow';

const UsersMngt = ({
  userList, usersRole, addUser, changeUserRole, removeUser, myName,
}) => {
  const [newUserVar, setNewUserVar] = useState('');
  return (
    <div>
      <table>
        <tbody>
          {userList.map((uname) => (
            <UserMngtRow
              key={uname}
              username={uname}
              isAdmin={usersRole[uname]}
              changeUserRole={changeUserRole}
              removeUser={removeUser}
              myName={myName}
            />
          ))}
        </tbody>
      </table>
      <div>
        <input value={newUserVar} onChange={(e) => setNewUserVar(e.target.value)} type="text" placeholder="Type username to add user to room" />
        <button className="api-add-button" text="Add user" onClick={() => addUser(newUserVar)} aria-label="blah" type="button">Add user</button>
      </div>
    </div>
  );
};

export default UsersMngt;

UsersMngt.propTypes = {
  userList: PropTypes.arrayOf.isRequired,
  usersRole: PropTypes.shape.isRequired,
  addUser: PropTypes.func.isRequired,
  changeUserRole: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  myName: PropTypes.string.isRequired,
};
