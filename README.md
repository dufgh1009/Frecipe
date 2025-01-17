# Frecipe

> 영수증 인식 기술을 이용한 효율적인 식품 관리 및 레시피 필터링 서비스



## 목차

- [프로젝트 개요](#프로젝트-개요)
- [프로젝트 역할](#프로젝트-역할)
- [개발 규칙](#개발-규칙)



## 프로젝트 개요

1. 프로젝트 주제

   영수증 인식 기술을 이용한 효율적인 식품 관리 및 레시피 필터링 서비스

2. 주제 선정 배경 및 시장 분석
   1. 주제 선정 배경
      - 식품을 구매할 때 유통기한을 확인하고 구매하지만, 보관하는 과정에서 유통기한을 까먹고 식품이 상해서 버렸던 경험이 있을 것이다. 또한, 유통기한이 끝나가는 식품들을 어떤 음식을 만들어 먹을지 고민했던 경험도 있을 것이다. 우리는 이러한 두 가지를 해결할 수 있도록 식품 관리와 레시피 추천 서비스를 제공하는 애플리케이션을 기획하였다.
   2. 벤치마킹 또는 유사 서비스 사례 소개
      - 모바일 어플리케이션 'BEEP', '냉장고 지킴이', '유통기한 언제지' 등을 유사 사례로 들 수 있다. 'BEEP'는 바코드를 촬영해서 물품을 인식 한 후 유통기한을 직접 입력 하는 형식으로 되어있고 '냉장고 지킴이'는 물품의 사진, 제품 이름, 유통기한을 모두 직접 작성해야한다. 
      - 우리가 제작한 서비스와 제일 비슷한 서비스를 제공하는 어플리케이션은 '유통기한 언제지'이다. 우리 서비스와 유사한 점은 명세서나 영수증을 촬영해서 AI로 글자 인식을 한 후 유통기한을 직접 입력하는 형식이다. 이 어플의 주요 타겟층은 학교, 유치원 또는 어린이 집, 카페이다.
   3. 소비자/시장에 줄 수 있는 가치
      - 효율적인 식품 관리를 통해 늘어나는 음식물 쓰레기를 줄일 수 있으며 가지고 있는 식품을 통한 레시피 추천으로 어떤 음식으로 끼니를 해결할지 고민하는 많은 1인 가구에 고민을 줄여줄 수 있을 것이다.
   4. 향후 전망
      - 서비스를 통해 작게는 가정의 음식물 쓰레기부터 학교, 공공 기간, 식당 등 음식물 쓰레기를 줄일 수 있을 것이다. 또한, 영수증을 찍어 물품을 관리하기에 가계부, 식단 조절, 소비 습관까지 영향을 줄 수 있을 것이라고 생각한다.
3. 목표
   1. 영수증의 식품들을 인식하여 효율적인 식품 관리 서비스와 관련 레시피를 함께 추천하는 서비스를 개발한다.
   2. 기존 유통기한 관리 서비스와 차별화를 강조하여 레시피 추천 서비스를 더하며 사용자간의 커뮤니케이션과 레시피 정보 공유를 활성화한다. 
   3. 학습한 기술을 모두 접목하여 프로젝트의 완성도와 안정성을 높이고 담당 역할 외에도기술스택에 대한 전반적인 이해를 갖춘다.



## 프로젝트 역할

|역할|이름|
|-|-|
|팀장 및 프론트엔드 개발 | 이지은|
|프론트엔드 팀장|엄강우|
|백엔드 팀장|성열호|
|AI 팀장|권하늘|
|UCC 팀장 및 AI 개발|김성중|



## 개발 규칙

1. git commit 작성 규칙

   추가 : S03P31D204-00 [+] add login / 부가설명(필요시)

   수정 : S03P31D204-00 [+] Edit login / 부가설명(필요시)

   삭제 : S03P31D204-00 [-] Del login / 부가설명(필요시)

2. git branch 이름

   develop -> frontend -> feature/S03P31D204-00/login
   
   ​                -> backend -> feature/S03P31D204-00/login
   
   ​                ->       AI       -> feature/S03P31D204-00/temp