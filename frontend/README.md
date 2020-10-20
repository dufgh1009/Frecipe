# Frecipe



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
        ├── Main/
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

1. Auth
   1. signUp.tsx 화면
   2. signIn.tsx 화면
   3. Find.tsx 화면
   4. stack navigation으로 이용한 연결
2. Main
   1. bottom navigation 이용한 화면 연결

3. Gate
   1. token 유,무에 따라 출력되는 화면 변경
4. Refregerator
   1. Refregerator.tsx 화면 구현
   2. 식품 등록 Modal 구현
   3. 식품 리스트 구현
   4. 유통기한 임박(D-3) 음식 갯수 구현
   5. 유통기한 만료 음식 갯수 구현
   6. 유통기한 임박순, 업데이트 순으로 식품 리스트 다르게 출력
   7. 식품 검색 구현
   8. 카메라 연동
   9. 앨범 연동
   10. 캘린더 화면 구현
   11. stack navigation 이용한 화면 연결
5. RecipeRecommend
   1. RecipeRecommend.tsx 화면
   2. 추천 레시피 리스트 구현
   3. 유튜브 검색 연동
   4. 유튜브 검색 레시피 리스트 구현
6. Community
   1. Community.tsx 화면
   2. 조회순, 평점순, 댓글순, 업데이트순으로 게시글 리스트 다르게 출력
   3. 게시글 검색 구현
   4. 게시글 리스트 구현
   5. recipeCreate.tsx 화면
   6. 카메라 연동
   7. 앨범 연동
   8. 재료선택 Modal 구현
   9. 임시저장 게시글 확인 및 선택 구현
   10. recipeDetail.tsx 화면
   11. recipeDetail comment 리스트 구현
   12. stack navigation으로 이용한 연결
7. Setting
   1. Setting.tsx 화면 구현
   2. 유저 이미지 등록
8. back-end 연동
   1. signUp
   2. signIn
   3. Find
   4. Refrigerator
   5. Refrigerator - 식품 등록
   6. 카메라 or 앨범
   7. RecipeRecommend
   8. Community
   9. Recipe create
   10. comment
   11. logout
   12. 회원 탈퇴