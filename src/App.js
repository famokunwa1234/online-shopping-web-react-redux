// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Products from "./Components/Products";
// import Filter from "./Components/Filter";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       filteredProducts: []
//       // size: "",
//       // sort: "",
//       // cartItems: [],
      
//     };
//   }

//   componentWillMount() {
//     fetch("http://localhost:8000/products")
//     .then(res => res.json())
//     .then(data => this.setState({
//     products: data,
//     filteredProducts: data
//   }))
//   }

//   handleSortChange = e => {
//     this.setState({ sort: e.target.value });
//     this.listProducts();
//   };
//   handleSizeChange = e => {
//     this.setState({ size: e.target.value });
//     this.listProducts();
//   };


//   render() {
//     return (
//       <div className="container">
//         <h1> Ecommerce shoppng cart Application</h1>
//         <hr />

//         <Filter
//               count={this.state.filteredProducts.length}
//               handleSortChange={this.handleSortChange}
//               handleSizeChange={this.handleSizeChange}
//             />
//             <hr />

//       <div className="row">
//         <div className="col-md-8">
//           <Products  products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
//           </div>
//           <div>

//           </div>
//           </div>
//       </div>
//     )

//   }
// }
    
    


// export default App;


import React, { Component } from "react";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import Basket from "./Components/Basket";
import {Provider} from "react-redux";
import store from "./store";

import "./App.css";
import Copyright from "./Components/Copyright";

class App extends Component {
  constructor() {
    super();
    this.state = {
      size: "",
      sort: "",
      cartItems: [],
      products: [],
      filteredProducts: []
    };
  }
  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }

    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .catch(err =>
        fetch("db.json")
          .then(res => res.json())
          .then(data => data.products)
      )
      .then(data => {
        this.setState({ products: data });
        this.listProducts();
      });
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowestprice"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }
      return { filteredProducts: state.products };
    });
  };
  handleSortChange = e => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
    this.listProducts();
  };

  render() {
    return (
       <Provider store={store}>
      <div className="container">
        <h1>D-ULTIMATE BULTIK SHOPPING APP</h1>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <Filter
              count={this.state.filteredProducts.length}
              handleSortChange={this.handleSortChange}
              handleSizeChange={this.handleSizeChange}
            />
            <hr />
            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-3">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
            <Copyright />
          </div>
        </div>
      </div>
       </Provider>
    );
  }
}

export default App;
