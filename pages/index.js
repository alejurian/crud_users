import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { withTranslation } from 'react-i18next'
import { getUsers, deleteUser } from '../utils/api'
import Table from '../components/Table'
import Input from '../components/Input'
import Button from '../components/Button'
import styles from '../styles/ListUsers.module.css'

class ListUsers extends Component {
  constructor(props) {
    super()
    const { t } = props
    this.state = {
      users: [],
      headers: [
        {
          text: t('name'),
          value: 'name',
          link: true,
          sort: true,
        },
        {
          text: t('username'),
          value: 'username',
          link: true,
          sort: true,
        },
        {
          text: t('email'),
          value: 'email',
          link: true,
          sort: true,
        },
        {
          text: t('address'),
          value: 'address.city',
          sort: true,
        },
        {
          text: t('phone'),
          value: 'phone',
          sort: true,
        },
        {
          text: t('website'),
          value: 'website',
          sort: true,
        },
        {
          text: t('company'),
          value: 'company.name',
          sort: true,
        },
        {
          text: t('delete'),
          remove: true,
        },
      ],
      pagination: {
        sortBy: 'name',
        sortDesc: true,
        search: '',
      },
      loading: false,
    }
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = async () => {
    const { pagination } = this.state
    this.setState({ loading: true })
    const { users } = await getUsers(pagination)
    this.setState({ users, loading: false })
  }

  handleSort = (sortBy, sortDesc) => {
    const { pagination } = this.state
    this.setState(
      {
        pagination: {
          ...pagination,
          sortBy,
          sortDesc: pagination.sortBy !== sortBy ? true : sortDesc,
        },
      },
      () => {
        this.getAllUsers()
      }
    )
  }

  handleSearch = ({ charCode, target }) => {
    if (charCode === 13) {
      return this.getAllUsers()
    }
    const { pagination } = this.state
    this.setState({ pagination: { ...pagination, search: target.value } })
  }

  handleRemove = async (userId) => {
    const { t } = this.props
    const remove = confirm(t('are you sure'))
    if (remove) {
      const { user: success } = await deleteUser(userId)
      if (success) {
        alert(t('success delete'))
        this.getAllUsers()
      } else {
        alert(t('error delete'))
      }
    }
  }

  render() {
    const {
      handleSort,
      state,
      getAllUsers,
      handleSearch,
      handleRemove,
      props,
    } = this
    const { headers, users, pagination, loading } = state
    const { t } = props
    return (
      <Fragment>
        <section className={styles.sectionSearch}>
          <Input
            value={pagination.search}
            handleChange={handleSearch}
            name={'search'}
          />
          <Button handleClick={getAllUsers} text={t('search')}></Button>
        </section>
        <section className={styles.sectionCreate}>
          <Link href="/create">
            <button className={styles.buttonCreate}>{t('create')}</button>
          </Link>
        </section>
        <section className={styles.sectionTable}>
          <Table
            headers={headers}
            users={users}
            pagination={pagination}
            loading={loading}
            handleSort={handleSort}
            handleRemove={handleRemove}
          />
        </section>
      </Fragment>
    )
  }
}

export default withTranslation()(ListUsers)
