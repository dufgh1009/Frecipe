const ADD_INGREDIENT = 'recipe/ADD_INGREDIENT' as const;
const ADD_SAUCE = 'recipe/ADD_SAUCE' as const;
const CHANGE_MAIN_INGREDIENT = 'recipe/CHANGE_MAIN_INGREDIENT' as const;
const CHANGE_INGREDIENT = 'recipe/CHANGE_INGREDIENT' as const;
const ADD_CONTEXT = 'recipe/ADD_CONTEXT' as const;
const CHANGE_CONTEXT = 'recipe/CHANGE_CONTEXT' as const;
const CHANGE_TITLE = 'recipe/CHANGE_TITLE' as const;
const SAVE_IMAGE = 'recipe/SAVE_IMAGE' as const;
const INIT_RECIPE = 'recipe/INIT_RECIPE' as const;

export interface recipeAdd {
  title: string;
  mainIngredients: any[];
  ingredients: any[];
  sauce: any[];
  mainImage: string;
  context: any[];
  completeImage: any[];
}

export const addIngredient = () => ({ type: ADD_INGREDIENT });
export const addSauce = () => ({ type: ADD_SAUCE });
export const addContext = () => ({ type: ADD_CONTEXT });
export const changeMainIngredient = (index: number, value: string) => ({
  type: CHANGE_MAIN_INGREDIENT,
  payload: { index, value },
});
export const changeIngredient = (
  index: number,
  value: string,
  what: string,
  category: string,
) => ({ type: CHANGE_INGREDIENT, payload: { index, value, what, category } });
export const changeContext = (index: number, value: string) => ({
  type: CHANGE_CONTEXT,
  payload: { index, value },
});
export const changeTitle = (value: string) => ({
  type: CHANGE_TITLE,
  payload: value,
});
export const saveImage = (index: number, category: string, uri: string) => ({
  type: SAVE_IMAGE,
  payload: { index, category, uri },
});
export const initRecipeAdd = () => ({ type: INIT_RECIPE });

type Actions =
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof addSauce>
  | ReturnType<typeof changeMainIngredient>
  | ReturnType<typeof changeIngredient>
  | ReturnType<typeof addContext>
  | ReturnType<typeof changeContext>
  | ReturnType<typeof changeTitle>
  | ReturnType<typeof saveImage>
  | ReturnType<typeof initRecipeAdd>;

type CreateRecipeState = {
  recipeAdd: recipeAdd;
};

const initialState: CreateRecipeState = {
  recipeAdd: {
    title: '',
    mainIngredients: [
      { id: 0, ingredient: '' },
      { id: 1, ingredient: '' },
      { id: 2, ingredient: '' },
    ],
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
    mainImage: '',
    context: [
      {
        id: 0,
        text: '',
        image: '',
      },
    ],
    completeImage: [
      { id: 0, image: '' },
      { id: 1, image: '' },
      { id: 2, image: '' },
    ],
  },
};

function createRecipe(
  state: CreateRecipeState = initialState,
  action: Actions,
): CreateRecipeState {
  const recipeAdd = Object.assign({}, state.recipeAdd);
  switch (action.type) {
    case ADD_INGREDIENT:
      let newIngredients = Object.assign([], recipeAdd.ingredients);
      var newIngredient = {
        id: newIngredients.length,
        name: '',
        quantity: '',
      };
      newIngredients.push(newIngredient);
      recipeAdd.ingredients = newIngredients;
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case ADD_SAUCE:
      var newSauceIngredients = Object.assign([], recipeAdd.sauce);
      var newSauceIngredient = {
        id: newSauceIngredients.length,
        name: '',
        quantity: '',
      };
      newSauceIngredients.push(newSauceIngredient);
      recipeAdd.sauce = newSauceIngredients;
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case CHANGE_MAIN_INGREDIENT:
      var newMainIngredients: any[] = Object.assign(
        [],
        recipeAdd.mainIngredients,
      );
      newMainIngredients[action.payload.index] = {
        id: action.payload.index,
        ingredient: action.payload.value,
      };
      recipeAdd.mainIngredients = newMainIngredients;
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case CHANGE_INGREDIENT:
      if (action.payload.category === 'ingredient') {
        let newIngredients: any[] = Object.assign([], recipeAdd.ingredients);
        if (action.payload.what === 'name') {
          newIngredients[action.payload.index] = {
            id: action.payload.index,
            name: action.payload.value,
            quantity: newIngredients[action.payload.index].quantity,
          };
          recipeAdd.ingredients = newIngredients;
        } else {
          newIngredients[action.payload.index] = {
            id: action.payload.index,
            name: newIngredients[action.payload.index].name,
            quantity: action.payload.value,
          };
          recipeAdd.ingredients = newIngredients;
        }
      } else {
        let newSauce: any[] = Object.assign([], recipeAdd.sauce);
        if (action.payload.what === 'name') {
          newSauce[action.payload.index] = {
            id: action.payload.index,
            name: action.payload.value,
            quantity: newSauce[action.payload.index].quantity,
          };
          recipeAdd.sauce = newSauce;
        } else {
          newSauce[action.payload.index] = {
            id: action.payload.index,
            name: newSauce[action.payload.index].name,
            quantity: action.payload.value,
          };
          recipeAdd.sauce = newSauce;
        }
      }
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case ADD_CONTEXT:
      let newContext: any[];
      newContext = Object.assign([], recipeAdd.context);
      var content = {
        id: newContext.length,
        text: '과정을 설명하시오',
        image: '',
      };
      newContext.push(content);
      recipeAdd.context = newContext;
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case CHANGE_CONTEXT:
      newContext = Object.assign([], recipeAdd.context);
      newContext[action.payload.index] = {
        id: action.payload.index,
        text: action.payload.value,
        image: newContext[action.payload.index].image,
      };
      recipeAdd.context = newContext;
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case CHANGE_TITLE:
      recipeAdd.title = action.payload;
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case SAVE_IMAGE:
      if (action.payload.category === 'completeImage') {
        recipeAdd.completeImage = [
          ...recipeAdd.completeImage.slice(0, action.payload.index),
          Object.assign({}, recipeAdd.completeImage[action.payload.index], {
            image: action.payload.uri,
          }),
          ...recipeAdd.completeImage.slice(action.payload.index + 1),
        ];
      }
      return Object.assign({}, state, { recipeAdd: recipeAdd });
    case INIT_RECIPE:
      return Object.assign({}, state, {
        recipeAdd: {
          title: '',
          mainIngredients: [
            { id: 0, ingredient: '' },
            { id: 1, ingredient: '' },
            { id: 2, ingredient: '' },
          ],
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
          mainImage: '',
          context: [
            {
              id: 0,
              text: '과정을 설명하시오.',
              image: '',
            },
          ],
          completeImage: [
            { id: 0, image: '' },
            { id: 1, image: '' },
            { id: 2, image: '' },
          ],
        },
      });
    default:
      return state;
  }
}

export default createRecipe;
