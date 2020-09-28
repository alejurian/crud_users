import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withTranslation } from 'react-i18next'
import { getValueFromObject } from '../utils'
import styles from '../styles/Table.module.css'

class Table extends Component {
  renderHeaders() {
    const { headers, pagination } = this.props
    const { sortBy, sortDesc } = pagination
    return headers.map(({ text, value }, i) => {
      return (
        <th
          onClick={() =>
            this.props.handleSort(value, sortBy === value ? !sortDesc : true)
          }
          key={i}
        >
          <div
            className={
              sortBy === value ? styles.tableSortSelected : styles.tableSort
            }
          >
            <span>{text}</span>
            <div
              className={
                sortBy === value && sortDesc
                  ? styles.tableSortDesc
                  : styles.tableSort
              }
            >
              ^
            </div>
          </div>
        </th>
      )
    })
  }

  renderRows() {
    const { users, headers, handleRemove, t } = this.props
    return users.map((user, index) => {
      const row = headers.map(({ value, link, remove }, ind) => {
        const property = getValueFromObject(user, value)
        if (link) {
          return (
            <td key={ind}>
              <Link href={`users/[id]`} as={`users/${user.id}`}>
                {property}
              </Link>
            </td>
          )
        }
        if (remove) {
          return (
            <td key={ind}>
              <button onClick={() => handleRemove(user.id)}>
                {t('delete')}
              </button>
            </td>
          )
        }
        return <td key={ind}>{property}</td>
      })
      return <tr key={index}>{row}</tr>
    })
  }

  render() {
    const { loading, t } = this.props
    return (
      <table className={styles.table}>
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className={styles.tableLoading} colSpan="8">
                {t('loading')}...
              </td>
            </tr>
          ) : (
            this.renderRows()
          )}
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  users: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    sortBy: PropTypes.string,
    sortDesc: PropTypes.bool,
  }).isRequired,
  handleSort: PropTypes.func,
  loading: PropTypes.bool,
}

Table.defaultProps = {
  headers: [],
  users: [],
  pagination: {},
  handleSort: () => {},
  loading: false,
}

export default withTranslation()(Table)
