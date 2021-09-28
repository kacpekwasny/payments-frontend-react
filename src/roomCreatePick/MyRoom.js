import React from 'react';
import PropTypes from 'prop-types';

function convDateTimeString(dt) {
  return dt.replace('T', ' ').replace('Z', '').split(' ')[0].split('-').reverse().join('-');
}

const MyRoom = ({ room, genRoomLink, leaveRoom }) => (
  <div className="in-shadow-section flexrow">
    <a className="leftMyRoom" href={genRoomLink(room.link)}>
      <p>{room.name}</p>
      <p>{`Saldo: ${room.saldo}`}</p>
      {room.is_admin ? <p>You are admin</p> : null}
      <p>{`Joined: ${convDateTimeString(room.joined)}`}</p>
    </a>
    <div className="rightMyRoom">
      <button className="closeButton" onClick={() => { if (window.confirm('Are you sure you want to leave this room?')) leaveRoom(room.link); }} type="button" aria-label="blah">&times;</button>
    </div>
  </div>
);

export default MyRoom;

MyRoom.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    saldo: PropTypes.number,
    is_admin: PropTypes.bool,
    joined: PropTypes.string,
  }).isRequired,
  genRoomLink: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
};
