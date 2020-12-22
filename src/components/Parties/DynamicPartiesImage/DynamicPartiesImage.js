import React from 'react';
import images from '../../../assets/groups-image/images';
import './DynamicPartiesImage.css';

export default class DyanmicPartiesImage extends React.Component {
  state = {
    dm: '',
    players: this.props.players_needed,
    prev_dm: '',
    prev_players: 0,
  };

  componentDidMount() {
    if (this.props.dm_needed) {
      this.setState({ dm: 'dm' });
    }
    if (this.props.players_needed === '0') {
      this.setState({ players: '' });
    }
    if (this.props.party_complete === 'Complete Party!') {
      this.setState({ players: 'complete' });
    }
    if (this.props.players_needed > 6) {
      this.setState({ players: '6' });
    }
  }

  render() {
    return (
      <div id="surround" className="group-image">
        <span id="initial">
          <img
            src={images[`${this.state.dm}fullparty${this.state.players}`]}
            alt="A full party of players playing a table top game."
          />
        </span>
        <span id="onhover">
          {' '}
          <img
            src={images[`fullpartyhover`]}
            alt="A full party of players playing a table top game."
          />
        </span>
      </div>
    );
  }
}
