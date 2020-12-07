import React from 'react';
import partiesApi from '../../Helpers/ApiHelpers/parties';
import Validators from '../../Helpers/Validators';
import TokenService from '../../Helpers/TokenService';
import './Chatbox.css';
import { animateScroll } from 'react-scroll';

export default class Chatbox extends React.Component {
  state = {
    error: null,
    current_messages: [],
  };

  handleSubmitChatMessage = (e) => {
    e.preventDefault();
    const message = e.target.chat_msg.value;
    e.target.chat_msg.value = '';
    this.setState({
      error: null,
    });
    if (!message) {
      this.setState({
        error: 'Please enter a message.',
      });
      return;
    }
    this.props.handleStartLoading();
    partiesApi
      .submitChatboxMessage(message, this.props.party_id)
      .then(() => {
        this.chatMessagesApi();
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
        this.setState({ current_messages: Validators.sortMessagesByDate(res) });
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'chatbox-window',
      duration: 0,
    });
  }

  render() {
    const messages = this.state.current_messages.map((chat, idx) => {
      return (
        <div key={idx}>
          <span className="chatbox-user_name">{chat.user_name}</span>:{' '}
          <span className="chatbox-message">{chat.message} </span>
          <span className="chatbox-time">
            {Validators.newDate(chat.date_created)}
          </span>
        </div>
      );
    });
    return (
      <div className="chatbox">
        <div className="chatbox-window" id="chatbox-window">
          {messages}
        </div>
        <form
          id="chatbox-form"
          onSubmit={(e) => this.handleSubmitChatMessage(e)}
          action="#"
        >
          <div className="chatbox-button-wrapper">
            {this.state.error && (
              <span className="register-error" id="register-error">
                {this.state.error}
                <br />
              </span>
            )}
            <input
              aria-label="Chatbox message"
              maxLength={100}
              name="chat_msg"
              id="chat_msg"
              placeholder="Message"
            ></input>
            <button
              disabled={!TokenService.hasAuthToken()}
              type="submit"
              value="Submit"
              id="chatbox-submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
