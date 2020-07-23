import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const DELETE_ORDER = 'DELETE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDERPRODUCT = 'UPDATE_ORDERPRODUCT'

//action creators
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const updatedCart = cart => ({
  type: UPDATE_CART,
  cart
})

export const updatedProduct = cart => ({
  type: UPDATE_PRODUCT,
  cart
})

export const deletedProduct = cart => ({
  type: DELETE_PRODUCT,
  cart
})

export const deletedOrder = cart => ({
  type: DELETE_ORDER,
  cart
})

export const newOrder = cart => ({
  type: CREATE_ORDER,
  cart
})

//initial state
const initialState = {}

//thunks
export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/order')
    dispatch(gotCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderinDb = (order, orderId) => async dispatch => {
  try {
    const res = await axios.put(`/api/order/${orderId}`, order)
    dispatch(updatedCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateCartDbProduct = (
  orderId,
  orderProduct
) => async dispatch => {
  try {
    // console.log('INSIDE THE UPDATE PRODUCT WORKS', orderId, orderProduct)
    const res = await axios.put(`/api/orderProduct/${orderId}`, orderProduct)
    dispatch(updatedProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteProductFromDbCart = (
  productId,
  orderId
) => async dispatch => {
  try {
    const res = await axios.delete(`/api/orderProduct/${orderId}`, {
      data: {productId: productId}
    })
    console.log('RES DATA', res.data)
    dispatch(deletedProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrderFromDb = orderId => async dispatch => {
  try {
    const res = await axios.delete(`/api/order/${orderId}`)
    dispatch(deletedOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const createDbOrder = order => async dispatch => {
  try {
    const res = await axios.post(`/api/order/`, order)
    dispatch(newOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateDbOrderProduct = (
  orderId,
  orderProduct
) => async dispatch => {
  console.log('START RUNING THUNK', orderId)
  try {
    const res = await axios.put(`/api/order/${orderId}`, orderProduct)
    dispatch(updatedDbOrderProduct(res.data))
  } catch (error) {
    next(error)
  }
}

export default function cartStoreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    case UPDATE_ORDERPRODUCT:
      return action.cart

    case UPDATE_CART:
      return action.cart

    case UPDATE_PRODUCT:
      return action.cart

    case DELETE_PRODUCT:
      return action.cart

    case DELETE_ORDER:
      return action.cart

    case CREATE_ORDER:
      return action.cart

    default:
      return state
  }
}
