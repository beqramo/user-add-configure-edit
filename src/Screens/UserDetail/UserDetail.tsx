import React, {
  ReactElement,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import {Grid, Button, Typography} from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import {AppContext} from 'App'
import {User, UpdateUserFormData} from '@types'
import UserInfoColumn from './components/UserInfoColumn'
import UserDetailChangeColumn from './components/UserDetailChangeColumn'
import {disableUserAction, updateUserAction} from 'reducers/UserActions'

const StyledGridContainer = styled(Grid)`
  && {
    margin-top: 4rem;
    height: 100%;
  }
`
const UserDetail = (): ReactElement => {
  const {state, dispatch} = useContext(AppContext)
  const [user, setUser] = useState<User>()
  const {userId} = useParams()
  useEffect(() => {
    let user = state.users.find((val) => val.id === userId)
    user && setUser({...user})
  }, [state.users, userId])

  const onStatusChange = useCallback(
    (id: string) => dispatch(disableUserAction(id)),
    [dispatch],
  )
  const onUserUpdate = useCallback(
    (id: string) => (data: UpdateUserFormData) =>
      dispatch(updateUserAction({id, data})),
    [dispatch],
  )
  return (
    <StyledGridContainer container direction={'row'}>
      <Grid item xs={2}>
        <UserInfoColumn user={user} />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={3}>
        {!!user && (
          <UserDetailChangeColumn
            user={user}
            onUserUpdate={onUserUpdate}
            onStatusChange={onStatusChange}
          />
        )}
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={5}></Grid>
    </StyledGridContainer>
  )
}

export default React.memo(UserDetail)
