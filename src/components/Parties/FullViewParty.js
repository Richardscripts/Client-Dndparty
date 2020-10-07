import React from 'react';
import images from '../../Assets/Groups-image/images';
import ApiHelpers from '../../Helpers/ApiHelpers';

import './Parties.css';

class FullViewParty extends React.Component {
  state = {
    error: null,
    current_parties: [],
  };

  componentDidMount() {
    ApiHelpers.getPartyTables()
      .then((res) => {
        this.setState({
          current_parties: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  render() {
    return <></>;
  }
}

export default FullViewParty;
