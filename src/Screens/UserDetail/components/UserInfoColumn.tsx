import React, {ReactElement} from 'react'

import {Grid, Button, Typography} from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import styled from 'styled-components'
import {User} from '@types'

const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlinedIcon)`
  && {
    width: 100%;
    height: 27%;
  }
`

const StyledButton = styled(Button)<{backgroundColor: string}>`
  && {
    border-radius: 100px;
    height: 60px;
    font-weight: bold;
    background-color: ${(props) => props.backgroundColor};
    width: 100%;
    color: white;
    text-transform: capitalize;
  }
`

const AvatarUploadTitle = styled.p`
  margin-top: 1rem;
  text-align: left;
  font-size: 0.8rem;
  letter-spacing: 0px;
  color: #b0acac;
  text-transform: uppercase;
  opacity: 1;
`

const UserInfoColumn = ({user}: {user: User | undefined}): ReactElement => {
  return (
    <>
      <StyledAccountCircleOutlinedIcon />
      <Grid
        container
        justify={'space-between'}
        alignItems={'center'}
        direction={'column'}
      >
        <AvatarUploadTitle>upload a photo</AvatarUploadTitle>

        <Typography variant={'h3'} noWrap={false}>
          {user?.name}
        </Typography>
        <Typography variant={'h3'} noWrap={false}>
          {user?.surname}
        </Typography>
        <Typography variant={'body2'} noWrap={false} style={{margin: '2rem 0'}}>
          {user?.email}
        </Typography>

        <StyledButton
          variant={'contained'}
          color="primary"
          backgroundColor={'#7E7EF1'}
        >
          Resend the invite
        </StyledButton>
      </Grid>
    </>
  )
}

export default React.memo(UserInfoColumn)
