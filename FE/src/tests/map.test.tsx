import userEvent from '@testing-library/user-event';

import Form from '@/components/Form';
import { screen, render, within, waitFor } from '@/tests/testing-libaray-utils';

test.only('create map', async () => {
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
  await waitFor(
    async () => {
      const globalModal = document.getElementById(
        'globalModal-root'
      ) as HTMLElement;

      const { getByText } = within(globalModal);
      expect(globalModal).toContainElement(getByText(/지도가 삭제되었습니다/i));
    },
    { timeout: 1500 }
  );
});

test('patch map', () => {});

test('delete map', () => {});
