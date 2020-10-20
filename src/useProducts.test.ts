import { renderHook } from '@testing-library/react-hooks';
import productData from './products';
import useProducts from './useProducts';
import useFakeApiCall from './useFakeApiCall';

jest.mock('./useFakeApiCall');

describe('useProducts', () => {
  const useFakeApiCallMock = useFakeApiCall as jest.Mock;

  it('returns loading state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({ loading: true }));

    const { result } = renderHook(() => useProducts());

    expect(result.current).toEqual({ loading: true });
  });

  it('returns an error state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({
      loading: false,
      error: new Error('some-error'),
    }));
    const { result } = renderHook(() => useProducts());

    expect(result.current.error?.message).toEqual('some-error');
  });

  it('returns a success state', () => {
    useFakeApiCallMock.mockImplementationOnce(() => ({
      loading: false,
      result: productData,
    }));

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toEqual(false);
    expect(result.current.products!.length).toEqual(4);
  });
});
