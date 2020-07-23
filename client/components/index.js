/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as AddProductForm} from './AddProductForm'
export {default as AllProducts} from './AllProducts'
export {default as CartMain} from './cart/cartMain'
export {default as CartList} from './cart/cartList'
export {default as CartProducts} from './cart/cartProducts'
export {default as CartQuantity} from './cart/cartQuantity'
export {default as AllUsers} from './Admin/users'

export {default as Navbar} from './navbar'
export {default as SingleProduct} from './singleProduct'
export {default as UserHome} from './userHome'
export {default as UserForm} from './Checkout/userForm'
export {Login, Signup} from './authForm'
