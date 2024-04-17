import React, { useEffect, useState, useRef } from 'react'
import images from '../../Assets/groups-image/images'
import UserInfoForm from './UserInfoForm/UserInfoForm'
import Validators from '../../Helpers/Validators'
import profileApiHelper from '../../Helpers/ApiHelpers/ProfileHelper'
import partiesApiHelper from '../../Helpers/ApiHelpers/PartiesHelper'
import { scrollTo } from '../../Helpers/ApiHelpers/Utility'
import './UserProfile.css'
import PartiesJoined from './PartiesJoined'
import PartiesCreated from './PartiesCreated'

const UserProfile = props => {
  const {
    params: { user_id },
  } = props.match
  const [errorMessage, setErrorMessage] = useState('')
  const [state, setState] = useState({
    user_info: { user_name: '' },
    created_parties: [{ requesters: [] }],
    joined_parties: [],
    editing: false,
  })
  const refScrollElement = useRef(null)

  const profileApiCalls = async () => {
    getUserProfile()
    getUserCreatedParties()
    getUserJoinedParty()
  }

  useEffect(() => {
    profileApiCalls()
  }, [])

  useEffect(() => {
    if (props.profile_update) {
      profileApiCalls()
      props.handleProfileUpdate()
    }
  }, [props.profile_updated])

  const handleEditProfile = () => {
    setState(prevState => ({
      ...prevState,
      editing: !state.editing,
    }))
    setErrorMessage('')

    scrollTo(refScrollElement)
  }

  const handleSubmitEditProfile = async event => {
    event.preventDefault()
    const user_id = state.user_info.user_id
    const {
      user_name,
      name,
      dnd_experience,
      location,
      languages,
      about_me,
      contact,
      preferred_editions,
      preferred_classes,
      char_url,
      char_name,
    } = event.target

    const pdfCheck = char_url.value
      .slice(char_url.value.length - 4, char_url.value.length)
      .toLowerCase()

    if (pdfCheck && pdfCheck !== '.pdf') {
      setErrorMessage('Character Sheet URL must be a PDF file')
      return
    }

    const userInfo = {
      user_name: user_name.value,
      name: name.value,
      dnd_experience: dnd_experience.value,
      location: location.value,
      languages: languages.value,
      about_me: about_me.value,
      contact: contact.value,
      preferred_editions: preferred_editions.value,
      preferred_classes: preferred_classes.value,
      character_sheets: char_url.value
        ? `${char_name.value}: ${char_url.value}`
        : 'example.pdf',
    }

    setErrorMessage('')

    props.handleStartLoading()
    const response = await profileApiHelper.editUserProfile(userInfo, user_id)

    if (response.error) {
      setErrorMessage(response.error)
    } else {
      setState(prevState => ({ ...prevState, editing: !state.editing }))
      profileApiCalls()
    }

    props.handleEndLoading()

    scrollTo(refScrollElement)
  }

  const getUserProfile = async () => {
    props.handleStartLoading()

    const response = await profileApiHelper.getUserProfile(user_id)

    if (response.error) {
      props.history.push('/')
      setErrorMessage(response.error)
    } else {
      setState(prevState => ({ ...prevState, user_info: response }))
    }

    props.handleEndLoading()
  }

  const getUserJoinedParty = async () => {
    props.handleStartLoading()

    const response = await partiesApiHelper.getUserJoinedParty(user_id)

    if (response.errorMessage) {
      setErrorMessage(response.error)
    } else {
      setState(prevState => ({
        ...prevState,
        joined_parties: response,
      }))
    }

    props.handleEndLoading()
  }

  const getUserCreatedParties = async () => {
    props.handleStartLoading()

    const response = await profileApiHelper.getUserCreatedParties(user_id)

    if (response.errorMessage) {
      setErrorMessage(response.error)
    } else {
      getUserRequests(response)

      setState(prevState => ({
        ...prevState,
        created_parties: response,
      }))

      props.handleEndLoading()
    }
  }

  const getUserRequests = userCreatedParties => {
    userCreatedParties.forEach(async party => {
      party.requesters = []
      const userRequests = await partiesApiHelper.getUserRequests(
        party.party_id,
      )

      userRequests.forEach(userRequest => {
        party.requesters.push([
          {
            user_name: userRequest.user_name,
            user_id: userRequest.user_id,
          },
        ])
      })
    })
  }

  return (
    <div className='user-profile animate__animated animate__fadeIn'>
      <div className='top-row-profile'>
        <span tabIndex='0' className='profile-top-bar username-style-profile'>
          {state.user_info.user_name}'s Profile
        </span>
      </div>
      <div
        id='second-row-profile'
        className='second-row-profile'
        ref={refScrollElement}
      >
        <div className='profile-user-icon'>
          <span className='player-name-style'>{state.user_info.user_name}</span>
          <br />
          <img
            className='swords-img'
            src={images.swords}
            alt='Icon of crossing swords'
          />
        </div>
      </div>
      <div className='third-row-profile'>
        <div id='profile-player-info' className='profile-player-info'>
          <div className='player-info-top-bar' id='player-info-top-bar'>
            <img
              className='scroll-img'
              src={images.scroll}
              alt='A cartoon spell scroll'
            />
            <span tabIndex='0' className='player-info-style'>
              Player Information
            </span>
            <hr />
          </div>
          <br />
          {errorMessage && (
            <div className='errorMessage-msg' id='error-msg'>
              {errorMessage}
            </div>
          )}
          <br />
          <UserInfoForm
            info={state?.user_info}
            editing={state.editing}
            user_email={props.user_email}
            handleSubmitEditProfile={handleSubmitEditProfile}
          />
        </div>
        <div className='submit-edit-button-wrapper'>
          {state.editing && (
            <button
              form='edit-profile'
              type='submit'
              value='Submit'
              className='myButton'
              onSubmit={e => handleSubmitEditProfile(e)}
            >
              Submit
            </button>
          )}{' '}
          {state.editing && (
            <button
              type='button'
              className='myButton'
              onClick={handleEditProfile}
            >
              Cancel
            </button>
          )}
          {Validators.isProfileOfUser(user_id) && !state.editing && (
            <button className='myButton' onClick={handleEditProfile}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <PartiesJoined joined_parties={state.joined_parties} />
      <PartiesCreated created_parties={state.created_parties} />
      <div className='bottom-bar' />
    </div>
  )
}

export default UserProfile
