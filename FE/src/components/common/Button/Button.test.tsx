import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';

import * as Buttons from './Button.stories';

const { Default } = composeStories(Buttons);

test('renders Login button with default args', () => {
  render(<Default />);
  const buttonElement = screen.getByText('Naver 계정으로 로그인');
  expect(buttonElement).not.toBeNull();
});
