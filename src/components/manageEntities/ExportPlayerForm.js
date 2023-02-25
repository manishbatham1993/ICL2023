import React, { useRef } from 'react'
import axios from 'axios'
import FileDownload from 'js-file-download'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const ExportPlayerForm = (props) => {
  // initialize references
  const locationRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const config = {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    // POST request to add team
    const api =
      BASE_URL +
      '/api/v1/admin/player/export?location=' +
      locationRef.current.value

    axios.get(api, config).then((res) => {
      props.onCloseOverlay()
      FileDownload(res.data, 'players.csv')
    })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.input}>
        <label htmlFor="location">Location</label>
        <select id="location" ref={locationRef}>
          {props.locations.map((location, i) => (
            <option key={i} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Export</button>
    </form>
  )
}

export default ExportPlayerForm
