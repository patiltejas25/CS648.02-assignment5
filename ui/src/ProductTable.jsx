// /* globals React */
import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({
  product,
  location: { search },
  deleteProduct,
  index,
}) => {
  const selectLocation = { pathname: `/products/${product.id}`, search };
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        $
        {product.price}
      </td>
      <td>{product.category}</td>
      <td>
        <Link to={`/image/${product.id}`}>View</Link>
      </td>
      {/* <td><a href={`/#/edit/${product.id}`}>Edit</a></td> */}
      {/* <td><Link to={`/edit/${product.id}`}>Edit</Link></td> */}
      <td>
        <Link to={`/edit/${product.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
        {' | '}
        <button type="button" onClick={() => { deleteProduct(index); }}>
          Delete
        </button>
      </td>
    </tr>
  );
});


export default function productTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));
  return (
    <div>
      <p> Showing all available products </p>
      {' '}
      <hr />
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    </div>
  );
}
