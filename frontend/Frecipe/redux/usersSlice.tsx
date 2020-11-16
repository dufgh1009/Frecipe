// import { Observable } from 'rxjs/Rx';
const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;
const UPDATE = 'user/UPDATE' as const;

interface User {
  token: string;
  userNo: number;
  username: string;
  nickname: string;
  phone: string;
  img: string | null;
}

export const login = (form: User) => ({ type: LOGIN, payload: form });
export const logout = () => ({ type: LOGOUT });
export const update = (form: User) => ({ type: UPDATE, payload: form });

type UserAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof update>;

type UserState = {
  isLogin: boolean;
  token: string | null;
  userNo: number | null;
  username: string | null;
  nickname: string | null;
  phone: string | null;
  img: string | null;
};

const initialState: UserState = {
  isLogin: false,
  token: null,
  userNo: null,
  username: null,
  nickname: null,
  phone: null,
  img: null,
};

export default function user(
  state: UserState = initialState,
  action: UserAction,
): UserState {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: true,
        token: action.payload.token,
        userNo: action.payload.userNo,
        username: action.payload.username,
        nickname: action.payload.nickname,
        phone: action.payload.phone,
        img: action.payload.img,
      };
    case LOGOUT:
      return {
        isLogin: false,
        token: null,
        userNo: null,
        username: null,
        nickname: null,
        phone: null,
        img: null,
      };
    case UPDATE:
      return Object.assign({}, state, {
        nickname: action.payload.nickname,
        phone: action.payload.phone,
        img: action.payload.img,
      });
    default:
      return state;
  }
}
