import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useLocation} from 'react-router-dom'
import {Grid, Typography, Input, InputAdornment, Fab} from '@material-ui/core'
import {Add, Search} from '@material-ui/icons'
import {AppContext} from 'App'
import {toggleModal} from 'reducers/UserActions'
import {ModalEnum} from '../../@types/index.d'

const useStyles = makeStyles({
  root: {
    height: 211,
    width: '100%',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #00000029',
  },
  headerTextContainer: {
    paddingTop: 30,
    position: 'relative',
  },
  title: {
    textAlign: 'left',
    font: 'Semibold 36px/48px Segoe UI',
    fontSize: 36,
    fontWeight: 400,
    letterSpacing: 0,
    color: '#000000',
    marginLeft: 100,
  },
  fab: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    transform: 'translateY(50%)',
  },
})

enum ActiveScreen {
  'userDetail',
  'userList',
}
const UsersList = (): ReactElement => {
  const location = useLocation()
  const classes = useStyles()
  const [header, setHeader] = useState<ActiveScreen>(ActiveScreen.userList)
  const {
    state: {modalType},
    dispatch,
  } = useContext(AppContext)

  useEffect(
    useCallback(() => {
      console.log(location.pathname)
      if (location.pathname === 'user-detail')
        setHeader(ActiveScreen.userDetail)
      else setHeader(ActiveScreen.userList)
    }, [location]),
    [location],
  )

  const openAddUserModal = useCallback(() => {
    dispatch(toggleModal(ModalEnum.addUser))
  }, [dispatch])

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}></Grid>
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        alignItems="center"
        xs={10}
        className={classes.headerTextContainer}
      >
        <Typography className={classes.title}>Project Access</Typography>
        <Input
          placeholder={'Type to filter the table'}
          endAdornment={
            <InputAdornment position="end">
              <Search htmlColor={'#000000'} />
            </InputAdornment>
          }
        />

        <Fab
          color={'primary'}
          className={classes.fab}
          size={'large'}
          onClick={openAddUserModal}
        >
          <Add htmlColor={'white'} />
        </Fab>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

export default React.memo(UsersList)
