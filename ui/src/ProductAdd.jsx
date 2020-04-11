
// /* globals React */
import React from 'react';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { addProduct } = this.props;
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      category: form.category.value,
      price: form.price.value.slice(1),
      name: form.name.value,
      image: form.image.value,
    };
    addProduct(product);
  }

  render() {
    return (
      <section>
        <p>Add a new product to inventory</p>
        <hr />
        <form name="productAdd" onSubmit={this.handleSubmit}>
          <div className="product-inventory">
            <label htmlFor="category">
              Category:
              <select name="category" id="category">
                <option value="Accessories">Accessories</option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
              </select>
            </label>
          </div>
          <div className="product-inventory">
            <label htmlFor="Price">
              Price:
              <input type="text" id="price" defaultValue="$" />
            </label>
          </div>
          <div className="product-inventory">
            <label htmlFor="name">
              Product Name:
              <input type="text" id="name" />
            </label>
          </div>
          <div className="product-inventory">
            <label htmlFor="image">
              Image URL:
              <input type="text" id="image" />
            </label>
          </div>

          <button type="submit">Add Product</button>
        </form>
      </section>

    );
  }
}
