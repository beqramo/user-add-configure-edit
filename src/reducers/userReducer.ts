import {UserActions, UserAction} from './UserActions'
import {AppState, ModalEnum} from '../@types/index.d'

export const initialState: AppState = {
  users: [],
  modalType: ModalEnum.none,
}

function userReducer(
  state: AppState = initialState,
  {type, payload}: UserAction,
): AppState {
  switch (type) {
    case UserActions.LOAD_USERS:
      return {
        ...state,
        users: payload,
      }
    case UserActions.DELETE_USER: {
      const users = state.users
        .slice(0, payload)
        .concat(state.users.slice(payload + 1, state.users.length))
      return {
        ...state,
        users,
      }
    }

    case UserActions.DISABLE_USER: {
      const users = [...state.users]

      users[payload].active = !users[payload].active
      return {
        ...state,
        users,
      }
    }
    case UserActions.SHOW_MODAL: {
      return {
        ...state,
        modalType: payload,
      }
    }

    default:
      return state
  }
}

export default userReducer
