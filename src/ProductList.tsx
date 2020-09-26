import React from 'react';

import useProducts, { Price, Product } from './useProducts';

const PriceTag: React.FC<{ price?: Price }> = ({ price }) =>
  price && price.amount ? (
    <span>
      {price.amount}
      {price.unit || '€'}
    </span>
  ) : null;

const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
  <p>
    {product.name} <PriceTag price={product.price} />
  </p>
);

const ProductList: React.FC = () => {
  const productsState = useProducts();

  if (productsState.loading) {
    return <p>loading</p>;
  }

  if (productsState.error) {
    return <p>{productsState.error.message}</p>;
  }

  return productsState.products ? (
    <div>
      {productsState.products.map((product: Product) => (
        <ProductItem product={product} />
      ))}
    </div>
  ) : null;
};

export default ProductList;
