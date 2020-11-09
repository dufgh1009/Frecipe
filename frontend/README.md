# Frecipe

### 사용 라이브러리

- [Expo](https://expo.io/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Elements](https://reactnativeelements.com/)



### 폴더구조

```
Frecipe
    ├── .expo-shared/
    ├── asset/
    ├── navigation/
    	├── Auth.tsx
        └── Main.tsx
    ├── node_modules/
    ├── redux/
    	├── communitySlice.tsx
        ├── recipeRecommendSlice.tsx
        ├── rootReducer.tsx
        ├── store.tsx
        └── usersSlice.tsx
    ├── screens/
    	├── Auth/
            ├── Find.tsx
            ├── SignIn.tsx
            └── SignUp.tsx
        └── Main/
            ├── refrigerator
            ├── recipeRecommend
            ├── community
            └── setting
    ├── .gitignore
    ├── app.json
    ├── App.tsx
    ├── babel.config.js
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```



### Frontend 개발 계획

1. ~~Auth~~
   1. ~~signUp.tsx~~
   2. ~~signIn.tsx~~
   3. ~~Find.tsx~~
   4. ~~stack navigation으로 이용한 연결~~
2. ~~Main~~
   1. ~~bottom navigation 이용한 화면 연결~~

3. ~~Gate~~
   1. ~~login 유,무에 따라 출력되는 화면 변경~~
4. Refregerator
   1. ~~Refregerator.tsx~~
      1. ~~화면 구성~~
      2. ~~식품 등록 Modal 구현~~
      3. ~~식품 리스트 구현~~
      4. ~~유통기한 임박(D-3) 음식 갯수 구현~~
      5. ~~유통기한 만료 음식 갯수 구현~~
      6. ~~유통기한 임박순, 업데이트 순으로 식품 리스트 다르게 출력~~
      7. ~~식품 검색 구현~~
      8. 캘린더 화면 구현
   2. stack navigation 이용한 화면 연결
      1. 카메라 연동
      2. 앨범 연동
5. ~~RecipeRecommend~~
   1. ~~RecipeRecommend.tsx~~
      1. ~~화면 구성~~
      2. ~~추천 레시피 리스트 구현~~
      3. ~~유튜브 검색 연동~~
      4. ~~유튜브 검색 레시피 리스트 구현~~
6. Community
   1. ~~Community.tsx~~
      1. ~~화면 구성~~
      2. ~~조회순, 평점순, 댓글순, 업데이트순으로 게시글 리스트 다르게 출력~~
      3. ~~게시글 검색 구현~~
      4. ~~게시글 리스트 구현~~
   2. recipeCreate.tsx
      1. ~~화면 구성~~
      2. 카메라 연동
      3. 앨범 연동
      4. 재료선택 Modal 구현
      5. 임시저장 게시글 확인 및 선택 구현
   3. ~~recipeDetail.tsx~~
      1. ~~화면 구성~~
      2. ~~Comment 리스트 구현~~
   4. ~~stack navigation으로 이용한 연결~~
7. ~~Setting~~
   1. ~~Setting.tsx~~
      1. ~~화면 구성~~
      2. ~~유저 이미지 등록~~
8. back-end 연동
   1. Auth
      1. ~~signUp~~
      2. ~~signIn~~
      3. Find
   2. Refrigerator
      1. 식품 등록
      2. 카메라 or 앨범
   3. RecipeRecommend
   4. Community
      1. Recipe create
      2. comment
   5. Setting
      1. ~~logout~~
      2. ~~회원 수정~~
      3. 회원 이미지 등록
      4. ~~회원 탈퇴~~



### 개발 규칙

- React Native
  1. 클래스형 컴포넌트 사용
  2. render 함수에서 state 호출한 후 사용

- Redux

  1. action : const `액션명` =` '사용하는컴포넌트/액션명'` as const;

  2. action 함수 : export const `함수명` = (`인자`) => ({ type : `액션명`, payload : `인자` })

  3. return 방법 : type `사용하는컴포넌트+Action` = | ReturnType<typeof `action함수`>

  4. reducer :

     ```typescript
     function refrigerator(
     	 state: RefrigeratorState = intialState,
        action: RefrigeratorAction
     ): RefrigeratorState {
          switch (action.type) {
            // state를 복제해서 새로운 state를 리턴 함
            case action1: ~~
            case action2: ~~
            default:
              return state;
        }
     }
     ```

     

