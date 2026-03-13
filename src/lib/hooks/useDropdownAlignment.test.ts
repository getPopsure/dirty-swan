import { renderHook, act } from '@testing-library/react-hooks';
import { RefObject } from 'react';

import { useDropdownAlignment } from './useDropdownAlignment';

const createRef = <T>(value: T | null = null): RefObject<T | null> => ({
  current: value,
});

const mockContainerRect = (rect: Partial<DOMRect>) =>
  ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
    ...rect,
  }) as DOMRect;

describe('useDropdownAlignment', () => {
  let containerEl: HTMLElement;
  let dropdownEl: HTMLElement;
  let containerRef: RefObject<HTMLElement | null>;
  let dropdownRef: RefObject<HTMLElement | null>;

  beforeEach(() => {
    jest.clearAllMocks();

    window.innerWidth = 1024;
    window.innerHeight = 768;

    containerEl = document.createElement('div');
    dropdownEl = document.createElement('div');

    containerRef = createRef(containerEl);
    dropdownRef = createRef(dropdownEl);

    Object.defineProperty(dropdownEl, 'offsetWidth', {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(dropdownEl, 'offsetHeight', {
      value: 300,
      configurable: true,
    });
  });

  it('should return alignX as left and alignY as bottom by default', () => {
    const { result } = renderHook(() =>
      useDropdownAlignment(containerRef, dropdownRef, false)
    );

    expect(result.current.alignX).toBe('left');
    expect(result.current.alignY).toBe('bottom');
  });

  it('should not compute alignment when isOpen is false', () => {
    jest
      .spyOn(containerEl, 'getBoundingClientRect')
      .mockReturnValue(mockContainerRect({ left: 900, bottom: 600, top: 600 }));

    renderHook(() => useDropdownAlignment(containerRef, dropdownRef, false));

    expect(containerEl.getBoundingClientRect).not.toHaveBeenCalled();
  });

  it('should not compute alignment when refs are null', () => {
    const nullContainerRef = createRef<HTMLElement>(null);
    const nullDropdownRef = createRef<HTMLElement>(null);

    const { result } = renderHook(() =>
      useDropdownAlignment(nullContainerRef, nullDropdownRef, true)
    );

    expect(result.current.alignX).toBe('left');
    expect(result.current.alignY).toBe('bottom');
  });

  describe('horizontal alignment', () => {
    it('should set alignX to left when there is enough space on the right', () => {
      jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue(
        mockContainerRect({ left: 100, bottom: 100, top: 100 })
      );

      const { result } = renderHook(() =>
        useDropdownAlignment(containerRef, dropdownRef, true)
      );

      // spaceOnRight = 1024 - 100 = 924, dropdownWidth = 200 → enough space
      expect(result.current.alignX).toBe('left');
    });

    it('should set alignX to right when there is not enough space on the right', () => {
      jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue(
        mockContainerRect({ left: 900, bottom: 100, top: 100 })
      );

      const { result } = renderHook(() =>
        useDropdownAlignment(containerRef, dropdownRef, true)
      );

      // spaceOnRight = 1024 - 900 = 124, dropdownWidth = 200 → not enough space
      expect(result.current.alignX).toBe('right');
    });
  });

  describe('vertical alignment', () => {
    it('should set alignY to bottom when there is enough space below', () => {
      jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue(
        mockContainerRect({ left: 100, bottom: 100, top: 100 })
      );

      const { result } = renderHook(() =>
        useDropdownAlignment(containerRef, dropdownRef, true)
      );

      // spaceBelow = 768 - 100 = 668, dropdownHeight = 300 → enough space
      expect(result.current.alignY).toBe('bottom');
    });

    it('should set alignY to top when not enough space below and more space above', () => {
      jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue(
        mockContainerRect({ left: 100, bottom: 600, top: 600 })
      );

      const { result } = renderHook(() =>
        useDropdownAlignment(containerRef, dropdownRef, true)
      );

      // spaceBelow = 768 - 600 = 168, dropdownHeight = 300 → not enough below
      // containerRect.top = 600 > spaceBelow = 168 → more space above
      expect(result.current.alignY).toBe('top');
    });

    it('should set alignY to bottom when not enough space below but more space below than above', () => {
      jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue(
        mockContainerRect({ left: 100, bottom: 500, top: 100 })
      );

      const { result } = renderHook(() =>
        useDropdownAlignment(containerRef, dropdownRef, true)
      );

      // spaceBelow = 768 - 500 = 268, dropdownHeight = 300 → not enough below
      // containerRect.top = 100 < spaceBelow = 268 → more space below
      expect(result.current.alignY).toBe('bottom');
    });
  });

  describe('ResizeObserver', () => {
    it('should observe document.documentElement when isOpen is true', () => {
      jest
        .spyOn(containerEl, 'getBoundingClientRect')
        .mockReturnValue(mockContainerRect({ left: 100, bottom: 100, top: 100 }));

      renderHook(() => useDropdownAlignment(containerRef, dropdownRef, true));

      const observerInstance = (ResizeObserver as jest.Mock).mock.results[0].value;
      expect(observerInstance.observe).toHaveBeenCalledWith(
        document.documentElement
      );
    });

    it('should disconnect observer when isOpen changes to false', () => {
      jest
        .spyOn(containerEl, 'getBoundingClientRect')
        .mockReturnValue(mockContainerRect({ left: 100, bottom: 100, top: 100 }));

      const { rerender } = renderHook(
        ({ isOpen }) => useDropdownAlignment(containerRef, dropdownRef, isOpen),
        { initialProps: { isOpen: true } }
      );

      const observerInstance = (ResizeObserver as jest.Mock).mock.results[0].value;

      rerender({ isOpen: false });

      expect(observerInstance.disconnect).toHaveBeenCalled();
    });

    it('should recalculate alignment when ResizeObserver fires', () => {
      jest
        .spyOn(containerEl, 'getBoundingClientRect')
        .mockReturnValue(mockContainerRect({ left: 100, bottom: 100, top: 100 }));

      const { result } = renderHook(() =>
        useDropdownAlignment(containerRef, dropdownRef, true)
      );

      expect(result.current.alignX).toBe('left');

      // Simulate viewport change: now not enough space on the right
      jest
        .spyOn(containerEl, 'getBoundingClientRect')
        .mockReturnValue(mockContainerRect({ left: 900, bottom: 100, top: 100 }));

      // Get the callback passed to ResizeObserver and invoke it
      const observerCallback = (ResizeObserver as jest.Mock).mock.calls[0][0];
      act(() => {
        observerCallback();
      });

      expect(result.current.alignX).toBe('right');
    });
  });
});
