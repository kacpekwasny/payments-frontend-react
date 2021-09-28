import React from 'react';
import PropTypes from 'prop-types';

import MyRoom from './MyRoom';
import './RoomCreatePick.scss';

const RoomCreatePick = ({
  myRooms, genRoomLink, createRoom, leaveRoom,
}) => {
  console.log('render RoomCreatePick myRooms', myRooms);
  return (
    <div className="RoomCreatePick width100">
      <div className="white-window">
        <button onClick={createRoom} type="button" aria-label="blah">
          <h3>
            Create new room
          </h3>
        </button>
      </div>
      <div className="white-window">
        <h3>
          My rooms
        </h3>
        <div className="my-rooms">
          {myRooms.length > 0
            ? myRooms.map((room) => (
              <MyRoom
                room={room}
                genRoomLink={genRoomLink}
                leaveRoom={leaveRoom}
              />
            ))
            : <h4>You have no rooms, create one or ask a friend to add you to one.</h4>}
        </div>
      </div>
    </div>
  );
};

export default RoomCreatePick;

RoomCreatePick.propTypes = {
  myRooms: PropTypes.arrayOf.isRequired,
  genRoomLink: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
};
