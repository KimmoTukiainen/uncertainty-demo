import { RenderResult, render } from '@testing-library/react';
import React from 'react';

import FiniteProducList from './FiniteProductList';
import useFiniteProducts from './useFiniteProducts';

jest.mock('./useFiniteProducts');

describe('ProductList', () => {
  let result: RenderResult;
  let useProductsMock = useFiniteProducts as jest.Mock;

  it('shows a loader', () => {
    useProductsMock.mockImplementationOnce(() => ({
      name: 'loading',
    }));
    result = render(<FiniteProducList />);

    expect(result.getByTestId('loading')).toMatchSnapshot();
  });

  it('shows an error', () => {
    useProductsMock.mockImplementationOnce(() => ({
      name: 'failure',
      error: new Error('some error'),
    }));
    result = render(<FiniteProducList />);

    expect(result.getByTestId('error')).toMatchSnapshot();
  });

  it('shows a list of products', () => {
    useProductsMock.mockImplementationOnce(() => ({
      name: 'success',
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
    result = render(<FiniteProducList />);

    expect(result.getByTestId('success')).toMatchSnapshot();
  });
});
