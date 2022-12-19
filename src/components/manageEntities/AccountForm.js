import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const AccountForm = (props) => {
  // initialize references
  const nameRef = useRef()
  const totalCountRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      totalCount: totalCountRef.current.value,
    }
    if (props.isEdit) payload.accountId = props.data._id

    // POST request to backend and then close the overlay and refresh the accounts
    const api =
      BASE_URL +
      (props.isEdit
        ? '/api/v1/admin/account/edit'
        : '/api/v1/admin/account/add')
    console.log('api', api)
    console.log('PAYLOAD', payload)
    axios.post(api, payload).then((res) => {
      console.log('res', res.data)
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
      <button type="submit">Save</button>
    </form>
  )
}

export default AccountForm
