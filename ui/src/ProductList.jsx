// /* globals React */
// /* eslint "react/jsx-no-undef": "off" */

import React from 'react';
import { Route } from 'react-router-dom';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import ProductDetail from './ProductDetail.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
          productList {
            id name  price category
            image 
          }
        }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async addProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
            productAdd(product: $product) {
              id
            }
          }`;


    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });

    this.loadData();
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { products } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <ProductTable
          products={products}
          deleteProduct={this.deleteProduct}
        />
        <ProductAdd addProduct={this.addProduct} />
        <hr />
        <Route path={`${match.path}/:id`} component={ProductDetail} />
      </React.Fragment>
    );
  }
}
