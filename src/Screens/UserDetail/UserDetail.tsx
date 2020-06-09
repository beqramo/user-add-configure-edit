import React, {ReactElement, useMemo} from 'react'
import {Grid} from '@material-ui/core'
import styled from 'styled-components'

import UserInfoColumn from './components/UserInfoColumn'
import UserDetailChangeColumn from './components/UserDetailChangeColumn'
import UserPermissionsColumn from './components/UserPermissionsColumn'
import useUserDetail from './useUserDetail'

const StyledGridContainer = styled(Grid)`
  && {
    margin-top: 4rem;
    height: 100%;
  }
`
const UserDetail = (): ReactElement => {
  const {
    onStatusChange,
    onUserUpdate,
    onPermissionChange,
    onSuperAdminChange,
    user,
  } = useUserDetail()
  return useMemo(
    () => (
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
        <Grid item xs={2} />
        <Grid item xs={4}>
          {!!user && (
            <UserPermissionsColumn
              user={user}
              onPermissionChange={onPermissionChange}
              onSuperAdminChange={onSuperAdminChange}
            />
          )}
        </Grid>
      </StyledGridContainer>
    ),
    [
      onPermissionChange,
      onStatusChange,
      onSuperAdminChange,
      onUserUpdate,
      user,
    ],
  )
}

export default React.memo(UserDetail)
