const LIST = 'refregerator/LIST' as const;
const RECIEPT = 'refregerator/RECIEPT' as const;
const SEARCH = 'refrigerator/SEARCH' as const;
const MAXID = 'refrigerator/MAXID' as const;
const ORDER = 'refrigerator/ORDER' as const;
const ADDINGREDIENT = 'refrigerator/ADDINGREDIENT' as const;
const DELETEINGREDIENT = 'refrigerator/DELETEINGREDIENT' as const;
const DELETEINGREDIENTALL = 'refrigerator/DELETEINGREDIENTALL' as const;
const CHANGEADDINGREDIENT = 'refrigerator/CHANGEADDINGREDIENT' as const;

export interface ingredient {
  id: number;
  status: string;
  name: string;
  count: number;
  date: number;
  exp: string;
}

export const list = (data: Array<ingredient>) => ({
  type: LIST,
  payload: data,
});
export const reciept = (foods: string[]) => ({ type: RECIEPT, payload: foods })
export const search = (keyword: string) => ({ type: SEARCH, payload: keyword });
export const increaseMaxId = () => ({ type: MAXID });
export const order = (filter: string) => ({ type: ORDER, payload: filter });
export const addIngredient = () => ({ type: ADDINGREDIENT });
export const deleteIngredient = (id: number) => ({ type: DELETEINGREDIENT, payload: id })
export const deleteIngredientAll = () => ({ type: DELETEINGREDIENTALL })
export const changeAddIngredient = (id: number, data: any, type: string) => ({ type: CHANGEADDINGREDIENT, payload: { id, data, type } })

type Actions =
  | ReturnType<typeof search>
  | ReturnType<typeof increaseMaxId>
  | ReturnType<typeof order>
  | ReturnType<typeof list>
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof deleteIngredient>
  | ReturnType<typeof deleteIngredientAll>
  | ReturnType<typeof changeAddIngredient>
  | ReturnType<typeof reciept>;

type RefrigeratorState = {
  ingredients: Array<ingredient>;
  searchIngredients: Array<ingredient>;
  maxId: number;
  yellowFood: number;
  redFood: number;
  addIngredients: ingredient[];
};
const initialState: RefrigeratorState = {
  addIngredients: [],
  ingredients: [],
  searchIngredients: [],
  maxId: 0,
  yellowFood: 0,
  redFood: 0,
};

function refrigerator(
  state: RefrigeratorState = initialState,
  action: Actions,
): RefrigeratorState {
  const ingredients = Object.assign([], state.ingredients);
  const newAddIngredient: ingredient[] = Object.assign([], state.addIngredients)
  switch (action.type) {
    case CHANGEADDINGREDIENT:
      let changedIngredient;
      if (action.payload.type === 'name') {
        for (let i = 0; i < newAddIngredient.length; i++) {
          if (newAddIngredient[i].id === action.payload.id) {
            changedIngredient = [...newAddIngredient.slice(0, i), {
              id: newAddIngredient[i].id,
              status: newAddIngredient[i].status,
              name: action.payload.data,
              count: newAddIngredient[i].count,
              date: newAddIngredient[i].date,
              exp: newAddIngredient[i].exp,
            }, ...newAddIngredient.slice(i + 1)]
          }
        }
      } else if (action.payload.type === 'status') {
        for (let i = 0; i < newAddIngredient.length; i++) {
          if (newAddIngredient[i].id === action.payload.id) {
            changedIngredient = [...newAddIngredient.slice(0, i), {
              id: newAddIngredient[i].id,
              status: action.payload.data,
              name: newAddIngredient[i].name,
              count: newAddIngredient[i].count,
              date: newAddIngredient[i].date,
              exp: newAddIngredient[i].exp,
            }, ...newAddIngredient.slice(i + 1)]
          }
        }
      } else if (action.payload.type === 'exp') {
        for (let i = 0; i < newAddIngredient.length; i++) {
          if (newAddIngredient[i].id === action.payload.id) {
            changedIngredient = [...newAddIngredient.slice(0, i), {
              id: newAddIngredient[i].id,
              status: newAddIngredient[i].status,
              name: newAddIngredient[i].name,
              count: newAddIngredient[i].count,
              date: newAddIngredient[i].date,
              exp: action.payload.data,
            }, ...newAddIngredient.slice(i + 1)]
          }
        }
      }
      else if (action.payload.type === 'count') {
        for (let i = 0; i < newAddIngredient.length; i++) {
          if (newAddIngredient[i].id === action.payload.id) {
            let count = action.payload.data * 1
            changedIngredient = [...newAddIngredient.slice(0, i), {
              id: newAddIngredient[i].id,
              status: newAddIngredient[i].status,
              name: newAddIngredient[i].name,
              count: count,
              date: newAddIngredient[i].date,
              exp: newAddIngredient[i].exp,
            }, ...newAddIngredient.slice(i + 1)]
          }
        }
      }
      return Object.assign({}, state, { addIngredients: changedIngredient })
    case RECIEPT:
      for (var i = state.maxId; i < state.maxId + action.payload.length; i++) {
        var newIngredient = {
          id: i,
          status: '냉장',
          name: action.payload[i - state.maxId],
          count: 0,
          date: 0,
          exp: '',
        }
        newAddIngredient.push(newIngredient)
      }
      return Object.assign({}, state, { addIngredients: newAddIngredient, maxId: state.maxId + action.payload.length })
    case ADDINGREDIENT:
      var newIngredient = {
        id: state.maxId,
        status: '냉장',
        name: '',
        count: 0,
        date: 0,
        exp: '',
      }
      newAddIngredient.push(newIngredient)
      return Object.assign({}, state, { addIngredients: newAddIngredient, maxId: state.maxId + 1 })
    case DELETEINGREDIENT:
      return Object.assign({}, state, {
        addIngredients: newAddIngredient.filter((element: any) => { return element.id !== action.payload })
      })
    case DELETEINGREDIENTALL:
      return Object.assign({}, state, {
        addIngredients: []
      })
    case LIST:
      const ingredient = action.payload;
      const newData: any[] = [];
      ingredient.map((i: any) =>
        newData.push({
          id: i.ingNo,
          name: i.ingName,
          status: i.status,
          count: i.count,
          date: i.restExp,
        }),
      );
      var maxId = 0;
      var yCount = 0;
      var rCount = 0;
      var expIngredients: Array<ingredient> = [];
      for (var element of action.payload) {
        if (element.name === '' || element.count === 0 || element.date < 0) {
          continue;
        }
        expIngredients.push(element);
        maxId = element.id;
      }
      expIngredients.map((element: ingredient) => {
        if (element.date <= 3 && element.date >= 1) {
          yCount = yCount + 1;
        } else if (element.date < 1) {
          rCount = rCount + 1;
        }
      });
      return Object.assign({}, state, {
        yellowFood: yCount,
        redFood: rCount,
        ingredients: newData,
        searchIngredients: newData,
      });
    case SEARCH:
      var searchIngredient: ingredient[] = [];
      ingredients.map((element: ingredient) => {
        if (element.name.includes(action.payload)) {
          searchIngredient.push(element);
        }
      });
      return Object.assign({}, state, { searchIngredients: searchIngredient });
    case MAXID:
      return Object.assign({}, state, { maxId: state.maxId + 1 });
    case ORDER:
      if (action.payload === 'update') {
        var orderByUpdateDateList = Object.assign([], state.searchIngredients);
        orderByUpdateDateList.sort(function (a: ingredient, b: ingredient) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });
        return Object.assign({}, state, {
          searchIngredients: orderByUpdateDateList,
        });
      } else {
        var orderByExperationDateList = Object.assign(
          [],
          state.searchIngredients,
        );
        orderByExperationDateList.sort(function (a: ingredient, b: ingredient) {
          if (a.date > b.date) {
            return 1;
          }
          if (a.date < b.date) {
            return -1;
          }
          return 0;
        });
        return Object.assign({}, state, {
          searchIngredients: orderByExperationDateList,
        });
      }
    default:
      return state;
  }
}

export default refrigerator;
