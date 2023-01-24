import RecentSearch from '.';

import { screen, render } from '@/tests/testing-libaray-utils';

test('display recentSearch', () => {
  render(
    <RecentSearch setOnRecentSearch={jest.fn()} setSerachValue={jest.fn()} />
  );
  const recentSearchText = screen.getByText('최근검색어');
  expect(recentSearchText).toBeInTheDocument();
});
