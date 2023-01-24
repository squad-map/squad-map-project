import userEvent from '@testing-library/user-event';

import CreateCategoryModalInfo from '@/components/Category/CreateCategoryModalInfo';
import { screen, render, within, waitFor } from '@/tests/testing-libaray-utils';

test('create category', async () => {
  const user = userEvent.setup();

  render(<CreateCategoryModalInfo setIsCategoryModal={jest.fn()} />);

  // 카테고리 이름
  const nameInput = (await screen.findByRole('textbox', {
    name: '카테고리명',
  })) as HTMLInputElement;

  await user.clear(nameInput);
  await user.type(nameInput, 'Category name');
  // 카테고리 색상 -> 접근성을 고려하면 findByTestId 가급저거 피하자. 여기서는 어쩔수없..
  const colorButton = await screen.findByTestId('test-id-#800000');
  expect(colorButton).toBeEnabled();
  await user.click(colorButton);

  // 현재 선택된 카테고리 텍스트
  const selectedCategoryText = screen.getByText(
    '현재 선택된 카테고리 : #800000'
  );
  expect(selectedCategoryText).toHaveTextContent('#800000');
  // 카테고리 생성 버튼
  const createCategoryButton = screen.getByRole('button', {
    name: /카테고리 생성/i,
  });

  // fetch -> POST_CATEGORY API CALL
  await user.click(createCategoryButton);

  // 카테고리가 생성되었습니다. Modal Check.
  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(
      getByText(/카테고리가 등록되었습니다/i)
    );
  });
});
