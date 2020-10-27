import React from 'react';
import partiesApi from '../../Helpers/ApiHelpers/parties';

export default class Chatbox extends React.Component {
  state = {
    error: null,
    current_messages: [],
  };

  handleSubmitChatMessage = (e) => {
    e.preventDefault();
    const { chat_msg } = e.target;
    this.setState({
      error: null,
    });
    this.props.handleStartLoading();
    partiesApi
      .submitChatboxMessage(chat_msg.value, this.props.party_id)
      .then((res) => {
        this.setState(this.state.current_messages.push(res));
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
  };

  chatMessagesApi = () => {
    const { match } = this.props;
    const party_id = match.params.party_id;
    this.props.handleStartLoading();
    partiesApi
      .getChatboxMessages(party_id)
      .then((res) => {
        this.setState({ current_messages: res });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
  };

  componentDidMount() {
    this.chatMessagesApi();
  }

  render() {
    const messages = this.state.current_messages.map((chat) => {
      return (
        <div>
          {chat.message}
          {chat.date_created}
        </div>
      );
    });
    return (
      <div className="chatbox">
        <div className="chatbox-messages">{messages}</div>
        <form onSubmit={(e) => this.handleSubmitChatMessage(e)} action="#">
          <label htmlFor="chat_msg">Message:</label>
          <input maxLength={100} name="chat_msg" id="chat_msg"></input>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
