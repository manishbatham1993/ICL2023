import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const AccountForm = (props) => {
  // initialize references
  const nameRef = useRef()
  const totalCountRef = useRef()
  const locationRef = useRef()
  const imageRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const accountFormData = new FormData()
    accountFormData.append('name', nameRef.current.value)
    accountFormData.append('totalCount', totalCountRef.current.value)
    accountFormData.append('location', locationRef.current.value)
    accountFormData.append('image', imageRef.current.files[0])
    if (props.isEdit) accountFormData.append('accountId', props.data._id)

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    const api =
      BASE_URL +
      (props.isEdit
        ? '/api/v1/admin/account/edit'
        : '/api/v1/admin/account/add')
    // POST request to backend and then close the overlay and refresh the accounts
    axios.post(api, accountFormData, config).then((res) => {
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
        <label htmlFor="location">Location *</label>
        <input
          id="location"
          type="text"
          ref={locationRef}
          defaultValue={
            props.isEdit && props.data.location ? props.data.location : ''
          }
          required
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="totalCount">TotalCount</label>
        <input
          id="totalCount"
          type="number"
          ref={totalCountRef}
          defaultValue={
            props.isEdit && props.data.totalCount ? props.data.totalCount : ''
          }
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

export default AccountForm
