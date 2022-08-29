export const homeMapsData = [
  {
    id: 1,
    title: '노트북하기 좋은 곳',
    emoji: '💻',
    user: 'muffin',
    placeCount: 31,
  },
  {
    id: 2,
    title: '오후시간대 사람 없는 점심 장소',
    emoji: '🍖',
    user: 'muffin',
    placeCount: 51,
  },
  {
    id: 3,
    title: '커피 맛집',
    emoji: '☕️',
    user: 'muffin',
    placeCount: 21,
  },
  {
    id: 4,
    title: '시원한 카페',
    emoji: '🆒',
    user: 'muffin',
    placeCount: 11,
  },
  {
    id: 5,
    title: '조용하고 집중 잘되는 카페',
    emoji: '🤫',
    user: 'muffin',
    placeCount: 15,
  },
];

export const myPageMapsData = [
  {
    id: 1,
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 2,
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 3,
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 4,
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 5,
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 6,
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
];

// myMapsData 필요한 데이터는 ? id, title, emoji, categories, maps(배열안의 객체 형식으로)
// maps => {id, title, categories, address, description }

export const myMapsData = [
  {
    id: 1,
    title: '놀이동산',
    categories: [
      { name: '카테고리1', color: 'red' },
      { name: '카테고리2', color: 'blue' },
    ],
    maps: [
      {
        id: 1000,
        title: '롯데월드',
        categories: [
          { name: '카테고리1', color: 'red' },
          { name: '카테고리2', color: 'blue' },
        ],
        address: '서울 송파구 올림픽로 240',
        description: '안가본지 5년정도 된 듯.. 놀이기구 많이 바꼈나요?',
      },
    ],
  },
];
