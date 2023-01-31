# Squad Map 프로젝트

## 1. 소개

- 지인, 친구들과 좋은 장소와 그 곳에서의 추억을 공유하기 위한 그룹 지도 서비스입니다.
- 같이 코딩하는 사람들과 모각코, 모임을 가질 때 좋은 장소를 공유하고자 해당 서비스를 기획하게 되었습니다.
- BE, FE, Android 각 파트마다 1명으로 팀을 구성해, 공통의 서비스를 자신의 분야에서 온전히 스스로 고민하고, 도전해보자는 목표로 진행중인 스터디형 프로젝트입니다.

### 서비스 : [https://squadmap.site](https://squadmap.site)

### API 문서 : [https://api.squadmap.site/docs/index.html](https://api.squadmap.site/docs/index.html)

</br>

---

</br>

## 2. 팀원

|                                            BE                                            |                                            FE                                            |                                         ANDROID                                          |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/81129309?v=4" width=400px alt="로니"/> | <img src="https://avatars.githubusercontent.com/u/45479309?v=4" width=400px alt="머핀"/> | <img src="https://avatars.githubusercontent.com/u/79190824?v=4" width=400px alt="퍼니"/> |
|                            [로니](https://github.com/cmsskkk)                            |                            [머핀](https://github.com/muffin9)                            |                            [퍼니](https://github.com/ese111)                             |

---

## 3.infrastructure

![infra](https://user-images.githubusercontent.com/81129309/212843467-9e6c9580-c102-425d-b2ba-fb9f4391b70a.png)

---

## 4. 파트별 구현 소개

<details>
<summary>
<h3>FE</h3>
</summary>

## Frontend 기술 스택

- EsLint, Prettier, yarn, Webpack
- React
- TypeScript
- Recoil
- Tailwind & Emotion
- React-Query
- Jest, Storybook
- FE 디자인 - https://www.figma.com/file/UNRj84Tux9X7nhqBIAXtjf/Squad-Map?node-id=1%3A2
- FE 초기 기획 - https://www.figma.com/file/UNRj84Tux9X7nhqBIAXtjf/Squad-Map?node-id=1%3A3

## 작업물 요약

[FE History](https://plant-amphibian-108.notion.site/9d1419a5bb98454dab21f60d53d87bdc)

## 구현 기능

1. SNS 로그인(카카오 & 네이버) 기능 ⇒ 지도를 등록하거나 보기 위해선 로그인이 필요
2. 강남역 주변을 기반으로 지도 기능 제공
3. KaKao 지도 기반으로 카테고리별 정보 노출
4. 지도를 등록할 수 있으며 여러 사용자에게 그룹을 줘서 그룹 지도를 관리할 수 있다.
5. 지도 내 장소를 등록하여 해당 장소를 카카오맵에서 확인이 가능
6. 장소마다 카테고리를 등록하여 카테고리별로 리스트를 조회할 수 있다.
7. 장소마다 어느 누구나 댓글을 등록할 수 있어 해당 장소가 어떤지 리뷰를 남길 수 있다.

## 구현 상세

### [기능구현 History](https://plant-amphibian-108.notion.site/f3c8b9ab3e124dedbb3a69317364b864)

#### [MSW로 Mock 데이터 구축](https://plant-amphibian-108.notion.site/MSW-1d2aa40aaf6d4c239562aebcf65b0c85)

- 백엔드 API가 구축되기 이전에 임의 API 주소와 더미데이터를 만들어서 화면에 정상적으로 노출되는지 확인하는 작업 진행
- 실제 네트워크처럼 데이터를 받기 이전에 delay 1초를 주어서 로딩 테스트 확인

#### [StoryBook & Jest 로 테스트 구축](https://plant-amphibian-108.notion.site/Storybook-Testing-ca52900a55ae483d9a88bff366bd62cb)

- StoryBook View 테스트는 초기에 셋팅을 진행하여 동적인 일부 컴포넌트를 제외하고 모두 구축하였다. 구축이 안된 컴포넌트는 카카오맵과 관련된 컴포넌트.
- Jest로는 중요한 로직 기능테스트들을 진행하였다. (지도 CRUD, 장소 CRUD 등) Jest 기능 테스팅은 중간에 셋팅을하여 진행하였다. (중간에서 셋팅을 하다보니 여러 라이브러리 충돌과 에러들을 겪었지만 하나의 충돌(twin.macro) 이외에 전부 해결후 ⇒ [테스트 진행](https://www.notion.so/Jest-709438cfd3664ee898f705e3f817522a)
- 이후 확장된 기능들은 TDD 기법을 적용하여 테스팅을 적용했습니다.

#### [컴포넌트 분리 고민](https://plant-amphibian-108.notion.site/e76ad6ba3e02402ea8c8f40c50c39682)

- 초기에 어느정도 컴포넌트 설계를 구축하고 진행했지만 프로젝트가 커짐에 따라 설계한 컴포넌트가 잘못되었거나 불필요한 API 호출로 인해 리팩토링하는 작업을 진행하였습니다.

#### [타입스크립트 타입지정](https://plant-amphibian-108.notion.site/d390516c86b04a5eaadb1a9980fb2dcf)

- 인터페이스는 하나의 클래스처럼 만들었으며 타입은 해당 인터페이스에서 부분적으로 만들어지는 부품 단위로 로직을 작성했습니다.

#### [사용자 경험 개선하기](https://plant-amphibian-108.notion.site/6987501c0f0549a9bb6c56322e6cc2f6)

- 1차 배포이후 여러 피드백을 받고 수정하였다.

#### [프론트엔드 성능개선](https://plant-amphibian-108.notion.site/8a5de6194cd74e3698e830d82b8c8a2c)

- API Refetch 되는 현상 막기
- 불필요한 컴포넌트 재렌더링 현상 줄이기.
- tailliwnd로 컨버팅하면서 번들된 js 파일 크기 줄이기
- lightHouse를 통해 성능 테스트 측정 이후 개선.

</details>

<details>
<summary> 
<h3>BE</h3>
</summary>

## Backend 기술 스택

- Java 11
- Spring Boot 2.7.2
- MySQL 8.0
- Spring Data Jpa
- Spring Rest Docs(Rest Assured)
- WireMock
- TestContainer
- Docker
- Redis

---

## 구현 기능

- OAuth 로그인(Naver, Github)
- 지도(PRIVATE, PUBLIC) CRUD
- 지도 그룹멤버 CRUD
  - `READ`, `MAINTAIN`, `HOST` 권한으로 나눠서 적용
- 카테고리 CRUD
- 장소 CRUD
- 댓글 CRUD

---

## DB ERD

![ERD](https://user-images.githubusercontent.com/81129309/209779184-1776694c-da53-4ddc-82af-2c8af9e331d0.png)

---

## 구현 상세

### **1. 로그인 로직 구현** [(관련PR)](https://github.com/squad-map/squad-map-project/pull/66)

- Github, Naver Oauth 로그인을 구현했습니다.
- OAuthProvider를 추상화하여 확장성을 고려하여 구현했습니다.
- OAuthProperties([@ConfigurationProperties](https://velog.io/@cmsskkk/SpringBoot-ConfigurationProperties) 활용)를 통해서 Map 자료구조로 민감정보를 관리하도록 구현했습니다.
- 자바 11에 정식으로 추가된 라이브러리인 java.net.http.HttpClient를 활용하여, OAuthServer와 API 통신을 구현했습니다.

---

### 2. RestDocs(RestAssured) & WireMock [(관련PR)](https://github.com/squad-map/squad-map-project/pull/106)

- Spring Rest Docs를 활용하여 테스트를 통한 API 문서를 자동화했습니다.
- Rest Assured를 활용하여 Mock이 아닌 Bean 객체를 활용한 신뢰성 있는 통합 테스트 구현했습니다.
- Oauth 로그인 테스트 시에 외부 의존성을 제거하기 위해서 WireMock을 Mock Server활용해서 테스트를 진행했습니다.

---

### 3. 테스트 격리와 테스트 컨테이너 적용 [(관련PR)](https://github.com/squad-map/squad-map-project/pull/153)

- 인수(문서화) 테스트, 통합 테스트 시 테스트 순서를 보장하지 않기 때문에, 데이터의 정합성을 보장하여 테스트의 신뢰성을 높이기 위해서 테스트 격리를 진행했습니다.
- TestExecutinonListener와 상속 구조를 활용해서 코드의 중복을 줄이고, TestContext의 변경을 최소화하도록 했습니다.
- 테스트 메서드 실행 전에 항상 모든 테이블의 데이터를 truncate하고, 데이터를 삽입하는 스크립트를 실행하도록 했습니다.
- 테스트 컨테이너를 적용해, 실제 서비스 서버와 테스트 서버의 환경을 동일하게 유지하고자 했습니다.

---

### 4. 권한 검증 로직에 대한 고민과 리팩토링

- [1차 리팩토링 PR](https://github.com/squad-map/squad-map-project/pull/155)
- [2차 리팩토링 PR](https://github.com/squad-map/squad-map-project/pull/164)

#### [Spring AOP에서 메서드 파라미터 활용하기](https://velog.io/@cmsskkk/aop-reflection-access-controll)

#### [회원 접근 권한 로직 분리를 위한 설계 고민과 AOP 적용기](https://velog.io/@cmsskkk/refactoring-access-controll2)

- 지도에 대한 접근 권한을 확인하는 과정이 핵심 비즈니스 로직 대부분에 포함되어 있어서 해당 로직을 분리하고자 했습니다.
- 객체의 역할과 의존성을 분리하는 방법을 여러가지 방식에 대해서 장단점을 분석하고, AOP로 로직을 분리하여 리팩토링 했습니다.

---

### 5. NGrinder를 통한 전체 공개 지도 목록 조회 성능 테스트 [(블로그)](https://velog.io/@cmsskkk/NGrinder-Redis-Caching)

- local 환경에서 조회성능에 대한 테스트를 진행하였습니다.
- 불필요한 연관관계 lazy loading으로 인한 성능 문제를 파악하고, 쿼리를 수정하였습니다.
- 이 후, Redis를 통한 캐싱을 진행해보고, [Redis에 대해서 학습](https://velog.io/@cmsskkk/redis-transaction-spring-and-lua-pipeline)했습니다.

### 6. Paging 성능 개선을 위한 no offset query 리팩토링 & 이름 검색 성능을 위한 index 적용

- member 5,000,000건, map 10,000,000 건의 더미 데이터를 넣고 ngrinder로 성능을 테스트했습니다.

#### [페이징 no offset 쿼리로 리팩토링하기](https://velog.io/@cmsskkk/No-Offset-Paging-ngrinder2)

- 기존 paging 로직에서 offset 쿼리 사용의 성능 문제를 파악하고 no offset query로 리팩토링 하였습니다.
- Vuser 30 상태에서 DB Connection timeout으로 인한 exception 발생이 지속적으로 발생했던 것과 달리, Vuser 102 환경에서 **MTT 1.6초 / TPS 63**으로의 성능 개선을 경험했습니다.

#### [이름 검색 DB INDEX 적용기](https://velog.io/@cmsskkk/like-DB-Index-NGrinder3)

- 기존 '%{검색단어}%'로 이름을 검색하는 like 쿼리에서, `name` 컬럼에 DB INDEX를 적용하고, '{검색단어}%' like 쿼리를 수정했습니다.
- NGrinder를 통한 부하테스트에서 기존 **TPS 8 / MTT 12초** 의 성능에서 **TPS 99 / MTT 1초**로 10배 이상의 성능 개선을 경험했습니다.

---

</details>
