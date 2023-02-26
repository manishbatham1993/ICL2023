import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const PlayerForm = (props) => {
  const nameRef = useRef()
  const employeeIdRef = useRef()
  const accountIdRef = useRef()
  const emailRef = useRef()
  const skillRef = useRef()
  const levelRef = useRef()
  const phoneNumberRef = useRef()
  const imageRef = useRef()
  const genderRef = useRef()
  const ratingRef = useRef()
  const teamIdRef = useRef()
  const auctionStatusRef = useRef()
  const isCaptainRef = useRef()

  const accountId =
    props.data && props.data.accountId && props.data.accountId._id
  const accountTeams = props.teams.filter(
    (team) => accountId && team.accountId && team.accountId._id === accountId
  )

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const playerFormData = new FormData()
    playerFormData.append('name', nameRef.current.value)
    playerFormData.append('employeeId', employeeIdRef.current.value)
    playerFormData.append('accountId', accountIdRef.current.value)
    playerFormData.append('email', emailRef.current.value)
    playerFormData.append('skill', skillRef.current.value)
    playerFormData.append('level', levelRef.current.value)
    playerFormData.append('phoneNumber', phoneNumberRef.current.value)
    playerFormData.append('image', imageRef.current.files[0])
    playerFormData.append('gender', genderRef.current.value)
    playerFormData.append('rating', ratingRef.current.value)
    playerFormData.append('isCaptain', isCaptainRef.current.value)
    if (props.isEdit) playerFormData.append('playerId', props.data._id)
    // auctionData
    if (props.isEdit) playerFormData.append('teamId', teamIdRef.current.value)
    if (props.isEdit)
      playerFormData.append('auctionStatus', auctionStatusRef.current.value)

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    // POST add player
    const api =
      BASE_URL +
      (props.isEdit ? '/api/v1/admin/player/edit' : '/api/v1/admin/player/add')
    axios.post(api, playerFormData, config).then((res) => {
      // close overlay and refresh players
      props.onCloseOverlay()
      props.onRefresh()
    })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      {props.isEdit && props.data && (
        <div className={classes.input}>
          <span>ID</span>
          <span>{props.data._id}</span>
        </div>
      )}
      <div className={classes.input}>
        <label htmlFor="accountId">Account</label>
        <select id="accountId" ref={accountIdRef}>
          {props.accounts.map((account) => (
            <option
              key={account?._id}
              value={account._id}
              selected={
                props.isEdit &&
                props.data.accountId &&
                account._id === props.data.accountId._id
              }
            >
              {account.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={props.isEdit && props.data.name ? props.data.name : ''}
          required
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="employeeId">EmployeeId</label>
        <input
          id="employeeId"
          type="number"
          ref={employeeIdRef}
          defaultValue={
            props.isEdit && props.data.employeeId ? props.data.employeeId : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          {props.gender.map((gender) => (
            <option
              key={gender}
              value={gender}
              selected={
                props.isEdit &&
                props.data.gender &&
                gender === props.data.gender
              }
            >
              {gender}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="string"
          ref={emailRef}
          defaultValue={
            props.isEdit && props.data.email ? props.data.email : ''
          }
          required
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="skill">Skill</label>
        <select id="skill" ref={skillRef}>
          {props.skills.map((skill) => (
            <option
              key={skill}
              value={skill}
              selected={
                props.isEdit && props.data.skill && skill === props.data.skill
              }
            >
              {skill}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="level">level</label>
        <select id="level" ref={levelRef}>
          {props.levels.map((level) => (
            <option
              key={level}
              value={level}
              selected={
                props.isEdit && props.data.level && level === props.data.level
              }
            >
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="rating">Rating *</label>
        <input
          id="rating"
          type="number"
          required
          ref={ratingRef}
          defaultValue={
            props.isEdit && props.data.rating ? props.data.rating : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="isCaptain">Captain</label>
        <select id="isCaptain" ref={isCaptainRef}>
          <option value="false">No</option>
          <option value="true" selected={props?.data?.isCaptain}>
            Yes
          </option>
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="text"
          ref={phoneNumberRef}
          defaultValue={
            props.isEdit && props.data.phoneNumber ? props.data.phoneNumber : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" accept="images/*" ref={imageRef} />
      </div>
      <hr />
      <div className={classes.input}>
        <label htmlFor="teamId">Team</label>
        <select id="teamId" ref={teamIdRef} disabled={!accountId}>
          <option value={''}>null</option>
          {accountTeams.map((team) => (
            <option
              key={team?._id}
              value={team._id}
              selected={
                props.isEdit &&
                props.data &&
                props.data.teamId &&
                props.data.teamId === team._id
              }
            >
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="auctionStatus">Auction Status</label>
        <select id="auctionStatus" ref={auctionStatusRef} disabled={!accountId}>
          <option value={''}>null</option>
          {props.auctionStatusList.map((status, i) => (
            <option
              key={i}
              value={status}
              selected={
                props.isEdit &&
                props.data &&
                props.data.auctionStatus &&
                status === props.data.auctionStatus
              }
            >
              {status}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default PlayerForm
