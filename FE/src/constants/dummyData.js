export const homeMapsData = [
  {
    id: 1,
    host_id: 1,
    host_nickname: 'muffin',
    host_profile_image: '',
    map_name: '노트북하기 좋은 곳',
    map_emoji: '💻',
    user: 'muffin',
    places_count: 31,
  },
  {
    id: 2,
    host_id: 1,
    host_nickname: 'muffin',
    host_profile_image: '',
    map_name: '오후시간대 사람 없는 점심 장소',
    map_emoji: '🍖',
    user: 'muffin',
    places_count: 51,
  },
  {
    id: 3,
    host_id: 1,
    host_nickname: 'muffin',
    host_profile_image: '',
    map_name: '커피 맛집',
    map_emoji: '☕️',
    user: 'muffin',
    places_count: 21,
  },
  {
    id: 4,
    host_id: 1,
    host_nickname: 'muffin',
    host_profile_image: '',
    map_name: '시원한 카페',
    map_emoji: '🆒',
    user: 'muffin',
    places_count: 11,
  },
  {
    id: 5,
    host_id: 1,
    host_nickname: 'muffin',
    host_profile_image: '',
    map_name: '조용하고 집중 잘되는 카페',
    map_emoji: '🤫',
    user: 'muffin',
    places_count: 15,
  },
];

export const searchMapsData = [
  {
    id: 1,
    title: '버거 맛집',
    emoji: '🍔',
    shareCount: 4,
    owner: 'muffin',
  },
  {
    id: 2,
    title: '바베큐 맛집',
    emoji: '🥓',
    shareCount: 5,
    owner: 'funny',
  },
  {
    id: 3,
    title: '고기 맛집',
    emoji: '🥩',
    shareCount: 5,
    owner: 'Ronnie',
  },
];

export const myPageMapsData = [
  {
    id: 1,
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 2,
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 3,
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 4,
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 5,
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
  {
    id: 6,
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
      { name: '카테고리3', color: 'orange' },
    ],
    emoji: '💻',
    title: '노트북하기 좋은 곳',
    placeCount: 3,
  },
];

// myMapsData 필요한 데이터는 ? id, title, emoji, categories, maps(배열안의 객체 형식으로)
// maps => {id, title, categories, address, description }

export const myMapsData = {
  id: 1,
  title: '놀이동산',
  emoji: '🏞',
  categories: [
    { name: '카테고리1', color: '#FF0000' },
    { name: '카테고리2', color: '#0000FF' },
  ],
  maps: [
    {
      address_name: '서울 강남구 신사동 668-33',
      category_color: 'red',
      category_group_code: 'AT4',
      category_group_name: '관광명소',
      category_name: '여행 > 관광,명소 > 테마거리',
      distance: '',
      id: '7990409',
      phone: '02-3445-6402',
      place_name: '압구정로데오거리',
      place_url: 'http://place.map.kakao.com/7990409',
      road_address_name: '',
      x: '127.039152029523',
      y: '37.5267558230172',
    },
    {
      address_name: '서울 강남구 역삼동 836-24',
      category_color: 'blue',
      category_group_code: '',
      category_group_name: '',
      category_name: '서비스,산업 > 인터넷,IT > 소프트웨어',
      distance: '',
      id: '1313843682',
      phone: '070-4117-1005',
      place_name: '코드스쿼드',
      place_url: 'http://place.map.kakao.com/1313843682',
      road_address_name: '',
      x: '127.03342973835',
      y: '37.4908543445167',
    },
  ],
};
