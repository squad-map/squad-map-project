import userEvent from '@testing-library/user-event';

import SearchMap from '.';

import { screen, render } from '@/tests/testing-libaray-utils';

test('get location information when entering recent search terms', async () => {
  const user = userEvent.setup();
  render(<SearchMap />);

  const SearchInput = await screen.findByRole('textbox');

  await user.clear(SearchInput);
  await user.type(SearchInput, '강남');

  // 검색
  const searchButton = await screen.findByRole('button', { name: '검색' });
  await user.click(searchButton);

  // 카카오맵은 테스트를 어떻게? => 카카오맵에서 받아온 장소 카드 다 가져오기
  //   const cardComponents = await screen.findAllByRole('presentation');
});

test('recentSearch all delete button clicked', async () => {
  const user = userEvent.setup();
  render(<SearchMap />);

  const SearchInput = await screen.findByRole('textbox');

  // "강남" 검색어 등록
  await user.click(SearchInput);
  await user.type(SearchInput, '강남');

  const searchButton = await screen.findByRole('button', { name: '검색' });
  await user.click(searchButton);

  await user.click(SearchInput);

  const searchItem = await screen.findByRole('button', { name: '강남' });
  expect(searchItem).toBeInTheDocument();

  // 전체선택 버튼 클릭 후 다시 인풋 포커싱
  const allDeleteButton = await screen.findByRole('button', {
    name: '전체삭제',
  });
  await user.click(allDeleteButton);

  await user.click(SearchInput);

  // recoil 상태가 정상적으로 비워졌는지 체크
  expect(searchItem).not.toBeInTheDocument();
});

test('recentSearch closed btn', async () => {
  const user = userEvent.setup();
  render(<SearchMap />);

  const SearchInput = await screen.findByRole('textbox');

  await user.click(SearchInput);

  const recentText = await screen.findByText('최근검색어');
  expect(recentText).toBeInTheDocument();
  const closeButton = await screen.findByRole('button', { name: '닫기' });
  await user.click(closeButton);
  expect(recentText).not.toBeInTheDocument();
});
