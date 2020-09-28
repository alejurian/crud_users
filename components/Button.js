import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Button.module.css'

const Button = (props) => {
  const { text, handleClick } = props
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
}

Button.defaultProps = {
  text: [],
  handleClick: {},
}

export default Button
