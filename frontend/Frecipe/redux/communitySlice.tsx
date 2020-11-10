const LIST = 'community/LIST' as const;
const FILTER = 'community/FILTER' as const;
const SEARCH = 'community/SEARCH' as const;
const DETAIL = 'community/DETAIL' as const;
const ADD_INGREDIENT = 'recipe/ADD_INGREDIENT' as const;
const ADD_SAUCE = 'recipe/ADD_SAUCE' as const;
const CHANGE_MAIN_INGREDIENT = 'recipe/CHANGE_MAIN_INGREDIENT' as const;
const CHANGE_INGREDIENT = 'recipe/CHANGE_INGREDIENT' as const;
const ADD_CONTEXT = 'recipe/ADD_CONTEXT' as const;
const CHANGE_CONTEXT = 'recipe/CHANGE_CONTEXT' as const;
const CHANGE_TITLE = 'recipe/CHANGE_TITLE' as const;
const SAVE_IMAGE = 'recipe/SAVE_IMAGE' as const;
const INIT_RECIPE = 'recipe/INIT_RECIPE' as const;

export interface recipeToAdd {
  title: string,
  mainIngredients: any[],
  ingredients: any[],
  sauce: any[],
  representationImage: string,
  context: any[],
  completeImage: any[],
}

interface Comment {
  content: string;
  writer: string;
}

export interface Recipe {
  recNo: number;
  title: string;
  view: number;
  rate: number;
  mainImg: string;
  commentCount: string;
  comments: Array<Comment>;
  ingredients: Array<String>;
  content: string;
  writer: string;
}

export interface filterType {
  selected: string;
  clickSelect: number;
}

export const list = (form: Array<Recipe>) => ({ type: LIST, payload: form });
export const filter = (form: filterType) => ({ type: FILTER, payload: form });
export const search = (keyword: string) => ({ type: SEARCH, payload: keyword });
export const detail = (recipe: Object) => ({ type: DETAIL, payload: recipe });
export const addIngredient = () => ({ type: ADD_INGREDIENT })
export const addSauce = () => ({ type: ADD_SAUCE })
export const addContext = () => ({ type: ADD_CONTEXT })
export const changeMainIngredient = (index: number, value: string) => ({ type: CHANGE_MAIN_INGREDIENT, payload: { index, value } })
export const changeIngredient = (index: number, value: string, what: string, category: string) => ({ type: CHANGE_INGREDIENT, payload: { index, value, what, category } })
export const changeContext = (index: number, value: string) => ({ type: CHANGE_CONTEXT, payload: { index, value } })
export const changeTitle = (value: string) => ({ type: CHANGE_TITLE, payload: value })
export const saveImage = (index: number, category: string, uri: string) => ({ type: SAVE_IMAGE, payload: { index, category, uri } })
export const initRecipeToAdd = () => ({ type: INIT_RECIPE })


type Actions =
  | ReturnType<typeof list>
  | ReturnType<typeof filter>
  | ReturnType<typeof search>
  | ReturnType<typeof detail>
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof addSauce>
  | ReturnType<typeof changeMainIngredient>
  | ReturnType<typeof changeIngredient>
  | ReturnType<typeof addContext>
  | ReturnType<typeof changeContext>
  | ReturnType<typeof changeTitle>
  | ReturnType<typeof saveImage>
  | ReturnType<typeof initRecipeToAdd>;

type CommunityState = {
  recipeAdd: recipeToAdd;
  recipes: Array<Recipe>;
  selected: string;
  searchKeyword: string;
  searchRecipes: Array<Recipe>;
  clickSelect: number;
  recipeDetail: Object;
};

const initialState: CommunityState = {
  recipeDetail: {
    recNo: 1,
    mainImg:
      'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
    title: '간장계란밥',
    writer: 'kwonsky',
    view: 9,
    rate: 4.5,
    commentCount: '5',
    content: '간장계란밥 응~ 맛있어^^',
    comments: [
      { writer: '성중이', content: '맛없겠다.' },
      { writer: '성여로', content: '나도 간계밥!!!' },
      { writer: '아잉으니야', content: '난 언제 해줌?' },
      { writer: '엄...', content: '하늘이 집 가면 돼?' },
      { writer: 'kwonsky', content: '다 나가주세요. 혼자 있고 싶으니깐...' },
    ],
    ingredients: ['계란', '간장'],
  },
  recipes: [
    {
      recNo: 1,
      mainImg:
        'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
      title: '간장계란밥',
      writer: 'kwonsky',
      content: '간장계란밥 응~ 맛있어^^',
      view: 9,
      rate: 4.5,
      commentCount: '5',
      comments: [
        { writer: '성중이', content: '맛없겠다.' },
        { writer: '성여로', content: '나도 간계밥!!!' },
        { writer: '아잉으니야', content: '난 언제 해줌?' },
        { writer: '엄...', content: '하늘이 집 가면 돼?' },
        { writer: 'kwonsky', content: '다 나가주세요. 혼자 있고 싶으니깐...' },
      ],
      ingredients: ['계란', '간장'],
    },
    {
      recNo: 2,
      mainImg:
        'https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjZfMjgw/MDAxNTg3ODMwODI5NDA5.eKKl-K8aWanYwrwtlJhM6z5etDgCEMSsYsTvFfTXKTUg.2muwFdf6YD7qAKLi0ObSRcEhkTYYRPAAJ4N0Aip6CE8g.JPEG.eett7777/IMG_4527.jpg?type=w800',
      title: '토마토계란볶음',
      writer: 'zeunny',
      content: '토마토계란볶음은 양손꼬치가 짱이지',
      view: 3,
      rate: 5,
      commentCount: '0',
      comments: [],
      ingredients: ['계란', '토마토'],
    },
  ],
  searchRecipes: [
    {
      recNo: 1,
      mainImg:
        'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
      title: '간장계란밥',
      writer: 'kwonsky',
      content: '간장계란밥 응~ 맛있어^^',
      view: 9,
      rate: 4.5,
      commentCount: '5',
      comments: [
        { writer: '성중이', content: '맛없겠다.' },
        { writer: '성여로', content: '나도 간계밥!!!' },
        { writer: '아잉으니야', content: '난 언제 해줌?' },
        { writer: '엄...', content: '하늘이 집 가면 돼?' },
        { writer: 'kwonsky', content: '다 나가주세요. 혼자 있고 싶으니깐...' },
      ],
      ingredients: ['계란', '간장'],
    },
    {
      recNo: 2,
      mainImg:
        'https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjZfMjgw/MDAxNTg3ODMwODI5NDA5.eKKl-K8aWanYwrwtlJhM6z5etDgCEMSsYsTvFfTXKTUg.2muwFdf6YD7qAKLi0ObSRcEhkTYYRPAAJ4N0Aip6CE8g.JPEG.eett7777/IMG_4527.jpg?type=w800',
      title: '토마토계란볶음',
      writer: 'zeunny',
      content: '토마토계란볶음은 양손꼬치가 짱이지',
      view: 3,
      rate: 5,
      commentCount: '0',
      comments: [],
      ingredients: ['계란', '토마토'],
    },
  ],
  selected: '업데이트순',
  searchKeyword: '',
  clickSelect: 0,
  recipeAdd: {
    title: "",
    mainIngredients: [{ id: 0, ingredient: "" }, { id: 1, ingredient: "" }, { id: 2, ingredient: "" }],
    ingredients: [
      {
        id: 0,
        name: '',
        quantity: '',
      },
    ],
    sauce: [
      {
        id: 0,
        name: '',
        quantity: '',
      },
    ],
    representationImage: '',
    context: [
      {
        id: 0,
        text: '',
        image: ''
      },
    ],
    completeImage: [{ id: 0, image: '' }, { id: 1, image: '' }, { id: 2, image: '' }],
  },
};

function community(
  state: CommunityState = initialState,
  action: Actions
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
          return b.recNo - a.recNo;
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
          return Number(b.commentCount) - Number(a.commentCount);
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
    case ADD_INGREDIENT:
      let newIngredients = Object.assign([], state.recipeAdd.ingredients)
      var newIngredient = {
        id: newIngredients.length,
        name: '',
        quantity: ''
      }
      newIngredients.push(newIngredient)
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd, { ingredients: newIngredients })
      return Object.assign({}, state, { recipeToAdd: newRecipe })
    case ADD_SAUCE:
      var newSauceIngredients = Object.assign([], state.recipeAdd.sauce)
      var newSauceIngredient = {
        id: newSauceIngredients.length,
        name: '',
        quantity: ''
      }
      newSauceIngredients.push(newSauceIngredient)
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd, { sauce: newSauceIngredients })
      return Object.assign({}, state, { recipeAdd: newRecipe })
    case CHANGE_MAIN_INGREDIENT:
      var newMainIngredients: any[] = Object.assign([], state.recipeAdd.mainIngredients)
      newMainIngredients[action.payload.index] = {
        id: action.payload.index,
        ingredient: action.payload.value,
      }
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd, { mainIngredients: newMainIngredients })
      return Object.assign({}, state, { recipeAdd: newRecipe })
    case CHANGE_INGREDIENT:
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd,)
      if (action.payload.category === 'ingredient') {
        let newIngredients: any[] = Object.assign([], state.recipeAdd.ingredients)
        if (action.payload.what === 'name') {
          newIngredients[action.payload.index] = {
            id: action.payload.index,
            name: action.payload.value,
            quantity: newIngredients[action.payload.index].quantity,
          }
          newRecipe.ingredients = newIngredients
        } else {
          newIngredients[action.payload.index] = {
            id: action.payload.index,
            name: newIngredients[action.payload.index].name,
            quantity: action.payload.value,
          }
          newRecipe.ingredients = newIngredients
        }
      } else {
        let newSauce: any[] = Object.assign([], state.recipeAdd.sauce)
        if (action.payload.what === 'name') {
          newSauce[action.payload.index] = {
            id: action.payload.index,
            name: action.payload.value,
            quantity: newSauce[action.payload.index].quantity,
          }
          newRecipe.sauce = newSauce
        } else {
          newSauce[action.payload.index] = {
            id: action.payload.index,
            name: newSauce[action.payload.index].name,
            quantity: action.payload.value,
          }
          newRecipe.sauce = newSauce
        }
      }
      return Object.assign({}, state, { recipeAdd: newRecipe })
    case ADD_CONTEXT:
      let newContext: any[]
      newContext = Object.assign([], state.recipeAdd.context)
      var content = {
        id: newContext.length,
        text: '과정을 설명하시오',
        image: ''
      }
      newContext.push(content)
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd, { context: newContext })
      return Object.assign({}, state, { recipeAdd: newRecipe })
    case CHANGE_CONTEXT:
      newContext = Object.assign([], state.recipeAdd.context)
      newContext[action.payload.index] = {
        id: action.payload.index,
        text: action.payload.value,
        image: newContext[action.payload.index].image
      }
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd, { context: newContext })
      return Object.assign({}, state, { recipeAdd: newRecipe })
    case CHANGE_TITLE:
      var newRecipe: recipeToAdd = Object.assign({}, state.recipeAdd, { title: action.payload })
      return Object.assign({}, state, { recipeAdd: newRecipe })
    case INIT_RECIPE:
      return Object.assign({}, state, {
        recipeAdd: {
          title: "",
          mainIngredients: [{ id: 0, ingredient: "" }, { id: 1, ingredient: "" }, { id: 2, ingredient: "" }],
          ingredients: [
            {
              id: 0,
              name: '',
              quantity: '',
            },
          ],
          sauce: [
            {
              id: 0,
              name: '',
              quantity: '',
            },
          ],
          representationImage: '',
          context: [
            {
              id: 0,
              text: '과정을 설명하시오.',
              image: ''
            },
          ],
          completeImage: [{ id: 0, image: '' }, { id: 1, image: '' }, { id: 2, image: '' }],
        },
      })
    default:
      return state;
  }
}

export default community;
