import React from 'react';
import images from '../../../Assets/Groups-image/images';

export default class DyanmicPartiesImage extends React.Component {
  state = {
    dm: '',
    players: this.props.players_needed,
    prev_dm: '',
    prev_players: 0,
  };

  imageHover = () => {
    this.setState({ prev_dm: this.state.dm, prev_players: this.state.players });
    this.setState({
      dm: '',
      players: 'hover',
    });
  };

  imageUnhover = () => {
    this.setState({
      dm: this.state.prev_dm,
      players: this.state.prev_players,
    });
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
      <div className="group-image">
        <img
          src={images[`${this.state.dm}fullparty${this.state.players}`]}
          alt="A full party of players playing a table top game."
          onMouseOver={() => this.imageHover()}
          onMouseOut={() => this.imageUnhover()}
        />
      </div>
    );
  }
}
