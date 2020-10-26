// import { Observable } from 'rxjs/Rx';
const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

export const login = (token: string) => ({ type: LOGIN, payload: token });
export const logout = () => ({ type: LOGOUT });

type UserAction = ReturnType<typeof login> | ReturnType<typeof logout>;

type UserState = {
  isLogin: boolean;
  token: string | null;
};

const initialState: UserState = {
  isLogin: false,
  token: null,
};

export default function user(
  state: UserState = initialState,
  action: UserAction,
): UserState {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true, token: action.payload };
    case LOGOUT:
      return { isLogin: false, token: null };
    default:
      return state;
  }
}
