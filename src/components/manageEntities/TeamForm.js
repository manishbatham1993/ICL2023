import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const TeamForm = (props) => {
  // initialize refrences
  const nameRef = useRef()
  const imageRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const teamFormData = new FormData()
    teamFormData.append('name', nameRef.current.value)
    teamFormData.append('image', imageRef.current.files[0])
    if (props.isEdit) teamFormData.append('teamId', props.data._id)

    // POST request to add team
    const api =
      BASE_URL +
      (props.isEdit ? '/api/v1/admin/team/edit' : '/api/v1/admin/team/add')
    axios.post(api, teamFormData).then((res) => {
      console.log('res', res.data)
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
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={props.isEdit && props.data.name ? props.data.name : ''}
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

export default TeamForm
