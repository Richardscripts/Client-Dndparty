import React from 'react';
import images from '../../../Assets/Groups-image/images';

export default function DyanmicPartiesImage(props) {
  let dm = '';
  let players = props.players_needed;
  if (props.dm_needed) {
    dm = 'dm';
  }
  if (props.players_needed === '0') {
    players = '';
  }
  if (props.party_complete === 'Complete Party!') {
    players = 'complete';
  }
  if (props.players_needed > 6) {
    players = '6';
  }
  return (
    <div className="group-image">
      <img
        src={images[`${dm}fullparty${players}`]}
        alt="A full party of players playing a table top game."
      />
    </div>
  );
}
