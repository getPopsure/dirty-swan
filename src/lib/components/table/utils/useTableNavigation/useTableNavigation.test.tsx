import { renderHook, act } from '@testing-library/react-hooks';
import { useTableNavigation } from './useTableNavigation';
import { RefObject } from 'react';
const defaultContainerRef = {
  current: {
    scroll: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({ width: 800 })),
  },
} as unknown as RefObject<HTMLElement>;

describe('useTableNavigation', () => {
  let onSelectionChanged = jest.fn();
  let containerRef = defaultContainerRef;

  beforeEach(() => {
    containerRef = defaultContainerRef;
    onSelectionChanged = jest.fn();
  });

  it('should not navigate when enabled is false', () => {
    const { result } = renderHook(() =>
      useTableNavigation({
        enabled: false,
        containerRef,
        onSelectionChanged,
      })
    );

    act(() => {
      result.current.navigateTable(true);
    });

    expect(result.current.activeSection).toBe(1);
    expect(containerRef.current?.scroll).not.toHaveBeenCalled();
    expect(onSelectionChanged).not.toHaveBeenCalled();
  });

  it('should navigate to the next section when increase is true', () => {
    const { result } = renderHook(() =>
      useTableNavigation({
        enabled: true,
        containerRef,
        onSelectionChanged,
      })
    );

    act(() => {
      result.current.navigateTable(true);
    });

    expect(result.current.activeSection).toBe(2);
    expect(containerRef.current?.scroll).toHaveBeenCalledWith({
      top: 0,
      left: expect.any(Number),
      behavior: 'smooth',
    });
    expect(onSelectionChanged).toHaveBeenCalledWith(2);
  });

  it('should navigate to the previous section when increase is false', () => {
    const { result } = renderHook(() =>
      useTableNavigation({
        enabled: true,
        containerRef,
        onSelectionChanged,
      })
    );

    act(() => {
      result.current.navigateTable(false);
    });

    expect(result.current.activeSection).toBe(0);
    expect(containerRef.current?.scroll).toHaveBeenCalledWith({
      top: 0,
      left: expect.any(Number),
      behavior: 'smooth',
    });
    expect(onSelectionChanged).toHaveBeenCalledWith(0);
  });

  it('starts on the section passed by the parent instead of the first one', () => {
    const { result } = renderHook(() =>
      useTableNavigation({
        enabled: true,
        containerRef,
        onSelectionChanged,
        initialSection: 1,
      })
    );

    expect(result.current.activeSection).toBe(2);
    expect(containerRef.current?.scroll).toHaveBeenCalledWith({
      top: 0,
      left: 400,
      behavior: 'smooth',
    });
  });

  it('does not report a section pushed in by the parent as a user selection', () => {
    const { result } = renderHook(() =>
      useTableNavigation({
        enabled: true,
        containerRef,
        onSelectionChanged,
      })
    );
    onSelectionChanged.mockClear();

    act(() => {
      result.current.syncActiveSection(1);
    });

    expect(result.current.activeSection).toBe(2);
    expect(onSelectionChanged).not.toHaveBeenCalled();
  });

  it('keeps reporting user navigation after a parent sync', () => {
    const { result } = renderHook(() =>
      useTableNavigation({
        enabled: true,
        containerRef,
        onSelectionChanged,
      })
    );

    act(() => {
      result.current.syncActiveSection(1);
    });
    onSelectionChanged.mockClear();

    act(() => {
      result.current.navigateTable(false);
    });

    expect(result.current.activeSection).toBe(1);
    expect(onSelectionChanged).toHaveBeenCalledWith(1);
  });
});
