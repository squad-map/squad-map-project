import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';

import * as Buttons from './Button.stories';

const { Default } = composeStories(Buttons);

describe('<Button />', () => {
  test('renders Login button with default args', () => {
    render(<Default size="xLarge" />);
    const buttonElement = screen.getByText('로그인'); // getByText는 쿼리함수, 이 함수를 사용하면 텍스트를 사용해서 원하는 DOM 을 선택 가능
    expect(buttonElement).not.toBeNull();
  });

  test('disabled Button', () => {
    const onClickSpy = jest.fn();

    render(<Default disabled />);
    screen.getByRole('button').click();
    expect(onClickSpy).not.toHaveBeenCalled();
  });

  test('loading Button', () => {
    const onClickSpy = jest.fn();

    render(<Default loading />);
    screen.getByRole('button').click();
    expect(onClickSpy).not.toHaveBeenCalled();
  });

  test('onclick Button test', () => {
    const onClickSpy = jest.fn();
    render(<Default onClick={onClickSpy} />);
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(onClickSpy).toHaveBeenCalled();
  });
});
