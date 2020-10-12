import React from 'react';

export default class UserInfo extends React.Component {
  render() {
    const editing = this.props.editing;
    const userInfo = this.props.info.map((info, idx) => {
      return (
        <div className="user-info-container" key={idx}>
          <span>First Name: {info.first_name}</span> <br />
          <span>Last Name: {info.last_name}</span> <br />
          <span>D&D Experience: {info.dnd_experience}</span> <br />
          <span>Fluent Languages: {info.languages}</span> <br />
          <span>Location: {info.location}</span> <br />
          <span>Preferred Editions: {info.preferred_editions}</span> <br />
          <span>Preferred Classes: {info.preferred_classes}</span> <br />
          <span>About me: {info.about}</span> <br />
        </div>
      );
    });
    const editingInfo = this.props.info.map((info, idx) => {
      return (
        <div className="user-info-container" key={idx}>
          <form id="edit-profile" onSubmit={this.props.handleSubmitEditProfile}>
            <label htmlFor="first_name">First Name: </label>
            <input
              name="first_name"
              id="first_name"
              defaultValue={info.first_name}
            ></input>{' '}
            <br />
            <label htmlFor="last_name">Last Name: </label>
            <input
              name="last_name"
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
            <textarea
              name="about"
              id="about"
              defaultValue={info.about}
            ></textarea>{' '}
          </form>
        </div>
      );
    });
    return <>{editing ? editingInfo : userInfo}</>;
  }
}
