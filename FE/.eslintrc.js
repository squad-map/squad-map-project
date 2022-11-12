module.exports = {
  env: {
    // 어떤 환경에서 린트를 사용할지 설정
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    // Typescript에서 절대 경로 Import를 사용하기 위해서.
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier', // prettier plugin을 eslint 설정에 추가
  ], // 사용할 규칙을 설정 typescript만 사용할거기에 airbnb-typescript/base
  plugins: ['prettier'], // 서드파티 플러그인 사용을 지원 prettier 코드 스타일이 어긋나면 eslint에 걸리도록 처리
  parser: '@typescript-eslint/parser', // 내가 작성한 코드를 분석하기 위한 파싱툴
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 'off', // 넘겨받은 props를 spread 허용
    'react/jsx-filename-extension': ['warn', { extensions: ['tsx', 'jsx'] }], // jsx파일 내에서 jsx, tsx 문법 허용
    'react/react-in-jsx-scope': 'off', // 최상단에 import React'를 생략
    'react/require-default-props': 'off', // type 지정시 optional 연산자를 사용했을때 막기 위한 속성
    'react/prop-types': 'off', // props의 타입체크를 처리에 proptypes가 아닌 typescript 사용
    '@typescript-eslint/no-var-requires': 'off', // require문 사용하도록 off 속성 켜기
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'import/prefer-default-export': 'off', // export default 가 아닌 default 없이 export 할 수 있도록
    'no-nested-ternary': 'off', // 삼항연산자 2개이상 허용
    'react/no-unknown-property': ['error', { ignore: ['css'] }], // emotion css 속성 사용 허용
    'react/function-component-definition': [
      // 함수형 컴포넌트 선언방식
      2,
      {
        namedComponents: ['function-declaration', 'arrow-function'],
      },
    ],
    'import/order': [
      // import문 입력된 순서가 맞는지 검사
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      // 임포트시 확장자 적어주지 않기 위해
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
