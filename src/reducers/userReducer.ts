import {UserActions, UserAction} from './UserActions'
import {AppState, ModalEnum} from '../@types/index.d'

export const initialState: AppState = {
  users: [],
  modalType: ModalEnum.none,
  searchText: '',
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
    case UserActions.PERMISSION_CHANGE: {
      const index = state.users.findIndex((val) => val.id === payload.id)
      const users = [...state.users]
      const user = users[index]
      const permissionGroupIndex = user.permissionsGroups.findIndex(
        (val) => val.id === payload.permissionGroupId,
      )
      const permissionsGroup = user.permissionsGroups[permissionGroupIndex]

      //determine if it is from permission group
      if (payload.permissionId === -1) {
        user.permissionsGroups[
          permissionGroupIndex
        ].enabled = !permissionsGroup.enabled

        const allDisabled = user.permissionsGroups[
          permissionGroupIndex
        ].permissions.find((val) => val.enabled)

        if (!allDisabled) {
          let permissions = user.permissionsGroups[
            permissionGroupIndex
          ].permissions.map((val) => {
            val.enabled = true
            return val
          })
          user.permissionsGroups[permissionGroupIndex].permissions = permissions
        }
      } else {
        const permissions = permissionsGroup.permissions

        const permissionIndex = permissions.findIndex(
          (val) => val.id === payload.permissionId,
        )
        const permission = permissions[permissionIndex]

        permission.enabled = !permission.enabled

        user.permissionsGroups[permissionGroupIndex].permissions[
          permissionIndex
        ] = permission

        const allDisabled = user.permissionsGroups[
          permissionGroupIndex
        ].permissions.find((val) => val.enabled)
        //disable/enable main group switch according to permission status
        if (!allDisabled) {
          user.permissionsGroups[permissionGroupIndex].enabled = false
        } else {
          user.permissionsGroups[permissionGroupIndex].enabled = true
        }
      }
      users[index] = user

      return {
        ...state,
        users,
      }
    }
    case UserActions.SUPER_ADMIN_CHANGE: {
      const index = state.users.findIndex((val) => val.id === payload)

      const users = [...state.users]

      users[index].superAdmin = !users[index].superAdmin
      return {
        ...state,
        users,
      }
    }
    case UserActions.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: payload,
      }
    }
    default:
      return state
  }
}

export default userReducer
