import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_CART = 'EMPTY_CART'
const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE'

//action creators
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addedToCart = (order, orderProduct) => ({
  type: ADD_TO_CART,
  order,
  orderProduct
})

export const updateQty = qty => ({
  type: UPDATE_QTY,
  qty
})

export const removeItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})

export const emptyCart = () => ({
  type: EMPTY_CART
})

export const getTotalPrice = totalPrice => ({
  type: GET_TOTAL_PRICE,
  totalPrice
})

//initial state
const initialState = {
  currentOrderId: null,
  items: [],
  qty: {},
  total: 0
}

//thunks
export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/order')
    dispatch(getCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addToCart = (userId, orderProduct) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/order`, {userId, orderProduct})
    if (Array.isArray(data)) {
      dispatch(addedToCart(data[0], orderProduct))
    } else {
      dispatch(addedToCart(data, orderProduct))
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    case ADD_TO_CART:
      const productId = action.orderProduct.id
      const newState = {...state}
      if (!newState.qty[productId]) {
        return {
          ...newState,
          currentOrderId: action.order.id,
          qty: {
            ...newState.qty,
            [productId]: 1
          },
          items: [...newState.items, action.item]
        }
      } else {
        let increase = newState.qty[productId] + 1
        return {
          ...newState,
          currentOrderId: action.order.id,
          qty: {
            ...newState.qty,
            [productId]: increase
          }
        }
      }

    default:
      return state
  }
}
