import React from 'react';

import useFiniteProducts, {
  FiniteApiResult,
  FiniteProduct,
} from './useFiniteProducts';

const ProductList: React.FC<{ products: FiniteProduct[] }> = ({ products }) => (
  <div data-testid="success">
    {products.map((product) => (
      <p key={product.name}>
        <span>{product.name}</span>

        <span>
          {product.price.amount}
          {product.price.unit}
        </span>
      </p>
    ))}
  </div>
);

const renderResult = (result: FiniteApiResult) => {
  switch (result.name) {
    case 'failure':
      return <p data-testid="error">{result.error.message}</p>;
    case 'loading':
      return <p data-testid="loading">loading</p>;
    default:
      return <ProductList products={result.products} />;
  }
};

const FiniteProductList: React.FC = () => {
  const result = useFiniteProducts();

  return <div>{renderResult(result)}</div>;
};

export default FiniteProductList;
