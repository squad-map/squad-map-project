import { rest } from 'msw';

const GET_MAPS = rest.get('/', (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json([
      {
        id: 1,
        name: '노트북하기 좋은 곳',
        emoji: '💻',
        user: 'muffin',
        placeCount: 31,
      },
      {
        id: 2,
        name: '오후시간대 사람 없는 점심 장소',
        emoji: '🍖',
        user: 'muffin',
        placeCount: 51,
      },
      {
        id: 3,
        name: '커피 맛집',
        emoji: '☕️',
        user: 'muffin',
        placeCount: 21,
      },
      {
        id: 4,
        name: '시원한 카페',
        emoji: '🆒',
        user: 'muffin',
        placeCount: 11,
      },
      {
        id: 5,
        name: '조용하고 집중 잘되는 카페',
        emoji: '🤫',
        user: 'muffin',
        placeCount: 15,
      },
    ])
  )
);

export const handlers = [GET_MAPS];