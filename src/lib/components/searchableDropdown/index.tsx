import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';

import { Input } from '../input';
import { ChevronDownIcon } from '../icon';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import generateId from '../../util/generateId';

import styles from './style.module.scss';

export interface SearchableDropdownOption {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface SearchableDropdownProps {
  options: SearchableDropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  searchable?: boolean;
  placeholder?: string;
  triggerPlaceholder?: string;
  noResultsText?: string;
  groupName?: string;
  dropUp?: boolean;
  condensed?: boolean;
  bordered?: boolean;
  showChevron?: boolean;
  disabled?: boolean;
}

export const SearchableDropdown = ({
  options,
  value,
  onChange,
  searchable = false,
  placeholder = 'Search',
  triggerPlaceholder,
  noResultsText = 'No results found',
  groupName: groupNameProp,
  dropUp = false,
  condensed = false,
  bordered = false,
  showChevron = false,
  disabled = false,
}: SearchableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localValue, setLocalValue] = useState(value);
  const [alignRight, setAlignRight] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const [groupName] = useState(() => groupNameProp ?? `sd-${generateId()}`);
  const dropdownId = `${groupName}-dropdown`;

  const closeAndRestoreFocus = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useOnClickOutside(containerRef, () => isOpen && closeAndRestoreFocus());
  useEscapeKey(
    useCallback(() => {
      if (isOpen) closeAndRestoreFocus();
    }, [isOpen, closeAndRestoreFocus])
  );

  const updateAlignment = useCallback(() => {
    if (containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      const spaceOnRight = window.innerWidth - containerRect.left;
      setAlignRight(spaceOnRight < dropdownWidth);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updateAlignment();

    const observer = new ResizeObserver(updateAlignment);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [isOpen, updateAlignment]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setLocalValue(value);
    }
  }, [isOpen, value]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return [...options]
      .filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const term = searchTerm.toLowerCase();
        const aStartsWith = a.label.toLowerCase().startsWith(term);
        const bStartsWith = b.label.toLowerCase().startsWith(term);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      });
  }, [options, searchTerm]);

  const selectedOption = options.find((option) => option.id === value);

  const handleTriggerClick = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const target =
        e.key === 'ArrowDown'
          ? filteredOptions[0]
          : filteredOptions[filteredOptions.length - 1];
      if (target) {
        setLocalValue(target.id);
        optionRefs.current.get(target.id)?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredOptions[0];
      if (target) {
        onChange(target.id);
        closeAndRestoreFocus();
      }
    }
  };

  const handleOptionClick = (optionId: string) => {
    onChange(optionId);
    closeAndRestoreFocus();
  };

  const handleOptionRef = (optionId: string, el: HTMLInputElement | null) => {
    if (el) optionRefs.current.set(optionId, el);
    else optionRefs.current.delete(optionId);
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, optionId: string) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = filteredOptions.findIndex(
        (o) => o.id === optionId
      );
      const nextIndex =
        e.key === 'ArrowDown'
          ? Math.min(currentIndex + 1, filteredOptions.length - 1)
          : Math.max(currentIndex - 1, 0);
      const next = filteredOptions[nextIndex];
      if (next) {
        setLocalValue(next.id);
        optionRefs.current.get(next.id)?.focus();
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(optionId);
      closeAndRestoreFocus();
    }
  };

  return (
    <div className={classnames(styles.container, { 'd-inline-block': condensed })} ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className={classnames(
          'd-flex ai-center jc-between w100 br8 bg-white c-pointer ta-left tc-neutral-900',
          styles.selectTrigger, {
            [styles.selectTriggerOpen]: isOpen,
            [styles.condensed]: condensed,
            [styles.bordered]: bordered,
            [styles.disabled]: disabled,
          }
        )}
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? dropdownId : undefined}
      >
        <span className={'d-flex ai-center gap8'}>
          {selectedOption?.icon && (
            <span className={styles.optionIcon}>{selectedOption.icon}</span>
          )}
          {!condensed && (
            <span className="p-p">
              {selectedOption?.label ?? triggerPlaceholder}
            </span>
          )}
        </span>
        {showChevron && (
          <ChevronDownIcon
            className={classnames('ml8', { [styles.chevronOpen]: isOpen })}
            size={20}
            noMargin
            color="neutral-600"
          />
        )}
      </button>
      {isOpen && (
        <div
          id={dropdownId}
          ref={dropdownRef}
          className={classnames(
            styles.dropdown,
            'bg-white br8 p8 d-flex fd-column',
            { [styles.dropdownUp]: dropUp, [styles.dropdownRight]: alignRight }
          )}
        >
          {searchable && (
            <div className={classnames('pb8 bg-white', styles.searchContainer)}>
              <Input
                ref={searchInputRef}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                label={placeholder}
                hideLabel
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          )}
          <div className={styles.optionList} role="radiogroup" aria-label={groupName}>
            {filteredOptions.map((option) => (
              <div key={option.id} className={styles.optionWrapper}>
                <input
                  type="radio"
                  id={`${groupName}-${option.id}`}
                  name={groupName}
                  value={option.id}
                  checked={option.id === localValue}
                  onChange={() => setLocalValue(option.id)}
                  onClick={() => handleOptionClick(option.id)}
                  tabIndex={option.id === localValue ? 0 : -1}
                  className={styles.optionRadio}
                  ref={(el) => handleOptionRef(option.id, el)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.id)}
                />
                <label
                  htmlFor={`${groupName}-${option.id}`}
                  className={classnames(
                    'd-flex ai-center gap8 w100 br8 c-pointer ta-left tc-neutral-900',
                    styles.option, {
                    [styles.optionSelected]: option.id === localValue,
                  })}
                >
                  {option.icon && (
                    <span className={styles.optionIcon}>{option.icon}</span>
                  )}
                  <span className="p-p">{option.label}</span>
                </label>
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <p className={`p-p tc-neutral-500 ${styles.noResults}`}>
                {noResultsText}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
