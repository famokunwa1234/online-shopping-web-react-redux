 import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE } from "./types"

export const fetchProducts = () => (dispatch) => {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(data => {
    return dispatch({ type:FETCH_PRODUCTS, playload: data });
});
}

export const filterProducts = (products, size) => (dispatch) => {
  return dispatch({
   type:FILTER_PRODUCTS_BY_SIZE,
   playload: {
     size: size,
    items:size === ""? products: products.filter(a=> a.availableSizes.indexOf(size.toUpperCase())>=0)
   }
  })
}
// fettype:ch("http://localhost:8000/products")
//       .then(res => res.json())
//       .catch(err =>
//         fetch("db.json")
//           .then(res => res.json())
//           .then(data => data.products)
//       )
//       .then(data => {
//         this.setState({ products: data });
//         this.listProducts();
//       });
//   }