import {data} from '../users.json'
import {User, ModalEnum} from '../@types/index.d'

export enum UserActions {
  LOAD_USERS,
  DELETE_USER,
  DISABLE_USER,
  ADD_USER,
  SHOW_MODAL,
}
type LoadActionUsers = {
  type: UserActions.LOAD_USERS
  payload: User[]
}

export const loadUsersAction = (): LoadActionUsers => {
  return {
    type: UserActions.LOAD_USERS,
    payload: data,
  }
}

type DeleteActionUser = {
  type: UserActions.DELETE_USER
  payload: number
}

export const deleteUserAction = (index: number): DeleteActionUser => {
  return {
    type: UserActions.DELETE_USER,
    payload: index,
  }
}

type DisableUser = {
  type: UserActions.DISABLE_USER
  payload: number
}

export const disableUserAction = (index: number): DisableUser => {
  return {
    type: UserActions.DISABLE_USER,
    payload: index,
  }
}

type AddUser = {
  type: UserActions.ADD_USER
  payload: User
}

export const addUserAction = (user: User): AddUser => {
  return {
    type: UserActions.ADD_USER,
    payload: user,
  }
}

type ToggleModal = {
  type: UserActions.SHOW_MODAL
  payload: ModalEnum
}

export const toggleModal = (
  payload: ModalEnum = ModalEnum.none,
): ToggleModal => {
  return {
    type: UserActions.SHOW_MODAL,
    payload,
  }
}

export type UserAction = {type: UserActions; payload: any}
