import React, { Fragment, Component } from 'react'
import { withTranslation } from 'react-i18next'
import DetailsUser from '../components/DetailsUser'
import { createUser } from '../utils/api'

class CreateUser extends Component {
  constructor(props) {
    super()
    const { t } = props
    this.state = {
      user: {
        name: '',
        username: '',
        email: '',
        address: {
          city: '',
        },
        phone: '',
        website: '',
        company: {
          name: '',
        },
      },
      newUser: {},
      fields: [
        { name: 'name', value: 'name', text: t('name') },
        { name: 'username', value: 'username', text: t('username') },
        { name: 'email', value: 'email', text: t('email') },
        { name: 'address', value: 'address.city', text: t('address') },
        { name: 'phone', value: 'phone', text: t('phone') },
        { name: 'website', value: 'website', text: t('website') },
        { name: 'company', value: 'company.name', text: t('company') },
      ],
    }
  }

  createUserData = async () => {
    const { state, setError, setUser, props } = this
    const { t } = props
    const { newUser } = state
    const { error, user } = await createUser(newUser)
    if (error) {
      setError(error)
      alert(t('error create'))
    } else {
      setUser(user)
      alert(t('success create'))
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  setError = (error) => {
    this.setState({ error })
  }

  setNewUser = (newUser) => {
    this.setState({ newUser }, () => {
      this.createUserData()
    })
  }

  render() {
    const { state, setNewUser, setUser } = this
    const { fields, user } = state
    return (
      <Fragment>
        <DetailsUser
          fields={fields}
          user={user}
          setUser={setUser}
          setUserUpdated={(user) => setNewUser(user)}
        ></DetailsUser>
      </Fragment>
    )
  }
}

export default withTranslation()(CreateUser)
