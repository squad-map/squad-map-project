import userEvent from '@testing-library/user-event';

import NickName from '.';

import { screen, render, within, waitFor } from '@/tests/testing-libaray-utils';

test('patch nickName', async () => {
  const user = userEvent.setup();

  render(<NickName handleCancelClick={jest.fn()} />);
  const nicknameHeader = screen.getByText('닉네임 변경');
  expect(nicknameHeader).toBeInTheDocument();

  const nickNameInput = screen.getByRole('textbox');
  await user.clear(nickNameInput);
  await user.type(nickNameInput, '닉네임 머핀으로 변경!');

  // fetch -> PATCH_NICKNAME API CALL
  const patchButton = screen.getByRole('button', { name: '변경하기' });
  await user.click(patchButton);

  // 닉네임 변경 성공. Modal Check.
  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(
      getByText(/닉네임이 변경되었습니다./i)
    );
  });
});
