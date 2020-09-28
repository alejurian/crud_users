import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import DetailsUser from '../../components/DetailsUser'
import { getUser, updateUser } from '../../utils/api'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState({
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
  })
  const [userUpdated, setUserUpdated] = useState({})
  const [firstLoad, setfirstLoad] = useState(true)
  const { t, i18n } = useTranslation()
  const [fields] = useState([
    { name: 'name', value: 'name', text: t('name') },
    { name: 'username', value: 'username', text: t('username') },
    { name: 'email', value: 'email', text: t('email') },
    { name: 'address', value: 'address.city', text: t('address') },
    { name: 'phone', value: 'phone', text: t('phone') },
    { name: 'website', value: 'website', text: t('website') },
    { name: 'company', value: 'company.name', text: t('company') },
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDataUser = async () => {
      setLoading(true)
      const { error, user } = await getUser(id)
      if (error) {
        alert(t('error get'))
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    id && fetchDataUser()
  }, [])

  useEffect(() => {
    const updateDataUser = async () => {
      const { error, user } = await updateUser(id, userUpdated)
      if (error) {
        alert(t('error update'))
      } else {
        setUser(user)
        alert(t('success update'))
      }
    }

    if (firstLoad) {
      setfirstLoad(false)
    } else {
      updateDataUser()
    }
  }, [userUpdated])

  return (
    <Fragment>
      {loading ? (
        <h1>{t('loading')}...</h1>
      ) : (
        <DetailsUser
          fields={fields}
          user={user}
          setUser={setUser}
          setUserUpdated={setUserUpdated}
        ></DetailsUser>
      )}
    </Fragment>
  )
}

export default User
