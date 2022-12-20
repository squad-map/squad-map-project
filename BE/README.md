# Squad Map 프로젝트

### 소개

- 지인, 친구들과 좋은 장소와 그 곳에서의 추억을 공유하기 위한 그룹 지도 서비스입니다.
- 같이 코딩하는 사람들과 모각코, 모임을 가질 때 좋은 장소를 공유하고자 해당 서비스를 기획하게 되었습니다.
- BE, FE, Android 각 파트마다 1명으로 팀을 구성해, 공통의 서비스를 자신의 분야에서 온전히 스스로 고민하고, 도전해보자는 목표로 진행중인 스터디형 프로젝트입니다.

API 문서 : [http://13.124.249.154/docs/index.html](http://13.124.249.154/docs/index.html)

---

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

## 구현 상세

### **1. 로그인 로직 구현** [(관련PR)](https://github.com/squad-map/squad-map-project/pull/66)

- Github, Naver Oauth 로그인을 구현했습니다.
- OAuthProvider를 추상화하여 확장성을 고려하여 구현했습니다.
- OAuthProperties(`@ConfigurationProperties` 활용)를 통해서 Map 자료구조로 민감정보를 관리하도록 구현했습니다.
- 자바 11에 정식으로 추가된 라이브러리인 java.net.http.HttpClient를 활용하여, OAuthServer와 API 통신을 구현했습니다.

---

### 2. 신뢰성 있는 테스트 [(관련PR)](https://github.com/squad-map/squad-map-project/pull/106)

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

### [1차 리팩토링 PR](https://github.com/squad-map/squad-map-project/pull/155)

### [2차 리팩토링 PR](https://github.com/squad-map/squad-map-project/pull/164)
### [Spring AOP에서 메서드 파라미터 활용하기](https://velog.io/@cmsskkk/aop-reflection-access-controll)
- 지도에 대한 접근 권한을 확인하는 과정이 핵심 비즈니스 로직 대부분에 포함되어 있어서 해당 로직을 분리하고자 했습니다.
- 객체의 역할과 의존성을 분리하는 방법을 여러가지 고민하면서 AOP로 로직을 분리하여 리팩토링

---

### 5. NGrinder를 통한 전체 공개 지도 목록 조회 성능 테스트 [(블로그)](https://velog.io/@cmsskkk/NGrinder-Redis-Caching)

- local 환경에서 조회성능에 대한 테스트를 진행하였습니다.
- 불필요한 연관관계 lazy loading으로 인한 성능 문제를 파악하고, 쿼리를 수정하였습니다.
- 그래도 TPS가 마음에 들지않아서 Redis를 통한 캐싱을 진행하였습니다.

> 추가적인 테스트 및 리팩토링 진행 예정 
---
