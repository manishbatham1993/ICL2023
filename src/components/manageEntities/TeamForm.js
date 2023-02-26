import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const TeamForm = (props) => {
  // initialize refrences
  const nameRef = useRef()
  const imageRef = useRef()
  const accountIdRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const teamFormData = new FormData()
    teamFormData.append('accountId', accountIdRef.current.value)
    teamFormData.append('name', nameRef.current.value)
    teamFormData.append('image', imageRef.current.files[0])
    if (props.isEdit) teamFormData.append('teamId', props.data._id)

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    // POST request to add team
    const api =
      BASE_URL +
      (props.isEdit ? '/api/v1/admin/team/edit' : '/api/v1/admin/team/add')
    axios.post(api, teamFormData, config).then((res) => {
      // close overlay and refresh the teams
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
              key={account._id}
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
        <label htmlFor="image">Image</label>
        <input id="image" type="file" accept="images/*" ref={imageRef} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default TeamForm
