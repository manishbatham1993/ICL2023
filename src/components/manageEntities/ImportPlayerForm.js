import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import classes from './form.module.css'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton, Tooltip } from '@mui/material'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const ImportPlayersForm = (props) => {
  // initialize references
  const locationRef = useRef()
  const csvRef = useRef()
  const zipRef = useRef()
  const [errors, setErrors] = useState([])
  const [progress, setProgress] = useState(null)
  const [uploadController, setUploadController] = useState(null)

  const cancelUploadHandler = () => {
    if (uploadController) uploadController.abort()
    setProgress(null)
  }

  useEffect(() => {
    cancelUploadHandler()
  }, [])

  const formSubmitHandler = (e) => {
    e.preventDefault()
    setErrors([])

    const importFormData = new FormData()
    importFormData.append('location', locationRef.current.value)
    importFormData.append('csv', csvRef.current.files[0])
    importFormData.append('zip', zipRef.current.files[0])

    const controller = new AbortController()
    setUploadController(controller)

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onUploadProgress: (event) => {
        const percentCompleted = Math.round((event.loaded * 100) / event.total)
        setProgress(percentCompleted)
      },
      signal: controller.signal,
    }

    // POST request to add team
    const api = BASE_URL + '/api/v1/admin/player/import'
    axios
      .post(api, importFormData, config)
      .then((res) => {
        // close overlay and refresh the teams
        props.onCloseOverlay()
        props.onRefresh()
        setProgress(null)
      })
      .catch((err) => {
        if (err.response?.data?.errors?.length > 0) {
          setErrors(err.response.data.errors)
        }
        props.onRefresh()
        setProgress(null)
      })
  }

  return (
    <div className={classes['view-panel']}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.input}>
          <label htmlFor="location">Location (players will be replaced)</label>
          <select id="location" ref={locationRef}>
            {props.locations.map((location, i) => (
              <option key={i} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.input}>
          <label htmlFor="csv">Csv *</label>
          <input id="csv" type="file" accept=".csv" ref={csvRef} required />
        </div>
        <div className={classes.input}>
          <label htmlFor="zip">images zip</label>
          <input id="zip" type="file" accept=".zip" ref={zipRef} />
        </div>
        <button type="submit">Import</button>
      </form>
      {progress && (
        <div className={classes['upload_stats']}>
          <div className={classes['progress_bar']}>
            <div>Uploading...</div>
            <progress
              className={classes['progress']}
              value={progress}
              max="100"
            />
          </div>
          <Tooltip title="Cancel">
            <IconButton onClick={cancelUploadHandler}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
      {errors?.length > 0 && (
        <div className={classes['error__container']}>
          <div className={classes.heading}>Errors</div>
          {errors.map((error, i) => (
            <div key={i} className={classes.error}>
              <div className={classes.msg}>{error.msg}</div>
              <div className={classes.data}>{JSON.stringify(error.row)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImportPlayersForm
