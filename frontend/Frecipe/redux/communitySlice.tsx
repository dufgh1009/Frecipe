const LIST = 'community/LIST' as const;
const FILTER = 'community/FILTER' as const;
const SEARCH = 'community/SEARCH' as const;
const DETAIL = 'community/DETAIL' as const;

interface Comment {
  content: string;
  nickname: string;
  rate: number;
}

export interface Context {
  text: string;
  image: string;
}

export interface Ingredient {
  name: string;
}

export interface Sauces {
  name: string;
  quantity: string;
}

export interface Img {
  image: string;
}

interface Recipe {
  recipeNo: number;
  mainImage: string;
  title: string;
  nickname: string;
  context: Array<Context>;
  view: number;
  rate: number;
  comments: Array<Comment>;
  mainIngredients: Array<Ingredient>;
  ingredients: Array<Sauces>;
  sauce: Array<Sauces>;
  completeImage: Array<Img>;
}

export interface filterType {
  selected: string;
  clickSelect: number;
}

export const list = (form: Array<Recipe>) => ({ type: LIST, payload: form });
export const filter = (form: filterType) => ({ type: FILTER, payload: form });
export const search = (keyword: string) => ({ type: SEARCH, payload: keyword });
export const detail = (recipe: Object) => ({ type: DETAIL, payload: recipe });

type Actions =
  | ReturnType<typeof list>
  | ReturnType<typeof filter>
  | ReturnType<typeof search>
  | ReturnType<typeof detail>;

type CommunityState = {
  recipes: Array<Recipe>;
  selected: string;
  searchKeyword: string;
  searchRecipes: Array<Recipe>;
  clickSelect: number;
  recipeDetail: Object;
};

const initialState: CommunityState = {
  recipeDetail: {
    recipeNo: 1,
    mainImage:
      'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
    title: '간장계란밥',
    nickname: 'kwonsky',
    context: [
      {
        text: '',
        image: '',
      },
    ],
    view: 9,
    rate: 4.5,
    comments: [
      { nickname: '성중이', content: '맛없겠다.', rate: 5 },
      { nickname: '성여로', content: '나도 간계밥!!!', rate: 5 },
      { nickname: '아잉으니야', content: '난 언제 해줌?', rate: 5 },
      { nickname: '엄...', content: '하늘이 집 가면 돼?', rate: 5 },
      {
        nickname: 'kwonsky',
        content: '다 나가주세요. 혼자 있고 싶으니깐...',
        rate: 5,
      },
    ],
    mainIngredients: [{ name: '' }, { name: '' }, { name: '' }],
    ingredients: [
      {
        name: '',
        quantity: '',
      },
      {
        name: '',
        quantity: '',
      },
      {
        name: '',
        quantity: '',
      },
    ],
    sauces: [
      {
        name: '',
        quantity: '',
      },
    ],
    completeImage: [{ image: '' }, { image: '' }, { image: '' }],
  },
  recipes: [
    {
      recipeNo: 1,
      mainImage:
        'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
      title: '간장계란밥',
      nickname: 'kwonsky',
      context: [
        {
          text: '',
          image: '',
        },
      ],
      view: 9,
      rate: 4.5,
      comments: [
        { nickname: '성중이', content: '맛없겠다.', rate: 5 },
        { nickname: '성여로', content: '나도 간계밥!!!', rate: 5 },
        { nickname: '아잉으니야', content: '난 언제 해줌?', rate: 5 },
        { nickname: '엄...', content: '하늘이 집 가면 돼?', rate: 5 },
        {
          nickname: 'kwonsky',
          content: '다 나가주세요. 혼자 있고 싶으니깐...',
          rate: 5,
        },
      ],
      mainIngredients: [{ name: '' }, { name: '' }, { name: '' }],
      ingredients: [
        {
          name: '',
          quantity: '',
        },
        {
          name: '',
          quantity: '',
        },
        {
          name: '',
          quantity: '',
        },
      ],
      sauces: [
        {
          name: '',
          quantity: '',
        },
      ],
      completeImage: [{ image: '' }, { image: '' }, { image: '' }],
    },
  ],
  selected: '업데이트순',
  searchKeyword: '',
  clickSelect: 0,
};

function community(
  state: CommunityState = initialState,
  action: Actions,
): CommunityState {
  const recipes = Object.assign([], state.recipes);
  switch (action.type) {
    case LIST:
      return Object.assign({}, state, {
        recipes: action.payload,
        searchRecipes: action.payload,
      });
    case FILTER:
      var filterRecipeList = Object.assign([], state.searchRecipes);
      if (action.payload.selected === '업데이트순') {
        filterRecipeList.sort(function (a: Recipe, b: Recipe) {
          return b.recipeNo - a.recipeNo;
        });
      } else if (action.payload.selected === '평점순') {
        filterRecipeList.sort(function (a: Recipe, b: Recipe) {
          return b.rate - a.rate;
        });
      } else if (action.payload.selected === '조회수순') {
        filterRecipeList.sort(function (a: Recipe, b: Recipe) {
          return b.view - a.view;
        });
      } else {
        // 댓글순
        filterRecipeList.sort(function (a: Recipe, b: Recipe) {
          return b.comments.length - a.comments.length;
        });
      }
      return Object.assign({}, state, {
        searchRecipes: filterRecipeList,
        selected: action.payload.selected,
        clickSelect: action.payload.clickSelect,
      });
    case SEARCH:
      var searchRecipeList: Recipe[] = [];
      recipes.map((element: Recipe) => {
        if (element.title.includes(action.payload)) {
          searchRecipeList.push(element);
        }
      });
      return Object.assign({}, state, {
        searchRecipes: searchRecipeList,
        searchKeyword: action.payload,
      });
    case DETAIL:
      return Object.assign({}, state, { recipeDetail: action.payload });
    default:
      return state;
  }
}

export default community;
