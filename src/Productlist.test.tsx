import { RenderResult, render } from '@testing-library/react';
import React from 'react';

import ProductList from './ProductList';
import useProducts from './useProducts';

jest.mock('./useProducts');

describe('ProductList', () => {
  let result: RenderResult;
  let useProductsMock = useProducts as jest.Mock;

  it('shows a loader', () => {
    useProductsMock.mockImplementationOnce(() => ({
      loading: true,
    }));
    result = render(<ProductList />);

    expect(result.getByTestId('loading')).toMatchSnapshot();
  });

  it('shows an error', () => {
    useProductsMock.mockImplementationOnce(() => ({
      loading: false,
      error: new Error('some-error'),
    }));
    result = render(<ProductList />);

    expect(result.getByTestId('error')).toMatchSnapshot();
  });

  it('shows a list of products', () => {
    useProductsMock.mockImplementationOnce(() => ({
      loading: false,
      products: [
        {
          name: 'some name',
          price: {
            amount: 10.5,
            unit: '€',
          },
        },
      ],
    }));
    result = render(<ProductList />);

    expect(result.getByTestId('success')).toMatchSnapshot();
  });
});
