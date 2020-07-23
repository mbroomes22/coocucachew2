import axios from 'axios'

//action type
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_A_PRODUCT = 'GET_A_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//initial state
const initialProducts = {}

//action creator
const gotAProduct = product => ({
  type: GET_A_PRODUCT,
  product
})

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const addedProduct = products => ({
  type: ADD_PRODUCT,
  products
})

const deletedProduct = products => ({
  type: DELETE_PRODUCT,
  products
})

//thunk
export const getAProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(gotAProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addNewProduct = productInfo => async dispatch => {
  try {
    const res = await axios.post('/api/products', productInfo)
    dispatch(addedProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeAProduct = productId => async dispatch => {
  try {
    const res = await axios.delete(`/api/products/${productId}`)
    dispatch(deletedProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function productsReducer(state = initialProducts, action) {
  switch (action.type) {
    case GET_A_PRODUCT:
      return action.product

    case GET_PRODUCTS:
      return action.products

    case ADD_PRODUCT:
      return action.products

    case DELETE_PRODUCT:
      return action.products

    default:
      return state
  }
}
