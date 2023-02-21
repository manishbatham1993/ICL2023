import React from 'react'
import classes from './ViewEntity.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const ViewEntity = (props) => {
  return (
    <div className={classes['view-panel']}>
      <ul>
        {Object.entries(props.data).map(([key, value]) => {
          return (
            <li key={key}>
              <div className={classes.key}>{key}</div>
              <div className={classes.value}>{JSON.stringify(value)}</div>
            </li>
          )
        })}
      </ul>
      {props.data.imageUrl && (
        <div className={classes['image-panel']}>
          <img src={`${BASE_URL}/${props.data.imageUrl}`} />
        </div>
      )}
    </div>
  )
}

export default ViewEntity
