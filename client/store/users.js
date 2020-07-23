import axios from 'axios'

//Action Type
const GET_USERS = 'GET_USERS'

//Action creator

const getUsers = users => ({
  type: GET_USERS,
  users
})

//Thunk

export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (error) {
    console.log(error)
  }
}

//Reducer
export default function usersReducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return users
  }
}
