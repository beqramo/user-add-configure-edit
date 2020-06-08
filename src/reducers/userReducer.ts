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
      const index = state.users.findIndex((val) => val.id === payload)
      const users = state.users
        .slice(0, index)
        .concat(state.users.slice(index + 1, state.users.length))
      return {
        ...state,
        users,
      }
    }

    case UserActions.DISABLE_USER: {
      const index = state.users.findIndex((val) => val.id === payload)

      const users = [...state.users]

      users[index].active = !users[index].active
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
    case UserActions.ADD_USER: {
      return {
        ...state,
        users: [payload, ...state.users],
        modalType: ModalEnum.none,
      }
    }
    case UserActions.UPDATE_USER: {
      const index = state.users.findIndex((val) => val.id === payload.id)
      const users = [...state.users]

      users[index] = {...users[index], ...payload.data, admin: !!payload.admin}
      return {
        ...state,
        users,
      }
    }

    default:
      return state
  }
}

export default userReducer
