import React from 'react';

import TokenService from '../../Helpers/TokenService';
import authApi from '../../Helpers/ApiHelpers/AuthHelpers';

import './Register.css';

class Register extends React.Component {
  state = {
    error: null,
    policyChecked: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_email, password, user_name, privacy_policy } = e.target;
    this.setState({
      error: null,
    });

    authApi
      .registerUser(
        user_email.value,
        password.value,
        user_name.value,
        this.state.policyChecked,
      )
      .then((res) => {
        user_email.value = '';
        password.value = '';
        user_name.value = '';
        privacy_policy.checked = false;
        this.setState({ policyChecked: false });
        TokenService.clearAuthToken();
        TokenService.saveAuthToken(res.authToken);
        this.props.updateLoginToken();
        const user = TokenService.getUserInfoFromAuthToken();
        this.props.handleUserInfo(user);
        this.props.history.push(`/Player_Profile/${user.user_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    return (
      <div className="register-view">
        <div className="welcome-message-style">
          <h3>Welcome to DnD Party!</h3>
        </div>
        <p>Connect with fellow Dnders to Play with!</p>
        <div className="register-form">
          <form onSubmit={(e) => this.handleSubmit(e)} action="#">
            <div className="register-style"> Register</div>
            <br />
            <label htmlFor="user_email">Email:</label>
            <br />
            <input
              id="user_email"
              type="email"
              name="user_email"
              aria-required="true"
              required
            ></input>
            <br />
            <label htmlFor="user_name">Nickname or Character Name:</label>
            <input
              id="user_name"
              maxLength="30"
              type="text"
              name="user_name"
              aria-required="true"
              required
            ></input>
            <br />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              maxLength="72"
              type="password"
              name="password"
              aria-required="true"
              aria-invalid="true"
              aria-describedby="register-error"
              required
            ></input>
            <br />
            <div className="tip-style">Password Must be min. 8 characters.</div>
            <br />
            <label htmlFor="privacy_policy">I agree to Privacy Policy:</label>
            <input
              required
              type="checkbox"
              name="privacy_policy"
              id="privacy_policy"
              onChange={() =>
                this.setState({ policyChecked: !this.state.policyChecked })
              }
              aria-invalid="true"
              aria-describedby="error-msg"
            />
            <br />
            <br />
            <div className="register-button-wrapper">
              <button
                className="PartyTableButton register-submit"
                type="submit"
              >
                Submit
              </button>
              <br />
              <br />
              <span>
                Test Account: user1@email.com <br />
                Password: password
              </span>
            </div>
            <br />
            {this.state.error && (
              <div className="register-error" id="register-error">
                {this.state.error}
              </div>
            )}
          </form>
        </div>
        <div className="privacy-policy">
          <h2>Privacy Policy for DndParty</h2>

          <p>
            At Dndparty, accessible from https://dndparty.vercel.app/, one of
            our main priorities is the privacy of our visitors. This Privacy
            Policy document contains types of information that is collected and
            recorded by Dndparty and how we use it.
          </p>

          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us. Our Privacy
            Policy was created with the help of the{' '}
            <a href="https://www.generateprivacypolicy.com">
              Privacy Policy Generator
            </a>
            .
          </p>

          <h3>Log Files</h3>

          <p>
            Dndparty follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services' analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users' movement on the website, and gathering
            demographic information.
          </p>

          <h3>Cookies and Web Beacons</h3>

          <p>
            Like any other website, Dndparty uses 'cookies'. These cookies are
            used to store information including visitors' preferences, and the
            pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
          </p>

          <p>
            For more general information on cookies, please read{' '}
            <a href="https://www.cookieconsent.com/what-are-cookies/">
              "What Are Cookies" from Cookie Consent
            </a>
            .
          </p>

          <h3>Google DoubleClick DART Cookie</h3>

          <p>
            Google is one of a third-party vendor on our site. It also uses
            cookies, known as DART cookies, to serve ads to our site visitors
            based upon their visit to www.website.com and other sites on the
            internet. However, visitors may choose to decline the use of DART
            cookies by visiting the Google ad and content network Privacy Policy
            at the following URL –{' '}
            <a href="https://policies.google.com/technologies/ads">
              https://policies.google.com/technologies/ads
            </a>
          </p>

          <h3>Our Advertising Partners</h3>

          <p>
            Some of advertisers on our site may use cookies and web beacons. Our
            advertising partners are listed below. Each of our advertising
            partners has their own Privacy Policy for their policies on user
            data. For easier access, we hyperlinked to their Privacy Policies
            below.
          </p>

          <ul>
            <li>
              <p>Google</p>
              <p>
                <a href="https://policies.google.com/technologies/ads">
                  https://policies.google.com/technologies/ads
                </a>
              </p>
            </li>
          </ul>

          <h3>Privacy Policies</h3>

          <p>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of Dndparty.
          </p>

          <p>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on Dndparty, which
            are sent directly to users' browser. They automatically receive your
            IP address when this occurs. These technologies are used to measure
            the effectiveness of their advertising campaigns and/or to
            personalize the advertising content that you see on websites that
            you visit.
          </p>

          <p>
            Note that Dndparty has no access to or control over these cookies
            that are used by third-party advertisers.
          </p>

          <h3>Third Party Privacy Policies</h3>

          <p>
            Dndparty's Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options.{' '}
          </p>

          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites. What Are Cookies?
          </p>

          <h3>Children's Information</h3>

          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>

          <p>
            Dndparty does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>

          <h3>Online Privacy Policy Only</h3>

          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Dndparty. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </p>

          <h3>Consent</h3>

          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its Terms and Conditions.
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
