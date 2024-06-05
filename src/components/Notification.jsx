import React from 'react'
import PropTypes from 'prop-types'

export default function Notification({ message }) {
  return (
    <>
      <span id="notification">{message}</span>
    </>
  )
}
Notification.propTypes = {
  message: PropTypes.string.isRequired,
}
