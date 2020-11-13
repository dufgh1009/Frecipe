const CHANGE_CAMERA = "changeCamera" as const

export const changeCamera = (status: string, index: number) => ({ type: CHANGE_CAMERA, payload: { status, index } });

type Actions =
  | ReturnType<typeof changeCamera>;

type CameraState = {
  status: string,
  index: number,
}

const initialState: CameraState = {
  status: 'refrigerator',
  index: 0,
}


function cameraReducer(
  state: CameraState = initialState,
  action: Actions,
): CameraState {
  switch (action.type) {
    case CHANGE_CAMERA:
      return Object.assign({}, state, { status: action.payload.status, index: action.payload.index })
    default:
      return state
  }
}


export default cameraReducer;