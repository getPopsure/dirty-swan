import { renderHook, act } from '@testing-library/react-hooks';
import { useScrollSync } from './useScrollSync';

describe('useScrollSync', () => {
  it('should sync scrollLeft of source and target elements', () => {
    const sourceRef = { current: document.createElement('div') };
    const targetRef = { current: document.createElement('div') };

    renderHook(() => useScrollSync(sourceRef, targetRef));

    act(() => {
      sourceRef.current.scrollLeft = 100;
      targetRef.current.scrollLeft = 0;
      sourceRef.current.dispatchEvent(new Event('scroll'));
    });

    expect(targetRef.current.scrollLeft).toBe(100);

    act(() => {
      targetRef.current.scrollLeft = 200;
      sourceRef.current.scrollLeft = 0;
      targetRef.current.dispatchEvent(new Event('scroll'));
    });

    expect(sourceRef.current.scrollLeft).toBe(200);
  });

  it('should not sync scrollLeft if enabled is false', () => {
    const sourceRef = { current: document.createElement('div') };
    const targetRef = { current: document.createElement('div') };

    renderHook(() => useScrollSync(sourceRef, targetRef, false));

    act(() => {
      sourceRef.current.scrollLeft = 100;
      targetRef.current.scrollLeft = 0;
      sourceRef.current.dispatchEvent(new Event('scroll'));
    });

    expect(targetRef.current.scrollLeft).toBe(0);

    act(() => {
      targetRef.current.scrollLeft = 200;
      sourceRef.current.scrollLeft = 0;
      targetRef.current.dispatchEvent(new Event('scroll'));
    });

    expect(sourceRef.current.scrollLeft).toBe(0);
  });

  it('should not sync scrollLeft if source or target elements are not available', () => {
    const sourceRef = { current: null };
    const targetRef = { current: document.createElement('div') };

    renderHook(() => useScrollSync(sourceRef, targetRef));

    act(() => {
      targetRef.current.scrollLeft = 200;
      targetRef.current.dispatchEvent(new Event('scroll'));
    });

    expect(sourceRef.current).toBeNull();

    const sourceRef2 = { current: document.createElement('div') };
    const targetRef2 = { current: null };

    renderHook(() => useScrollSync(sourceRef2, targetRef2));

    act(() => {
      sourceRef2.current.scrollLeft = 100;
      sourceRef2.current.dispatchEvent(new Event('scroll'));
    });

    expect(targetRef2.current).toBeNull();
  });
});
