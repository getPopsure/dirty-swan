import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

interface CustomRenderResult extends RenderResult {
 user: UserEvent;
}

export const customRender = (
  ui: JSX.Element,
  options: RenderOptions = {}
): CustomRenderResult => ({
  user: userEvent.setup(),
  ...render(ui, options),
});
