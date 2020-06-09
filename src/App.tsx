import React, {
  ReactElement,
  Suspense,
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useCallback,
} from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styled from 'styled-components'
import {set} from 'local-storage'

import './App.css'
import {UsersList, UserDetail} from 'Screens'
import {Header} from 'Components'
import {Grid, CssBaseline, CircularProgress} from '@material-ui/core'
import userReducer, {initialState} from 'reducers/userReducer'
import {loadUsersAction, UserAction} from 'reducers/UserActions'
import {AppState} from './@types/index.d'

/*
 * Sorry for Styles, I had no time to make it perfect
 * and also it was a first time when I use Material UI
 */
const MainDiv = styled.div`
  background-color: #f3f3f3;
  min-height: 100vh;
  width: 100vw;
`
export const AppContext = createContext<{
  state: AppState
  dispatch: Dispatch<UserAction>
}>({state: initialState, dispatch: () => null})

export const AppContextProvider = AppContext.Provider

export const AppContextConsumer = AppContext.Consumer

function App(): ReactElement {
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    dispatch(loadUsersAction())
  }, [])

  const handleWindowClose = useCallback(
    (e) => {
      set('users', JSON.stringify(state.users))
    },
    [state.users],
  )

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose)
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
    }
  }, [handleWindowClose])

  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <MainDiv>
        <CssBaseline />
        <AppContextProvider value={{state, dispatch}}>
          <Router>
            <Grid container style={{height: '100%'}}>
              <Grid item xs={12} style={{height: '20%'}}>
                <Header />
              </Grid>
              <Grid container xs={12} item style={{height: '80%'}}>
                <Grid xs={1} item />
                <Grid item xs={10}>
                  <Switch>
                    <Route exact path={'/'}>
                      <UsersList />
                    </Route>
                    <Route path={`/user-detail/:userId`}>
                      <UserDetail />
                    </Route>
                  </Switch>
                </Grid>
                <Grid xs={1} item />
              </Grid>
            </Grid>
          </Router>
        </AppContextProvider>
      </MainDiv>
    </Suspense>
  )
}

export default App
