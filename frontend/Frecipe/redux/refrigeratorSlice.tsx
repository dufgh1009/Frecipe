const ADD = 'refrigerator/ADD' as const;
const DELETE = 'refrigerator/DELETE' as const;

export interface ingredient {
  id: number;
  status: string;
  name: string;
  count: number;
  date: number;
}


export const add = (newIns: Array<ingredient>) => ({ type: ADD, payload: newIns });
export const deleteAll = () => ({ type: DELETE });


type Actions = ReturnType<typeof add> | ReturnType<typeof deleteAll>;

type RefrigeratorState = {
  ingredients: Array<ingredient>,
  maxId: number,
  yellowFood: number,
  redFood: number,
  orderedIngredients: Array<ingredient>
}
const initialState: RefrigeratorState = {
  ingredients: [],
  maxId: 0,
  yellowFood: 0,
  redFood: 0,
  orderedIngredients: []
};

function refrigerator(
  state: RefrigeratorState = initialState,
  action: Actions
): RefrigeratorState {
  switch (action.type) {
    case ADD:
      var newIngredients = Object.assign([], state.ingredients)
      var maxId = 0
      var yCount = 0
      var rCount = 0
      for (var element of action.payload) {
        newIngredients.push(element);
        maxId = element.id
      }

      newIngredients.map((element: ingredient) => {
        if (element.date <= 3 && element.date >= 1) {
          yCount = yCount + 1
        } else if (element.date < 1) {
          rCount = rCount + 1
        }
      })

      var orderByExperationDateList = Object.assign([], newIngredients)
      orderByExperationDateList.sort(function (a: ingredient, b: ingredient) {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      });
      return Object.assign({}, state, { orderedIngredients: orderByExperationDateList, yellowFood: yCount, redFood: rCount, maxId: maxId, ingredients: newIngredients });
    case DELETE:
      const deleteIngredients: ingredient[] = []
      return Object.assign({}, state, { orderedIngredients: deleteIngredients, yellowFood: 0, redFood: 0, maxId: 0, ingredients: deleteIngredients });
    default:
      return state;
  }
}

export default refrigerator;
