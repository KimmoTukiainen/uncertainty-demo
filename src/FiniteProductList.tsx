import React from 'react';

import useFiniteProducts, {
  FiniteApiResult,
  FiniteProduct,
} from './useFiniteProducts';

const ProductList: React.FC<{ products: FiniteProduct[] }> = ({ products }) => (
  <>
    {products.map((product) => (
      <p>
        <span>{product.name}</span>

        <span>
          {product.price.amount}
          {product.price.unit}
        </span>
      </p>
    ))}
  </>
);

const renderResult = (result: FiniteApiResult) => {
  switch (result.name) {
    case 'failure':
      return <p>{result.error.message}</p>;
    case 'loading':
      return <p>loading</p>;
    default:
      return <ProductList products={result.products} />;
  }
};

const FiniteProductList: React.FC = () => {
  const result = useFiniteProducts();

  return <div>{renderResult(result)}</div>;
};

export default FiniteProductList;
