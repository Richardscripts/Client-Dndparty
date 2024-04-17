import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import partiesApiHelper from '../../Helpers/ApiHelpers/PartiesHelper';
import Validators from '../../Helpers/Validators';
import TokenService from '../../Helpers/TokenService';
import { animateScroll } from 'react-scroll';
import './Chatbox.css';

const Chatbox = (props) => {
  const [error, setError] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);

  const handleSubmitChatMessage = (e) => {
    e.preventDefault();
    const message = e.target.chat_msg.value;
    e.target.chat_msg.value = '';
    setError(null);
    if (!message) {
      setError('Please enter a message.');
      return;
    }
    props.handleStartLoading();
    partiesApiHelper
      .submitChatboxMessage(message, props.party_id)
      .then(() => {
        chatMessagesApi();
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
  };

  const chatMessagesApi = () => {
    const { match } = props;
    const party_id = match.params.party_id;
    props.handleStartLoading();

    partiesApiHelper
      .getChatboxMessages(party_id)
      .then((res) => {
        setCurrentMessages(Validators.sortMessagesByDate(res));
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });

    if (window.location.pathname.includes('Party')) {
      setTimeout(chatMessagesApi, 15000);
    }
  };

  useEffect(() => {
    chatMessagesApi();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'chatbox-window',
      duration: 0,
    });
  };

  const messages = currentMessages.map((chat, idx) => {
    return (
      <div key={idx}>
        <Link to={`/Player_Profile/${chat.user_id}`}>
          <span className="chatbox-user_name">{chat.user_name}</span>
        </Link>
        : <span className="chatbox-message">{chat.message} </span>
        <span className="chatbox-time">
          {Validators.getNewDate(chat.date_created)}
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
        onSubmit={(e) => handleSubmitChatMessage(e)}
        action="#"
      >
        <div className="chatbox-button-wrapper">
          {error && (
            <span className="register-error" id="register-error">
              {error}
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
};

export default Chatbox;
