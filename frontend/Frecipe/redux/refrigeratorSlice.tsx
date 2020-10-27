const ADD = 'refrigerator/ADD';

export interface ingredient {
  status: string;
  name: string;
  count: number;
  date: number;
}


export const actions = {
  add: (newIns: Array<ingredient>) => ({ type: ADD, payload: newIns }),
};

type AddAction = ReturnType<typeof actions.add>;
type Actions = AddAction;

type RefrigeratorState = {
  ingredients: Array<ingredient>
}
const initialState: RefrigeratorState = {
  ingredients: [
  ]
};

function refrigerator(
  state: RefrigeratorState = initialState,
  action: Actions
): RefrigeratorState {
  switch (action.type) {
    case ADD:
      var newIngredients = Object.assign([], state.ingredients)
      for (var element of action.payload) {
        newIngredients.push(element);
      }
      return Object.assign({}, state, { ingredients: newIngredients });
    default:
      return state;
  }
}

export default refrigerator;
