import {useContext, useEffect, useState, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {User, UpdateUserFormData} from '@types'

import {
  disableUserAction,
  updateUserAction,
  permissionChangeAction,
  superAdminChangeAction,
} from 'reducers/UserActions'
import {AppContext} from 'App'

const useUserDetail = () => {
  const {state, dispatch} = useContext(AppContext)
  const [user, setUser] = useState<User>()
  const {userId} = useParams()
  const history = useHistory()

  useEffect(() => {
    let user = state.users.find((val) => val.id === userId)
    user && setUser({...user})
  }, [state.users, userId])

  const onStatusChange = useCallback(
    (id: string) => dispatch(disableUserAction(id)),
    [dispatch],
  )
  const onUserUpdate = useCallback(
    (id: string) => (data: UpdateUserFormData) => {
      dispatch(updateUserAction({id, data}))
      history.goBack()
    },
    [dispatch, history],
  )
  const onPermissionChange = useCallback(
    (permissionGroupId: number, permissionId: number = -1) =>
      user &&
      dispatch(
        permissionChangeAction({id: user.id, permissionGroupId, permissionId}),
      ),
    [dispatch, user],
  )

  const onSuperAdminChange = useCallback(
    () => user && dispatch(superAdminChangeAction(user.id)),
    [dispatch, user],
  )

  return {
    onStatusChange,
    onUserUpdate,
    onPermissionChange,
    onSuperAdminChange,
    user,
  }
}

export default useUserDetail
