import userEvent from '@testing-library/user-event';

import PlaceModalUpdate from '@/components/Map/PlaceModalUpdate';
import SearchModalContent from '@/components/SearchMap/SearchModalContent';
import { GET_MAP_CAEGORIES_DATA } from '@/constants/category';
import { GET_PLACE_DETAIL_DATA } from '@/constants/place';
import { screen, render, within, waitFor } from '@/tests/testing-libaray-utils';

test('create place', async () => {
  const user = userEvent.setup();
  const placeInfo = {
    address: '서울 강남구 신사동 668-33',
    detail_link: 'http://place.map.kakao.com/7990409',
    latitude: 37.5267558230172,
    longitude: 127.039152029523,
    place_id: 7990409,
    place_name: '압구정로데오거리',
  };

  render(
    <SearchModalContent
      placeInfo={placeInfo}
      mapCategory={GET_MAP_CAEGORIES_DATA.data}
    />
  );

  // 장소 이야기
  const placeStory = screen.getByRole('textbox');
  expect(placeStory).toBeInTheDocument();
  await user.clear(placeStory);
  await user.type(placeStory, '압구정 로데오 거리 이야기들....');
  // 장소 색상
  const colorButton = await screen.findByTestId('test-id-#FF0000');
  expect(colorButton).toBeInTheDocument();
  await user.click(colorButton);
  // 현재 선택된 카테고리 텍스트
  const selectedCategoryText = screen.getByText(
    '현재 선택된 카테고리 : #FF0000'
  );
  expect(selectedCategoryText).toHaveTextContent('#FF0000');
  // 장소 생성 버튼
  const createPlaceButton = screen.getByRole('button', { name: /장소 생성/i });

  // fetch -> POST_PLACE API CALL
  await user.click(createPlaceButton);

  // 장소가 생성되었습니다. Modal Check.
  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(getByText(/장소가 생성되었습니다./i));
  });
});

test('patch place', async () => {
  const user = userEvent.setup();

  render(
    <PlaceModalUpdate
      placeInfo={GET_PLACE_DETAIL_DATA.data}
      categoryInfo={GET_MAP_CAEGORIES_DATA.data}
      setIsOpenUpdateModal={jest.fn()}
    />
  );

  // 장소 이야기
  const placeStory = screen.getByRole('textbox');
  expect(placeStory).toHaveTextContent('first place');
  await user.clear(placeStory);
  await user.type(placeStory, 'modify place');

  // 장소 색상
  const colorButton = await screen.findByTestId('test-id-#FF0000');
  expect(colorButton).toBeInTheDocument();
  await user.click(colorButton);
  // 현재 선택된 카테고리 텍스트
  const selectedCategoryText = screen.getByText(
    '현재 선택된 카테고리 : #FF0000'
  );
  expect(selectedCategoryText).toHaveTextContent('#FF0000');

  // 장소 수정 버튼
  const patchPlaceButton = screen.getByRole('button', { name: /장소 수정/i });

  await user.click(patchPlaceButton);

  // 장소가 생성되었습니다. Modal Check.
  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(getByText(/장소가 수정되었습니다./i));
  });
});
