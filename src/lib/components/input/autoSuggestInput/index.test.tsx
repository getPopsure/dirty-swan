import { render, screen } from '../../../util/testUtils';
import { AutoSuggestInput } from '.';

describe('AutoSuggestInput', () => {
  it('exposes its input as suggest-multi-select-input', () => {
    render(
      <AutoSuggestInput
        currentOption=""
        suggestions={[]}
        handleSuggestionSelected={jest.fn()}
        onChange={jest.fn()}
        handleSuggestionFetchRequest={jest.fn()}
        handleSuggestionClearRequest={jest.fn()}
        placeholder="Search countries"
      />
    );

    expect(screen.getByTestId('suggest-multi-select-input').tagName).toBe(
      'INPUT'
    );
  });
});
