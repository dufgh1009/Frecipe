# :computer: Back-End!~

## 기술 스택

Framework
- [Spring Boot](https://spring.io/projects/spring-boot)

DB
- [MariaDB](https://mariadb.org/)
- [MongoDB](https://www.mongodb.com/)

Library
- [JPA](https://spring.io/projects/spring-data-jpa)

> ## SQL vs NoSQL  
> ### SQL (관계형 데이터베이스, 구조화된 쿼리 언어, Structured Query Language)  
> - 데이터 베이스 자체를 나타내는 것이 아니라, 특정 유형의 데이터베이스와 상호 작용하는 데 사용 하는 쿼리 언어
> - RDBMS에서 데이터의 CRUD 가능
> - 데이터는 엄격한 데이터 스키마를 따라 저장됨 -> 스키마를 준수하지 않는 레코드는 추가할 수 없음
> - 데이터는 관계를 통해 연결된 여러 개의 테이블에 분산됨 -> 데이터의 중복이 없으므로 부정확한 데이터를 다룰 위험이 없음  
>   
> ### NoSQL (비관계형 데이터베이스)
> - 스키마와 관계가 존재하지 않음
> - Database - Collections - Documents 구조
> - join의 개념이 존재하지 않는 대신, 컬렉션의 문서를 복제하여 사용함 -> 문서를 사용하는 모든 컬렉션에서 데이터가 똑같이 업데이트 되어야 함
> - 복잡하고 느린 조인을 사용할 필요가 없음
> 
> ### 확장(Scaling)  
> 수직적(Vertical)
> - SQL
> - 단순한 데이터베이스 서버의 성능 향상
>
> 수평적(Horizontal)
> - NoSQL
> - 더 많은 서버를 추가하여 데이터베이스가 전체적으로 분산됨
> - 하나의 데이터베이스, 여러 호스트 
>  
> ### 비교
> ||장점|단점|사용|
> |---|----|----|---|
> |SQL|- 명확하게 정의 된 스키마 <br> - 데이터 무결성 보장 <br> - 관계는 각 데이터를 중복없이 한번만 저장|- 상대적으로 덜 유연함, 데이터 스키마는 사전에 계획되고 알려져야 함 <br> - 관계를 맺고 있기 때문에, Join이 많은 복잡한 쿼리가 만들어짐 <br> - 수직적 확장만 가능하기 때문에, 처리할 수 있는 처리량과 관련하여 성장 한계에 직면함|- 관계를 맺고 있는 데이터가 자주 변경되는 애플리케이션 <br> - 변경될 여지가 없고, 명확한 스키마가 사용자와 데이터에게 중요한 경우|
> |NoSQL|- 스키마가 없기 때문에 훨씬 더 유연한 구조 <br> - 언제든지 저장된 데이터를 조정하고 새로운 필드 추가 가능 <br> - 데이터는 애플리케이션이 필요로 하는 형식으로 저장 <br> - 데이터를 읽는 속도가 빠름 <br> - 수직 및 수평 확장이 가능하므로 데이터베이스가 애플리케이션에서 발생시키는 모든 읽기 및 쓰기 요청을 처리할 수 있음|- 유연성 때문에, 데이터 구조 결정을 하지 못하고 미루게 될 수 있음 <br> - 여러 개의 레코드가 변경된 경우 여러 컬렉션과 문서를 업데이트 해야 함 <br> - 데이터가 여러 컬렉션에 중복되어 있기 때문에, Update 의 경우 모든 컬렉션에서 수행해야 함|- 정확한 데이터 구조를 알 수 없거나 변경, 확장 될 수 있는 경우 <br> - Read 를 자주 처리하지만, Update 는 가끔 하는 경우 (한 번의 변경으로 수십 새의 문서를 업데이트 할 필요가 없는 경우) <br> - 데이터베이스를 수평으로 확장하는 경우 (막대한 양의 데이터를 다뤄야 하는 경우)  
>  
> 참고 : [https://siyoon210.tistory.com/130](https://siyoon210.tistory.com/130)  

## API
- REST API (Swagger)
- GraphQL API  

### User 
methods|POST|GET|PUT|DELETE
:---:|:----:|:---:|:---:|:---:
/users|회원 가입 :heavy_check_mark:|회원 전체 조회 :heavy_check_mark:|회원 수정|회원 전체 삭제
/users/1|||회원 '1' 수정|회원 '1' 삭제
/users/login|로그인 :heavy_check_mark:|
/users/details||회원 정보 조회
<br>

### Find
methods|POST|GET|PUT|DELETE
:---:|:----:|:---:|:---:|:---:
/finds/id|아이디 찾기 :heavy_check_mark:
/finds/pw|비밀번호 찾기
<br>

### Refrigerator
methods|POST|GET|PUT|DELETE||
:---:|:----:|:---:|:---:|:---:|:---:
/fridges|식품 등록|식품 전체 조회|냉장고 이름 수정|냉장고 삭제|
<br>

### Recipe
methods|POST|GET|PUT|DELETE
:---:|:----:|:---:|:---:|:---:
/recipes|레시피 등록|레시피 전체 조회|레시피 수정|레시피 삭제
/recipes/1||레시피 '1' 조회|레시피 '1' 수정|레시피 '1'삭제
<br>

### Ingredient
methods|POST|GET|PUT|DELETE
:---:|:----:|:---:|:---:|:---:
/ingredients|재료 등록|재료 전체 조회|재료 수정|재료 삭제
/ingredients/1||재료 '1' 조회|재료 '1' 수정|재료 '1'삭제
