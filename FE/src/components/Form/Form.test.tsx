import Form from '.';

import { screen, render } from '@/tests/testing-libaray-utils';

// Storybook 에서 바로 확인이 가능하지만, Jest를 연습하기 위해 Form 컴포넌트가 제대로 렌더링되는지 테스팅해보기
test('displays create Form', () => {
  render(<Form />);
  // 지도명, 이모지, 라디오버튼, 생성 버튼이 있는지 확인
  const mapInput = screen.getByRole('textbox', {
    name: '지도명',
  }) as HTMLInputElement;
  expect(mapInput.value).toBe('');
  const mapEmoji = screen.getByRole('textbox', {
    name: '이모지',
  }) as HTMLInputElement;
  expect(mapEmoji.value).toBe('');
  const publicRadio = screen.getByRole('radio', {
    name: 'Public',
  }) as HTMLInputElement;
  expect(publicRadio.value).toBe('true');

  const createText = screen.getByText('생성하기');
  expect(createText).toBeInTheDocument();
});

test('displays update Form', () => {
  const formState = { map_name: 'map_name', map_emoji: '🛠' };
  render(<Form mapId="1" state={formState} />);

  const mapInput = screen.getByRole('textbox', {
    name: '지도명',
  }) as HTMLInputElement;
  expect(mapInput.value).toBe('map_name');
  const mapEmoji = screen.getByRole('textbox', {
    name: '이모지',
  }) as HTMLInputElement;
  expect(mapEmoji.value).toBe('🛠');
  const publicRadio = screen.getByRole('radio', {
    name: 'Public',
  }) as HTMLInputElement;
  expect(publicRadio.value).toBe('true');

  // 지도명, 이모지, 라디오버튼, 수정, 삭제 버튼이 있는지 확인
  const updateText = screen.getByText('수정하기');
  expect(updateText).toBeInTheDocument();

  const deleteText = screen.getByText('삭제하기');
  expect(deleteText).toBeInTheDocument();
});
