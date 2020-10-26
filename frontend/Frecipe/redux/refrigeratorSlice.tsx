const ADD = 'refrigerator/ADD' as const;
import { Observable } from 'rxjs/Rx';

export interface ingredient {
  status: string;
  name: string;
  count: number;
  date: number;
}


export const add = (newIns: Array<ingredient>) => ({
  type: ADD,
  payload: newIns
});

type RefrigeratorAction =
  | ReturnType<typeof add>

type RefrigeratorState = {
  ingredients: Array<ingredient>
}
const initialState: RefrigeratorState = {
  ingredients: [
    {
      name: '양파',
      status: '냉동',
      count: 4,
      date: 3,
    },
    {
      name: '소고기',
      status: '냉장',
      count: 10,
      date: 2,
    },
    {
      name: '양파',
      status: '냉동',
      count: 4,
      date: 3,
    },
    {
      name: '소고기',
      status: '냉장',
      count: 10,
      date: 2,
    },
    {
      name: '양파',
      status: '냉동',
      count: 4,
      date: 3,
    },
    {
      name: '소고기',
      status: '냉장',
      count: 10,
      date: 2,
    }
  ]
};

function refrigerator(
  state: RefrigeratorState = initialState,
  action: RefrigeratorAction
): RefrigeratorState {
  switch (action.type) {
    case ADD:
      var newIngredients = Object.assign([], state.ingredients)
      action.payload.forEach(ingredient => {
        newIngredients.push(ingredient);
      })
      return Object.assign({}, state, { ingredients: newIngredients });
    default:
      return state;
  }
}

export default refrigerator;
