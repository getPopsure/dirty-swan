import { render, screen } from '../../util/testUtils';

import { SearchableDropdown, SearchableDropdownProps } from '.';

const options = [
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'es', label: 'Spain' },
  { id: 'it', label: 'Italy' },
  { id: 'pt', label: 'Portugal' },
];

const defaultProps: SearchableDropdownProps = {
  options,
  value: 'de',
  onChange: jest.fn(),
  groupName: 'country',
};

const setup = (props: Partial<SearchableDropdownProps> = {}) => {
  const onChange = jest.fn();
  const utils = render(
    <SearchableDropdown {...defaultProps} onChange={onChange} {...props} />
  );
  return { ...utils, onChange };
};

describe('SearchableDropdown', () => {
  describe('rendering', () => {
    it('should render the selected option label in the trigger', () => {
      setup();
      expect(screen.getByRole('button')).toHaveTextContent('Germany');
    });

    it('should render triggerPlaceholder when value is null', () => {
      setup({ value: null, triggerPlaceholder: 'Select a country' });
      expect(screen.getByRole('button')).toHaveTextContent('Select a country');
    });

    it('should not render the dropdown when closed', () => {
      setup();
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('should render all options when opened', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));

      options.forEach((option) => {
        expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      });
    });

    it('should render icons in options', async () => {
      const { user } = setup({
        options: [
          { id: 'de', label: 'Germany', icon: <span data-testid="icon-de">flag</span> },
        ],
      });
      await user.click(screen.getByRole('button'));

      expect(screen.getAllByTestId('icon-de')).toHaveLength(2); // trigger + option
    });

    it('should render the selected option icon in the trigger', () => {
      setup({
        options: [
          { id: 'de', label: 'Germany', icon: <span data-testid="trigger-icon">flag</span> },
        ],
        value: 'de',
      });

      expect(screen.getByTestId('trigger-icon')).toBeInTheDocument();
    });

    it('should show no results text when search has no matches', async () => {
      const { user } = setup({ searchable: true, noResultsText: 'Nothing here' });
      await user.click(screen.getByRole('button'));
      await user.type(screen.getByPlaceholderText('Search'), 'zzzzz');

      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });
  });

  describe('open / close', () => {
    it('should open the dropdown on trigger click', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('should close the dropdown on second trigger click', async () => {
      const { user } = setup();
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      await user.click(trigger);

      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('should close the dropdown on Escape', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('should close the dropdown when clicking outside', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();

      await user.click(document.body);
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('should call onChange when an option is clicked', async () => {
      const { user, onChange } = setup();
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByLabelText('France'));

      expect(onChange).toHaveBeenCalledWith('fr');
    });

    it('should close the dropdown after selecting an option', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByLabelText('France'));

      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('should mark the current value as checked', async () => {
      const { user } = setup({ value: 'fr' });
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('radio', { name: 'France' })).toBeChecked();
    });
  });

  describe('search', () => {
    it('should filter options based on search term', async () => {
      const { user } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.type(screen.getByPlaceholderText('Search'), 'ger');

      expect(screen.getByLabelText('Germany')).toBeInTheDocument();
      expect(screen.queryByLabelText('France')).not.toBeInTheDocument();
    });

    it('should prioritize options that start with the search term', async () => {
      const { user } = setup({
        searchable: true,
        options: [
          { id: 'al', label: 'Algeria' },
          { id: 'po', label: 'Portugal' },
          { id: 'pl', label: 'Poland' },
        ],
      });
      await user.click(screen.getByRole('button'));
      await user.type(screen.getByPlaceholderText('Search'), 'po');

      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('value', 'po');
      expect(radios[1]).toHaveAttribute('value', 'pl');
    });

    it('should clear the search term when dropdown closes', async () => {
      const { user } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.type(screen.getByPlaceholderText('Search'), 'ger');
      await user.keyboard('{Escape}');

      await user.click(screen.getByRole('button'));
      expect(screen.getByPlaceholderText('Search')).toHaveValue('');
      expect(screen.getAllByRole('radio')).toHaveLength(options.length);
    });

    it('should select the first filtered option on Enter in search input', async () => {
      const { user, onChange } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.type(screen.getByPlaceholderText('Search'), 'fra');
      await user.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith('fr');
    });

    it('should use custom placeholder text', async () => {
      const { user } = setup({ searchable: true, placeholder: 'Find a country' });
      await user.click(screen.getByRole('button'));

      expect(screen.getByPlaceholderText('Find a country')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('should move focus to the first option on ArrowDown from search input', async () => {
      const { user } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('radio', { name: 'Germany' })).toHaveFocus();
    });

    it('should move focus to the last option on ArrowUp from search input', async () => {
      const { user } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowUp}');

      expect(screen.getByRole('radio', { name: 'Portugal' })).toHaveFocus();
    });

    it('should navigate between options with ArrowDown and ArrowUp', async () => {
      const { user } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('radio', { name: 'Germany' })).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('radio', { name: 'France' })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('radio', { name: 'Germany' })).toHaveFocus();
    });

    it('should not go past the last option on ArrowDown', async () => {
      const { user } = setup({
        searchable: true,
        options: [
          { id: 'a', label: 'Alpha' },
          { id: 'b', label: 'Beta' },
        ],
      });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');

      expect(screen.getByRole('radio', { name: 'Beta' })).toHaveFocus();
    });

    it('should not go past the first option on ArrowUp', async () => {
      const { user } = setup({
        searchable: true,
        options: [
          { id: 'a', label: 'Alpha' },
          { id: 'b', label: 'Beta' },
        ],
      });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}{ArrowUp}{ArrowUp}');

      expect(screen.getByRole('radio', { name: 'Alpha' })).toHaveFocus();
    });

    it('should select option and close on Enter key', async () => {
      const { user, onChange } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(onChange).toHaveBeenCalledWith('fr');
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('should select option and close on Space key', async () => {
      const { user, onChange } = setup({ searchable: true });
      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}{ArrowDown} ');

      expect(onChange).toHaveBeenCalledWith('fr');
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('should not open the dropdown when disabled', async () => {
      const { user } = setup({ disabled: true });
      await user.click(screen.getByRole('button'));

      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('should have the disabled attribute on the trigger', () => {
      setup({ disabled: true });
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('should have aria-expanded false when closed', () => {
      setup();
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded true when open', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-haspopup on the trigger', () => {
      setup();
      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should have aria-controls linking to the dropdown when open', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));

      const trigger = screen.getByRole('button');
      const controlsId = trigger.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(document.getElementById(controlsId!)).toBeInTheDocument();
    });

    it('should have a radiogroup with aria-label', async () => {
      const { user } = setup({ groupName: 'test-group' });
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'test-group');
    });

    it('should return focus to the trigger after selection', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByLabelText('France'));

      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('should return focus to the trigger after pressing Escape', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));
      await user.keyboard('{Escape}');

      expect(screen.getByRole('button')).toHaveFocus();
    });
  });

  describe('groupName', () => {
    it('should auto-generate a groupName when not provided', async () => {
      const { user } = setup({ groupName: undefined });
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label');
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('name');
    });
  });
});
