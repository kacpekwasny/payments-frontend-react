import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UserInRoom from './UserInRoom';
import UsersMngt from './UsersMngt';

const RoomSettings = ({
  amAdmin, userList, usersRole, addUser, roomName,
  setRoomName, roomDesc, setRoomDesc, changeUserRole,
  removeUser, myName,
}) => {
  const [roomNameVar, setRoomNameVar] = useState(roomName);
  const [roomDescVar, setRoomDescVar] = useState(roomDesc);
  return (
    <div className="RoomSettings white-window">
      <div className="section in-shadow-section">
        {
          amAdmin ? (
            <UsersMngt
              userList={userList}
              usersRole={usersRole}
              addUser={addUser}
              changeUserRole={changeUserRole}
              removeUser={removeUser}
              myName={myName}
            />
          )
            : (
              <ul className="userList">
                {
                 userList.map(((uname) => (
                   <UserInRoom
                     username={uname}
                     isAdmin={usersRole[uname]}
                   />
                 )))
                }
              </ul>
            )
        }
      </div>
      {amAdmin
      && (
      <div className="section in-shadow-section">
        <input name="" id="" onChange={(e) => setRoomNameVar(e.target.value)} defaultValue={roomName} />
        <button className="api-add-button" onClick={() => setRoomName(roomNameVar)} type="button" aria-label="blah">Change room name</button>
      </div>
      )}
      {amAdmin
        ? (
          <div className="section in-shadow-section">
            <textarea name="" id="" cols="30" rows="10" onChange={(e) => setRoomDescVar(e.target.value)} defaultValue={roomDesc} />
            <button className="api-add-button" onClick={() => setRoomDesc(roomDescVar)} type="button" aria-label="blah">Change description</button>
          </div>
        ) : (
          <div className="section">
            {roomDesc}
          </div>
        )}
    </div>
  );
};

export default RoomSettings;

RoomSettings.propTypes = {
  amAdmin: PropTypes.bool.isRequired,
  userList: PropTypes.arrayOf.isRequired,
  usersRole: PropTypes.shape.isRequired,
  addUser: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  setRoomName: PropTypes.func.isRequired,
  roomDesc: PropTypes.string.isRequired,
  setRoomDesc: PropTypes.func.isRequired,
  changeUserRole: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  myName: PropTypes.string.isRequired,
};
