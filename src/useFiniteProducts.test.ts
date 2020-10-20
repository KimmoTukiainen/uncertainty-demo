import { renderHook } from '@testing-library/react-hooks';

import productData from './products';

import useFiniteProducts from './useFiniteProducts';
import useFakeApiCall from './useFakeApiCall';

jest.mock('./useFakeApiCall');

describe('useFiniteProducts', () => {
  const useFakeApiCallMock = useFakeApiCall as jest.Mock;

  it('returns loading state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({ loading: true }));
    const rendered = renderHook(() => useFiniteProducts());

    expect(rendered.result.current).toEqual({ name: 'loading' });
  });

  it('returns an error state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({
      loading: false,
      error: new Error('some-error'),
    }));
    const { result } = renderHook(() => useFiniteProducts());

    expect(result.current.name).toEqual('failure');
    expect(result.current.error.message).toEqual('some-error');
  });

  it('api returns without items, returns an error state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({
      loading: false,
    }));
    const { result } = renderHook(() => useFiniteProducts());

    expect(result.current.name).toEqual('failure');
    expect(result.current.error.message).toEqual('No data received');
  });

  it('returns a success state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({
      loading: false,
      result: productData,
    }));
    const { result } = renderHook(() => useFiniteProducts());

    expect(result.current.name).toEqual('success');
    expect(result.current.products!.length).toEqual(4);
  });
});
