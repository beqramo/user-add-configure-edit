export type User = {
  id: string
  name: string
  surname: string
  email: string
  admin: boolean
  active: boolean
  superAdmin: boolean
  permissionsGroups: PermissionsGroup[]
}

export type PermissionsGroup = {
  id: number
  permissionGroupName: string
  permissions: Permission[]
  enabled: boolean
}

export type Permission = {
  id: number
  permission: string
  enabled: boolean
}

export type AppState = {
  users: User[]
  modalType: ModalEnum
  searchText: string
}

export enum ModalEnum {
  none,
  addUser,
}

export type Action = {
  type: string
  payload: any
}

export type TableData = {
  id: number
  fullName: string
  admin: boolean
  active: boolean
}

export type AddUserFormData = {
  name: string
  surname: string
  email: string
  admin: number
}

export type UpdateUserFormData = Omit<AddUserFormData, 'email'>
