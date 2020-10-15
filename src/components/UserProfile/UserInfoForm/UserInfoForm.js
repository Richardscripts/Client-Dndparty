import React from 'react';

export default class UserInfoForm extends React.Component {
  render() {
    const editing = this.props.editing;
    const userInfo = this.props.info.map((info, idx) => {
      return (
        <div className="user-info-container" key={idx}>
          <div className="left-content">
            <span>Nickname:</span> {info.user_name} <br />
            <span>Email:</span> {this.props.user_email} <br />
            <span>First Name:</span> {info.first_name} <br />
            <span>Last Name:</span> {info.last_name} <br />
            <span>D&D Experience:</span> {info.dnd_experience} <br />
            <span>Fluent Languages:</span> {info.languages} <br />
            <span>Location:</span> {info.location} <br />
            <span>Preferred Editions:</span> {info.preferred_editions} <br />
            <span>Preferred Classes:</span> {info.preferred_classes} <br />
            <span>Additional Contact:</span> {info.contact} <br />
          </div>
          <div className="right-content">
            <span>About Me:</span>
            <p className="about-me">{info.about_me} </p>
            <br />
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
          >
            <label htmlFor="user_name">Nickname: </label>
            <input
              name="user_name"
              maxLength="30"
              id="user_name"
              defaultValue={info.user_name}
            ></input>{' '}
            <br />
            <label htmlFor="first_name">First Name: </label>
            <input
              name="first_name"
              id="first_name"
              maxLength="30"
              defaultValue={info.first_name}
            ></input>{' '}
            <br />
            <label htmlFor="last_name">Last Name: </label>
            <input
              name="last_name"
              maxLength="30"
              id="last_name"
              defaultValue={info.last_name}
            ></input>{' '}
            <br />
            <label htmlFor="dnd_experience">D&D Experience: </label>
            <input
              name="dnd_experience"
              id="dnd_experience"
              defaultValue={info.dnd_experience}
            ></input>{' '}
            <br />
            <label htmlFor="languages">Fluent Languages: </label>
            <input
              name="languages"
              id="languages"
              defaultValue={info.languages}
            ></input>{' '}
            <br />
            <label htmlFor="location">Location: </label>
            <input
              name="location"
              id="location"
              defaultValue={info.location}
            ></input>{' '}
            <br />
            <label htmlFor="preferred_editions">Preferred D&D Editions: </label>
            <input
              name="preferred_editions"
              id="preferred_editions"
              defaultValue={info.preferred_editions}
            ></input>{' '}
            <br />
            <label htmlFor="preferred_classes">Preferred Classes: </label>
            <input
              name="preferred_classes"
              id="preferred_classes"
              defaultValue={info.preferred_classes}
            ></input>{' '}
            <br />
            <label htmlFor="contact">Additional Contact: </label>
            <input
              name="contact"
              id="contact"
              defaultValue={info.contact}
            ></input>{' '}
            <br />
            <label htmlFor="about_me">About Me: </label>
            <textarea
              name="about_me"
              id="about_me"
              defaultValue={info.about_me}
            ></textarea>{' '}
          </form>
        </div>
      );
    });
    return <>{editing ? editingInfo : userInfo}</>;
  }
}
