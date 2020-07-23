// /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {AllProducts} from './AllProducts'
// import {fetchProducts} from '../store/products'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('AllProducts', () => {
//   let allProducts

// //   const products = [
// //     {
// //       id: 1,
// //       name: 'Chocolate Chip',
// //       type: 'cookie',
// //       imageUrl:
// //         'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
// //       price: 3.0,
// //       description:
// //         'Sweet, soft, chocolatey...uhm, how do you describe perfection?',
// //       productCategoryId: 1
// //     },
// //     {
// //       id: 1,
// //       name: 'granola chocolate',
// //       type: 'cookie',
// //       imageUrl:
// //         'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
// //       price: 0.0,
// //       description:
// //         'Sweet, soft, granola...uhm, how do you describe perfection?',
// //       productCategoryId: 1
// //     }
// //   ]

//   //   beforeEach(() => {
//   //   })

//   it('renders a delete button', () => {
//     expect(allProducts.find('button')).to.be.equal(
//       'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg'
//     )
//   })
// })

// // describe('Front-End', () => {

// //     const campuses = [
// //       { name: 'New York' },
// //       { name: 'Chicago' },
// //       { name: 'Pluto' }
// //     ];
// //     // defined in ../client/components/CampusList.js
// //     describe('<CampusList /> component', () => {
// //       it('renders an unordered list', () => {
// //         const wrapper = shallow(<CampusList campuses={products} />);
// //         expect(wrapper.find('img')).to.be.equal('https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg');
// //       })

// //       it('renders list items for the campuses passed in as props', async () => {
// //         const campusRecords = await Campus.bulkCreate(campuses)
// //         //we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
// //         const wrapper = shallow(<CampusList campuses={campusRecords} />);
// //         const listItems = wrapper.find('li');
// //         expect(listItems).to.have.length(3);
// //         expect(listItems.at(2).text()).to.contain('Pluto');
// //       });
// //     });

// // defined in ../client/redux/actions.js

// // describe('`setCampuses` action creator', () => {
// //   const setCampusesAction = setCampuses(campuses);

// //   it('returns a Plain Old JavaScript Object', () => {
// //     expect(typeof setCampusesAction).to.equal('object');
// //     expect(Object.getPrototypeOf(setCampusesAction)).to.equal(Object.prototype);
// //   });

// //   it('creates an object with `type` and `campuses`', () => {
// //     expect(setCampusesAction.type).to.equal(SET_CAMPUSES);
// //     expect(Array.isArray(setCampusesAction.campuses)).to.be.true;
// //     expect(setCampusesAction.campuses[2].name).to.equal('Pluto');
// //   });

// // /* eslint-disable no-unused-expressions */
// // import { expect } from "chai";
// // import { mount } from "enzyme";
// // import sinon from "sinon";
// // import React from "react";
// // import configureMockStore from "redux-mock-store";
// // import thunkMiddleware from "redux-thunk";
// // // import waitForExpect from "wait-for-expect";
// // // import { Provider } from "react-redux";
// // import * as rrd from "react-router-dom";

// // const { MemoryRouter } = rrd;

// // const middlewares = [thunkMiddleware];
// // const mockStore = configureMockStore(middlewares);
// // const initialState = {
// //   products: []
// // };

// // import mockAxios from "../mock-axios";
// // import {fetchProducts, removeAProduct} from '../store/products'

// // import store from "../store"

// // import { createStore } from "redux";

// // const app = require("../../server");

// // const agent = require("supertest")(app);

// // const { db } = require("../../server/db");

// // const { product } = require('../server/db/models/index.js')

// // const seed = require("../../script/seed");

// // // NOTE: Make sure you pay attention to the path below. This is where your React components should live!
// // // AllCampuses is the default export from that module, and it is connected to Redux.
// // // UnconnectedAllCampuses is a named export from that module, and it is NOT connected
// // // to Redux. We're testing BOTH of these components in here.
// // import AllProducts, {
// //   AllProducts as UnconnectedAllProducts
// // } from "./AllProducts";
// // // import AllStudents from "../../app/components/AllStudents";
// // import Routes from "../routes";

// // describe("AllProducts", () => {
// //   // We'll use this array of Products as dummy data for testing purposes
// //   const products = [
// //     {
// //         name: 'Chocolate Chip',
// //         type: 'cookie',
// //         imageUrl:
// //           'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
// //         price: 3.0,
// //         description:
// //           'Sweet, soft, chocolatey...uhm, how do you describe perfection?',
// //         productCategoryId: 1
// //     },
// //     {
// //         name: 'granola chocolate',
// //         type: 'cookie',
// //         imageUrl:
// //           'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
// //         price: 0.0,
// //         description:
// //           'Sweet, soft, granola...uhm, how do you describe perfection?',
// //         productCategoryId: 1
// //     }
// //   ];
// //   beforeEach(() => {
// //     // mockAxios ensures that when our client-side code requests data from the
// //     // server, the request is always successful (even if we haven't implemented)
// //     // our server yet.
// //     mockAxios.onGet("../../api/product").replyOnce(200, product);
// //   });
// //   describe("<AllProducts /> component", () => {
// //     const fetchProductsSpy = sinon.spy();
// //     afterEach(() => {
// //       fetchProductsSpy.resetHistory();
// //     });

// //     // This test is interested in the unconnected AllCampuses component. It is
// //     // exported as a named export in app/components/AllCampuses.js
// //     it("renders the products passed in as props", () => {
// //       const wrapper = mount(
// //         <UnconnectedAllProducts
// //           products={products}
// //           fetchProducts={fetchProductsSpy}
// //         />
// //       );
// //       expect(wrapper.text()).to.include("Chocolate Chip");
// //       expect(wrapper.text()).to.include("granola chocolate");
// //       // The test is expecting an image for each campus, with src set to the
// //       // campus's imageUrl
// //       const images = wrapper.find("imgageUrl").map(node => node.get(0).props.src);
// //       expect(images).to.include.members([
// //         "https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg",
// //         "https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg"
// //       ]);
// //     });
// // })

// // it("renders DIFFERENT campuses passed in as props", () => {
// //   const differentCampuses = [
// //     {
// //       id: 3,
// //       name: "Pluto Conservatory",
// //       imageUrl: "/images/pluto.png"
// //     },
// //     {
// //       id: 4,
// //       name: "Art Institute of Mercury",
// //       imageUrl: "/images/mercury.png"
// //     }
// //   ];
// //   const wrapper = mount(
// //     <UnconnectedAllCampuses
// //       campuses={differentCampuses}
// //       getCampuses={getCampusesSpy}
// //     />
// //   );
// //   expect(wrapper.text()).to.not.include("Mars Academy");
// //   expect(wrapper.text()).to.not.include("Jupiter Jumpstart");
// //   expect(wrapper.text()).to.include("Pluto Conservatory");
// //   expect(wrapper.text()).to.include("Art Institute of Mercury");
// //   // The test is expecting an image for each campus, with src set to the
// //   // campus's imageUrl
// //   const images = wrapper.find("img").map(node => node.get(0).props.src);
// //   expect(images).to.include.members([
// //     "/images/pluto.png",
// //     "/images/mercury.png"
// //   ]);
// // });

// // it('*** renders "No Campuses" if passed an empty array of campuses', () => {
// //   throw new Error("replace this error with your own test");
// // });

// // // In a later step, we'll create a thunk, and map that thunk to AllCampuses
// // // as getCampuses. For right now, we just need to be sure the component
// // // calls it after it mounts.
// // it("calls this.props.getCampuses after mount", async () => {
// //   mount(
// //     <UnconnectedAllCampuses
// //       campuses={campuses}
// //       getCampuses={getCampusesSpy}
// //     />
// //   );
// //   await waitForExpect(() => {
// //     expect(getCampusesSpy).to.have.been.called;
// //   });
// // });
// //   });

// //   describe("Redux", () => {
// //     let fakeStore;
// //     beforeEach(() => {
// //       fakeStore = mockStore(initialState);
// //     });

// //     // Check out app/redux/campuses.js for these two tests
// //     describe("set/fetch campuses", () => {
// //       it("setCampuses action creator returns a valid action", () => {
// //         expect(setCampuses(campuses)).to.deep.equal({
// //           type: "SET_CAMPUSES",
// //           campuses
// //         });
// //       });

// //       it("fetchCampuses thunk creator returns a thunk that GETs /api/campuses", async () => {
// //         await fakeStore.dispatch(fetchCampuses());
// //         const [getRequest] = mockAxios.history.get;
// //         expect(getRequest).to.not.equal(undefined);
// //         expect(getRequest.url).to.equal("/api/campuses");
// //         const actions = fakeStore.getActions();
// //         expect(actions[0].type).to.equal("SET_CAMPUSES");
// //         expect(actions[0].campuses).to.deep.equal(campuses);
// //       });
// //     });

// //     describe("reducer", () => {
// //       let testStore;
// //       beforeEach(() => {
// //         testStore = createStore(rootReducer);
// //       });

// //       it("*** returns the initial state by default", () => {
// //         throw new Error("replace this error with your own test");
// //       });

// //       it("reduces on SET_CAMPUSES action", () => {
// //         const action = { type: "SET_CAMPUSES", campuses };

// //         const prevState = testStore.getState();
// //         testStore.dispatch(action);
// //         const newState = testStore.getState();

// //         expect(newState.campuses).to.be.deep.equal(campuses);
// //         expect(newState.campuses).to.not.be.equal(prevState.campuses);
// //       });
// //     });
// //   });

// //   describe("Connect: react-redux", () => {
// //     // This test is expecting your component to dispatch a thunk after it mounts
// //     // Remember that getCampuses prop from an earlier test? Now's a good time
// //     // for a mapDispatch.
// //     it("initializes campuses from the server when the application loads the /campuses route", async () => {
// //       const reduxStateBeforeMount = store.getState();
// //       expect(reduxStateBeforeMount.campuses).to.deep.equal([]);
// //       mount(
// //         <Provider store={store}>
// //           <MemoryRouter initialEntries={["/campuses"]}>
// //             <AllCampuses />
// //           </MemoryRouter>
// //         </Provider>
// //       );
// //       await waitForExpect(() => {
// //         const reduxStateAfterMount = store.getState();
// //         expect(reduxStateAfterMount.campuses).to.deep.equal(campuses);
// //       });
// //     });

// //     // This test is expecting your component to render the campuses from the
// //     // Redux store.  Now's a good time for a mapState.
// //     it("<AllCampuses /> renders campuses from the Redux store", async () => {
// //       const wrapper = mount(
// //         <Provider store={store}>
// //           <MemoryRouter initialEntries={["/campuses"]}>
// //             <AllCampuses />
// //           </MemoryRouter>
// //         </Provider>
// //       );
// //       await waitForExpect(() => {
// //         wrapper.update();

// //         const { campuses: reduxCampuses } = store.getState();
// //         reduxCampuses.forEach(reduxCampus => {
// //           expect(wrapper.text()).to.include(reduxCampus.name);
// //         });
// //       });
// //     });
// //   });

// //   describe("Navigation", () => {
// //     beforeEach(() => {
// //       sinon.stub(rrd, "BrowserRouter").callsFake(({ children }) => {
// //         return <div>{children}</div>;
// //       });
// //     });
// //     afterEach(() => {
// //       rrd.BrowserRouter.restore();
// //     });

// //     // This test expects that you've set up a Route for AllCampuses.
// //     // You should take a look at app/components/Routes.js
// //     it("renders <AllCampuses /> at /campuses", () => {
// //       const wrapper = mount(
// //         <Provider store={store}>
// //           <MemoryRouter initialEntries={["/campuses"]}>
// //             <Routes />
// //           </MemoryRouter>
// //         </Provider>
// //       );
// //       expect(wrapper.find(AllCampuses)).to.have.length(1);
// //       expect(wrapper.find(AllStudents)).to.have.length(0);
// //     });

// //     it('*** navbar has links to "/campuses" and "/" (homepage)', () => {
// //       throw new Error("replace this error with your own test");
// //     });
// //   });

// //   describe("Express API", () => {
// //     // Let's test our Express routes WITHOUT actually using the database.
// //     // By replacing the findAll methods on our Sequelize models with a spy,
// //     // we can ensure that our API tests won't fail just because
// //     // our Sequelize models haven't been implemented yet.
// //     const { findAll: campusFindAll } = Campus;
// //     beforeEach(() => {
// //       Campus.findAll = sinon.spy(() => campuses);
// //     });
// //     afterEach(() => {
// //       Campus.findAll = campusFindAll;
// //     });

// //     // Consider writing your GET route in server/api/campuses.js. And don't
// //     // forget to apply the express router to your API in server/api/index.js!
// //     it("GET /api/campuses responds with all campuses", async () => {
// //       const response = await agent.get("/api/campuses").expect(200);
// //       expect(response.body).to.deep.equal([
// //         {
// //           id: 1,
// //           name: "Mars Academy",
// //           imageUrl: "/images/mars.png"
// //         },
// //         {
// //           id: 2,
// //           name: "Jupiter Jumpstart",
// //           imageUrl: "/images/jupiter.jpeg"
// //         }
// //       ]);
// //       expect(Campus.findAll.calledOnce).to.be.equal(true);
// //     });
// //   });

// //   describe("Sequelize Model", () => {
// //     before(() => db.sync({ force: true }));
// //     afterEach(() => db.sync({ force: true }));

// //     it("has fields name, address, imageUrl, description", async () => {
// //       const campus = await Campus.create({
// //         name: "Jupiter Jumpstart",
// //         address: "5.2 AU",
// //         imageUrl: "/images/jupiter.png",
// //         description:
// //           "The best JavaScript Academy for toddlers in the solar system!"
// //       });
// //       expect(campus.name).to.equal("Jupiter Jumpstart");
// //       expect(campus.address).to.equal("5.2 AU");
// //       expect(campus.imageUrl).to.equal("/images/jupiter.png");
// //       expect(campus.description).to.equal(
// //         "The best JavaScript Academy for toddlers in the solar system!"
// //       );
// //     });

// //     it("*** requires name and address", async () => {
// //       throw new Error("replace this error with your own test");
// //     });

// //     it("name and address cannot be empty", async () => {
// //       const campus = Campus.build({ name: "", address: "" });
// //       try {
// //         await campus.validate();
// //         throw Error(
// //           "validation should have failed with empty name and address"
// //         );
// //       } catch (err) {
// //         expect(err.message).to.contain("Validation notEmpty on name");
// //         expect(err.message).to.contain("Validation notEmpty on address");
// //       }
// //     });

// //     it("default imageUrl if left blank", async () => {
// //       const campus = Campus.build({
// //         name: "Jupiter Jumpstart",
// //         address: "5.2 AU"
// //       });
// //       await campus.validate();
// //       expect(campus.imageUrl).to.be.a("string");
// //       expect(campus.imageUrl.length).to.be.greaterThan(1);
// //     });
// //   });

// //   describe("Seed file", () => {
// //     beforeEach(seed);

// //     it("populates the database with at least three campuses", async () => {
// //       const seededCampuses = await Campus.findAll();
// //       expect(seededCampuses).to.have.lengthOf.at.least(3);
// //     });
// //   });
// // });
