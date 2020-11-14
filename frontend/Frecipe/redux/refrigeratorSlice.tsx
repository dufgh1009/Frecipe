const LIST = 'refregerator/LIST' as const;
// const ADD = 'refrigerator/ADD' as const;
// const DELETE = 'refrigerator/DELETE' as const;
// const DELETEALL = 'refrigerator/DELETEALL' as const;
const SEARCH = 'refrigerator/SEARCH' as const;
const MAXID = 'refrigerator/MAXID' as const;
const ORDER = 'refrigerator/ORDER' as const;

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
// export const add = (newIns: Array<ingredient>) => ({
//   type: ADD,
//   payload: newIns,
// });
// export const deleteIngredient = (id: number) => ({ type: DELETE, payload: id });
// export const deleteAll = () => ({ type: DELETEALL });
export const search = (keyword: string) => ({ type: SEARCH, payload: keyword });
export const increaseMaxId = () => ({ type: MAXID });
export const order = (filter: string) => ({ type: ORDER, payload: filter });

type Actions =
  //   | ReturnType<typeof add>
  //   | ReturnType<typeof deleteIngredient>
  //   | ReturnType<typeof deleteAll>
  | ReturnType<typeof search>
  | ReturnType<typeof increaseMaxId>
  | ReturnType<typeof order>
  | ReturnType<typeof list>;

type RefrigeratorState = {
  ingredients: Array<ingredient>;
  searchIngredients: Array<ingredient>;
  maxId: number;
  yellowFood: number;
  redFood: number;
};
const initialState: RefrigeratorState = {
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
  switch (action.type) {
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
    // case ADD:
    //   var maxId = 0;
    //   var yCount = 0;
    //   var rCount = 0;
    //   var newIngredients: Array<ingredient> = Object.assign(
    //     [],
    //     state.ingredients,
    //   );
    //   for (var element of action.payload) {
    //     if (element.name === '' || element.count === 0 || element.date < 0) {
    //       continue;
    //     }
    //     newIngredients.push(element);
    //     maxId = element.id;
    //   }
    //   newIngredients.map((element: ingredient) => {
    //     if (element.date <= 3 && element.date >= 1) {
    //       yCount = yCount + 1;
    //     } else if (element.date < 1) {
    //       rCount = rCount + 1;
    //     }
    //   });
    //   return Object.assign({}, state, {
    //     yellowFood: yCount,
    //     redFood: rCount,
    //     maxId: maxId + 1,
    //     ingredients: newIngredients,
    //     searchIngredients: newIngredients,
    //   });
    // case DELETE:
    //   var deleteIngredients: ingredient[] = [];
    //   ingredients.map((element: ingredient) => {
    //     if (element.id != action.payload) {
    //       deleteIngredients.push(element);
    //     }
    //   });
    //   var yCount = 0;
    //   var rCount = 0;
    //   deleteIngredients.map((element: ingredient) => {
    //     if (element.date <= 3 && element.date >= 1) {
    //       yCount = yCount + 1;
    //     } else if (element.date < 1) {
    //       rCount = rCount + 1;
    //     }
    //   });
    //   return Object.assign({}, state, {
    //     ingredients: deleteIngredients,
    //     yellowFood: yCount,
    //     redFood: rCount,
    //     searchIngredients: deleteIngredients,
    //   });
    case SEARCH:
      var searchIngredient: ingredient[] = [];
      ingredients.map((element: ingredient) => {
        if (element.name.includes(action.payload)) {
          searchIngredient.push(element);
        }
      });
      return Object.assign({}, state, { searchIngredients: searchIngredient });
    // case DELETEALL:
    //   return Object.assign({}, state, {
    //     ingredients: [],
    //     searchIngredients: [],
    //     yellowFood: 0,
    //     redFood: 0,
    //     maxId: 0,
    //   });
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
