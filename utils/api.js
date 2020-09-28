const url = 'https://graphqlzero.almansi.me/api'

function setConfig(query = {}, variables = {}) {
  return {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  }
}

async function getUsers(pagination) {
  let error = null
  const query = `
		query getUsers($options: PageQueryOptions) {
			users(options: $options) {
				data {
					id
					name
          username
          email
          address {
            city
          }
          phone
          website
          company {
            name
          }
				}
			}
		}
  `
  const { sortBy, sortDesc, search } = pagination
  const variables = {
    options: {
      paginate: {
        page: 1,
        limit: 10,
      },
      sort: {
        field: sortBy,
        order: sortDesc ? 'DESC' : 'ASC',
      },
      search: {
        q: search,
      },
    },
  }
  let users
  try {
    const response = await fetch(url, setConfig(query, variables))
    users = (await response.json()).data.users.data
  } catch (err) {
    error = err
    users = []
  }
  return { error, users }
}

async function getUser(userId) {
  let error = null
  const query = `
    {
      user(id: ${userId}) {
        id
        name
        username
        email
        address {
          city
        }
        phone
        website
        company {
          name
        }
      }
    }
  `
  let user
  try {
    const response = await fetch(url, setConfig(query))
    user = (await response.json()).data.user
  } catch (err) {
    error = err
    user = []
  }
  return { error, user }
}

async function updateUser(id, user) {
  let error = null
  const query = `
    mutation updateUserData($input: UpdateUserInput!) {
      updateUser(id: ${id}, input: $input) {
        id
        name
        username
        email
        address {
          city
        }
        phone
        website
        company {
          name
        }
      }
    }
  `
  const variables = {
    input: {
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        city: user.address.city,
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
      },
    },
  }
  let userData
  try {
    const response = await fetch(url, setConfig(query, variables))
    userData = (await response.json()).data.updateUser
  } catch (err) {
    error = err
    userData = []
  }
  return { error, user: userData }
}

async function createUser(user) {
  let error = null
  const query = `
    mutation createUserData($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        name
        username
        email
        address {
          city
        }
        phone
        website
        company {
          name
        }
      }
    }
  `
  const variables = {
    input: {
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        city: user.address.city,
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
      },
    },
  }
  let userData
  try {
    const response = await fetch(url, setConfig(query, variables))
    userData = (await response.json()).data.createUser
  } catch (err) {
    console.error(err)
    error = err
    userData = []
  }
  return { error, user: userData }
}

async function deleteUser(userId) {
  let error = null
  const query = `
    mutation {
      deleteUser(id: ${userId})
    }
  `
  let userData
  try {
    const response = await fetch(url, setConfig(query))
    userData = (await response.json()).data.deleteUser
  } catch (err) {
    console.error(err)
    error = err
    userData = []
  }
  return { error, user: userData }
}

export { getUsers, getUser, updateUser, createUser, deleteUser }
