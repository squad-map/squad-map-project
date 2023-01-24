import userEvent from '@testing-library/user-event';

import Form from '@/components/Form';
import { screen, render, within, waitFor } from '@/tests/testing-libaray-utils';

test('create map', async () => {
  const user = userEvent.setup();

  render(<Form />);

  const mapInput = screen.getByRole('textbox', {
    name: '지도명',
  }) as HTMLInputElement;
  await user.clear(mapInput);
  await user.type(mapInput, "Muffin's Map");

  const mapEmoji = screen.getByRole('textbox', {
    name: '이모지',
  }) as HTMLInputElement;
  await user.clear(mapEmoji);
  await user.type(mapEmoji, '🗺');

  const publicRadio = screen.getByRole('radio', {
    name: 'Public',
  }) as HTMLInputElement;
  await user.type(publicRadio, 'true');

  const createMapButton = screen.getByRole('button', { name: /생성하기/i });
  // fetch -> POST_MAP API CALL
  await user.click(createMapButton);

  // 지도가 생성되었습니다. Modal Check.
  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(getByText(/지도가 생성되었습니다/i));
  });
});

test('put map', async () => {
  const user = userEvent.setup();
  const formState = { map_name: 'map_name', map_emoji: '🛠', authority: true };
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

  const patchMapButton = screen.getByRole('button', { name: /수정하기/i });
  // fetch -> PUT_MAP API CALL
  await user.click(patchMapButton);

  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(
      getByText(/지도가 성공적으로 수정되었습니다./i)
    );
  });
});

test('delete map', async () => {
  const user = userEvent.setup();
  const formState = { map_name: 'map_name', map_emoji: '🛠', authority: true };
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

  const deleteMapButton = screen.getByRole('button', { name: /삭제하기/i });
  // fetch -> DELETE_MAP API CALL
  await user.click(deleteMapButton);

  await waitFor(async () => {
    const globalModal = document.getElementById(
      'globalModal-root'
    ) as HTMLElement;

    const { getByText } = within(globalModal);
    expect(globalModal).toContainElement(
      getByText(/지도가 성공적으로 삭제되었습니다./i)
    );
  });
});
