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
  const bioRef = useRef()
  const imageRef = useRef()
  const genderRef = useRef()
  const ratingRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const playerFormData = new FormData()
    playerFormData.append('name', nameRef.current.value)
    playerFormData.append('employeeId', employeeIdRef.current.value)
    playerFormData.append('accountId', accountIdRef.current.value)
    playerFormData.append('email', emailRef.current.value)
    playerFormData.append('skill', skillRef.current.value)
    playerFormData.append('bio', bioRef.current.value)
    playerFormData.append('image', imageRef.current.files[0])
    playerFormData.append('gender', genderRef.current.value)
    playerFormData.append('rating', ratingRef.current.value)
    if (props.isEdit) playerFormData.append('playerId', props.data._id)

    // POST add player
    const api =
      BASE_URL +
      (props.isEdit ? '/api/v1/admin/player/edit' : '/api/v1/admin/player/add')
    axios.post(api, playerFormData).then((res) => {
      console.log('res', res.data)
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
              value={account._id}
              selected={
                props.isEdit &&
                props.data.accountId &&
                account._id === props.data.accountId
              }
            >
              {account.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={props.isEdit && props.data.name ? props.data.name : ''}
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="string"
          ref={emailRef}
          defaultValue={
            props.isEdit && props.data.email ? props.data.email : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="skill">Skill</label>
        <select id="skill" ref={skillRef}>
          {props.skills.map((skill) => (
            <option
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
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="number"
          ref={ratingRef}
          defaultValue={
            props.isEdit && props.data.rating ? props.data.rating : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="bio">Bio</label>
        <input
          id="bio"
          type="text"
          ref={bioRef}
          defaultValue={props.isEdit && props.data.bio ? props.data.bio : ''}
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" ref={imageRef} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default PlayerForm
