import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Fab from '@material-ui/core/Fab'

import Add from '@material-ui/icons/Add'
import Search from '@material-ui/icons/Search'
import Settings from '@material-ui/icons/Settings'
import {useLocation} from 'react-router-dom'

import {ModalEnum} from '../../@types/index.d'

import {AppContext} from 'App'
import {toggleModal, searchTextChange} from 'reducers/UserActions'

import styled from 'styled-components'

const StyledGridContainer = styled(Grid)`
  height: 100%;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
`

const StyledGridItem = styled(Grid)`
  padding-top: 30px;
  position: relative;
`
const Title = styled.h1`
  color: #000000;
  font-size: 3rem;
  margin-left: 100px;
`

const StyledFab = styled(Fab)`
  && {
    position: absolute;
    left: 0px;
    bottom: 0px;
    transform: translateY(50%);
  }
  &&.Mui-disabled {
    background-color: #c6c6c6;
  }
`

enum ActiveScreen {
  'userDetail',
  'userList',
}
const UsersList = (): ReactElement => {
  const location = useLocation()
  const [header, setHeader] = useState<ActiveScreen>(ActiveScreen.userList)
  const {dispatch} = useContext(AppContext)

  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname.includes('/user-detail'))
      setHeader(ActiveScreen.userDetail)
    else setHeader(ActiveScreen.userList)
  }, [location])

  const openAddUserModal = useCallback(() => {
    dispatch(toggleModal(ModalEnum.addUser))
  }, [dispatch])

  const onTextChange = useCallback(
    (event) => {
      dispatch(searchTextChange(event.target.value))
    },
    [dispatch],
  )
  return (
    <StyledGridContainer container>
      <Grid item xs={1}></Grid>
      <StyledGridItem
        container
        item
        direction="row"
        justify="space-between"
        alignItems="center"
        xs={10}
      >
        <Title>
          {header === ActiveScreen.userList ? 'Project Access' : 'User Setup'}
        </Title>
        {header === ActiveScreen.userList && (
          <Input
            placeholder={'Type to filter the table'}
            endAdornment={
              <InputAdornment position="end">
                <Search htmlColor={'#000000'} />
              </InputAdornment>
            }
            onChange={onTextChange}
          />
        )}

        <StyledFab
          color={'primary'}
          size={'large'}
          onClick={openAddUserModal}
          disabled={header === ActiveScreen.userDetail}
        >
          {header === ActiveScreen.userList ? (
            <Add htmlColor={'white'} />
          ) : (
            <Settings htmlColor={'white'} />
          )}
        </StyledFab>
      </StyledGridItem>
      <Grid item xs={1} />
    </StyledGridContainer>
  )
}

export default React.memo(UsersList)
