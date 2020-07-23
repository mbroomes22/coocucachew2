// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {singleProduct, SingleProduct} from './singleProduct'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('SingleProduct', () => {
//   const shortbread = {
//     name: 'Short Bread',
//     imageUrl:
//       'https://assets.epicurious.com/photos/578e75fe0103fcdb27360ff8/2:1/w_1260%2Ch_630/shortbread-cookies.jpg',
//     description:
//       'Shortbread is a traditional Scottish biscuit usually made from one part white sugar, two parts butter, and three parts plain wheat flour.',
//     price: 15,
//   }

//   describe('<SingleProduct/> component', () => {
//     const renderedShortBread = shallow(
//       <SingleProduct singleProduct={shortbread} name={singleProduct.name} />
//     )
//   })

//   it('renders the name in h3', () => {
//     expect(renderedShortBread.find('h3').text()).to.be.equal('Short Bread')
//   })
// })
