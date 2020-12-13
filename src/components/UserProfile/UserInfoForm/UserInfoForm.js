import React from 'react';

export default class UserInfoForm extends React.Component {
  render() {
    const editing = this.props.editing;
    const userInfo = this.props.info.map((info, idx) => {
      return (
        <div tabIndex="0" className="user-info-container" key={idx}>
          <div className="left-content">
            <span tabIndex="0">Nickname:</span>
            <p tabIndex="0">{info.user_name || '�'}</p> <br />
            <span tabIndex="0"> Name:</span>{' '}
            <p tabIndex="0">{info.name || '�'}</p> <br />
            <span tabIndex="0">D&amp;D Experience:</span>{' '}
            <p tabIndex="0">{info.dnd_experience || '�'}</p> <br />
            <span tabIndex="0">Fluent Languages:</span>{' '}
            <p tabIndex="0">{info.languages || '�'}</p> <br />
            <span tabIndex="0">Location:</span>{' '}
            <p tabIndex="0">{info.location || '�'}</p> <br />
            <span tabIndex="0">Preferred Editions:</span>{' '}
            <p tabIndex="0">{info.preferred_editions || '�'}</p> <br />
            <span tabIndex="0">Preferred Classes:</span>{' '}
            <p tabIndex="0">{info.preferred_classes || '�'}</p> <br />
            <span tabIndex="0">Additional Contact:</span>{' '}
            <p tabIndex="0">{info.contact || '�'}</p> <br />
          </div>
          <div className="right-content">
            <span tabIndex="0">About Me:</span>
            <p tabIndex="0" className="about-me">
              {info.about_me || '�'}{' '}
            </p>
            <br />
            <span tabIndex="0">Character Sheet:</span>
            <p tabIndex="0" className="about-me">
              {info.character_sheets ? (
                <>
                  <b>{info.character_sheets.split(' ')[0]}</b> <br />
                  <br />
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${info.character_sheets.split(' ')[1]}`}
                  >
                    {info.character_sheets.split(' ')[1]}
                  </a>
                </>
              ) : (
                '�'
              )}{' '}
            </p>
          </div>
        </div>
      );
    });
    const editingInfo = this.props.info.map((info, idx) => {
      return (
        <div className="user-info-container" key={idx}>
          <form
            action="#"
            id="edit-profile"
            onSubmit={this.props.handleSubmitEditProfile}
            aria-invalid="true"
            aria-describedby="error-msg"
          >
            <label htmlFor="user_name">Nickname: </label>
            <input
              name="user_name"
              maxLength="30"
              id="user_name"
              defaultValue={info.user_name}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              id="name"
              maxLength="30"
              defaultValue={info.name}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="dnd_experience">D&amp;D Experience: </label>
            <input
              name="dnd_experience"
              id="dnd_experience"
              defaultValue={info.dnd_experience}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="languages">Fluent Languages: </label>
            <input
              name="languages"
              id="languages"
              defaultValue={info.languages}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="location">Location: </label>
            <input
              name="location"
              id="location"
              defaultValue={info.location}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="preferred_editions">
              Preferred D&amp;D Editions:{' '}
            </label>
            <input
              name="preferred_editions"
              id="preferred_editions"
              defaultValue={info.preferred_editions}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="preferred_classes">Preferred Classes: </label>
            <input
              name="preferred_classes"
              id="preferred_classes"
              defaultValue={info.preferred_classes}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="contact">Additional Contact: </label>
            <input
              name="contact"
              id="contact"
              defaultValue={info.contact}
              aria-invalid="true"
              aria-describedby="error-msg"
            ></input>{' '}
            <br />
            <label htmlFor="about_me">About Me: </label>
            <textarea
              name="about_me"
              id="about_me"
              defaultValue={info.about_me}
              aria-invalid="true"
              aria-describedby="error-msg"
              maxLength={400}
            ></textarea>{' '}
            <br />
            <label>Character Sheet</label>
            (Please include a URL link to a PDF file)
            <br />
            <label htmlFor="char_name">Name: </label>
            <input
              name="char_name"
              id="char_name"
              aria-invalid="true"
              maxLength={50}
              aria-describedby="error-msg"
            ></input>{' '}
            <label htmlFor="char_url">PDF URL: </label>
            <input
              name="char_url"
              id="char_url"
              aria-invalid="true"
              aria-describedby="error-msg"
              type="url"
            ></input>{' '}
          </form>
        </div>
      );
    });
    return <>{editing ? editingInfo : userInfo}</>;
  }
}
