import axios from 'axios'

//action type
const GET_COOKIES = 'GET_COOKIES'

const GET_CAKEPOPS = 'GET_CAKEPOPS'

const GET_CHOCOLATES = 'GET_CHOCOLATES'

const GET_CUPCAKES = 'GET_CUPCAKES'

//initial state
const initialProducts = {
  sweetproducts: []
}

//action creator
const getCookies = cookies => ({
  type: GET_COOKIES,
  cookies
})
const getCakepops = cakepops => ({
  type: GET_CAKEPOPS,
  cakepops
})
const getCupcakes = cupcakes => ({
  type: GET_CUPCAKES,
  cupcakes
})
const getChocolates = chocolates => ({
  type: GET_CHOCOLATES,
  chocolates
})


//thunk

export const fetchCookies = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getCookies(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchCakepops = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getCakepops(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchChocolates = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getChocolates(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchCupcakes = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getCupcakes(res.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function sweetsReducer(state = [], action) {
  switch (action.type) {
    case GET_COOKIES:
      return action.cookies

    case GET_CAKEPOPS:
      return action.cakepops

    case GET_CUPCAKES:
      return action.cupcakes

    case GET_CHOCOLATES:
      return action.chocolates

    default:
      return state
  }
}
