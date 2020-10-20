import useFakeApiCall from './useFakeApiCall';

import productData from './products';

export type Price = {
  amount: number | null;
  unit?: string;
};

export type Product = {
  name: string;
  price?: Price;
};

export type ProductApiResult = {
  loading: boolean;
  error?: Error;
  products?: Product[];
};

export default (): ProductApiResult => {
  const { loading, error, result: products } = useFakeApiCall(productData);

  return {
    loading,
    error,
    products,
  };
};
