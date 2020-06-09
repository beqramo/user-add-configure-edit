import {data} from '../users.json'
import {v4 as uuidv4} from 'uuid'
import {get} from 'local-storage'

import defaultPermissions from '../defaultPermissions.json'
import {
  User,
  ModalEnum,
  AddUserFormData,
  UpdateUserFormData,
} from '../@types/index.d'

export enum UserActions {
  LOAD_USERS,
  DELETE_USER,
  DISABLE_USER,
  ADD_USER,
  SHOW_MODAL,
  UPDATE_USER,
  PERMISSION_CHANGE,
  SUPER_ADMIN_CHANGE,
  SEARCH_TEXT_CHANGE,
}
type LoadActionUsers = {
  type: UserActions.LOAD_USERS
  payload: User[]
}

export const loadUsersAction = (): LoadActionUsers => {
  let users: User[] = JSON.parse(get('users')) ?? []
  return {
    type: UserActions.LOAD_USERS,
    payload: users,
    // payload: data,
  }
}

type DeleteActionUser = {
  type: UserActions.DELETE_USER
  payload: string
}

export const deleteUserAction = (id: string): DeleteActionUser => {
  return {
    type: UserActions.DELETE_USER,
    payload: id,
  }
}

type DisableUser = {
  type: UserActions.DISABLE_USER
  payload: string
}

export const disableUserAction = (id: string): DisableUser => {
  return {
    type: UserActions.DISABLE_USER,
    payload: id,
  }
}

type AddUser = {
  type: UserActions.ADD_USER
  payload: User
}

export const addUserAction = ({
  admin,
  ...formData
}: AddUserFormData): AddUser => {
  let user: User = {
    id: uuidv4(),
    ...formData,
    ...defaultPermissions,
    active: true,
    admin: !!admin,
  }
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
type UpdateUser = {
  type: UserActions.UPDATE_USER
  payload: {
    id: string
    data: UpdateUserFormData
  }
}

export const updateUserAction = (payload: {
  id: string
  data: UpdateUserFormData
}): UpdateUser => {
  return {
    type: UserActions.UPDATE_USER,
    payload,
  }
}

type PermissionChange = {
  type: UserActions.PERMISSION_CHANGE
  payload: {
    id: string
    permissionId: number
    permissionGroupId: number
  }
}

export const permissionChangeAction = (payload: {
  id: string
  permissionId: number
  permissionGroupId: number
}): PermissionChange => {
  return {
    type: UserActions.PERMISSION_CHANGE,
    payload,
  }
}

type SuperAdminChange = {
  type: UserActions.SUPER_ADMIN_CHANGE
  payload: string
}

export const superAdminChangeAction = (id: string): SuperAdminChange => {
  return {
    type: UserActions.SUPER_ADMIN_CHANGE,
    payload: id,
  }
}
type SearchTextChange = {
  type: UserActions.SEARCH_TEXT_CHANGE
  payload: string
}

export const searchTextChange = (text: string): SearchTextChange => {
  return {
    type: UserActions.SEARCH_TEXT_CHANGE,
    payload: text,
  }
}

export type UserAction = {type: UserActions; payload: any}
