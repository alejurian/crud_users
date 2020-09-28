import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import Input from './Input'
import { getValueFromObject, setValue } from '../utils'
import styles from '../styles/Details.module.css'

const DetailsUser = (props) => {
  const { fields, user, setUserUpdated, setUser, t } = props
  return (
    <article className={styles.container}>
      {fields.map(({ text, value, name }, i) => {
        return (
          <Fragment key={i}>
            <aside></aside>
            <section>
              <p>{text}:</p>
              {
                <Input
                  value={getValueFromObject(user, value)}
                  name={name}
                  handleChange={({ target }) =>
                    setUser(setValue(user, target.value, value))
                  }
                />
              }
            </section>
            <aside></aside>
          </Fragment>
        )
      })}
      <div></div>
      <div className={styles.containerButton}>
        <button onClick={() => setUserUpdated(user)}>{t('save')}</button>
      </div>
      <div></div>
    </article>
  )
}

DetailsUser.propTypes = {
  fields: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setUserUpdated: PropTypes.func.isRequired,
}

DetailsUser.defaultProps = {
  fields: [],
  user: {},
  setUser: () => {},
  setUserUpdated: () => {},
}

export default withTranslation()(DetailsUser)
