// import { Observable } from 'rxjs/Rx';
const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;
const DETAIL = 'user/DETAIL' as const;

interface Login {
  token: string;
  userNo: number;
  username: string;
  nickname: string;
  phone: string;
  img: string | null;
}

export const login = (form: Login) => ({ type: LOGIN, payload: form });
export const logout = () => ({ type: LOGOUT });

type UserAction = ReturnType<typeof login> | ReturnType<typeof logout>;

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
    default:
      return state;
  }
}
