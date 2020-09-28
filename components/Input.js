import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Input.module.css'

class Input extends Component {
  render() {
    const { value, handleChange, type, name } = this.props
    return (
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyPress={handleChange}
        name={name}
        autoComplete="off"
      />
    )
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
}

Input.defaultProps = {
  value: '',
  type: 'text',
  handleChange: () => {},
  name: 'input',
}

export default Input
