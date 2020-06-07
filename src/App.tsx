import React, {
  ReactElement,
  Suspense,
  createContext,
  useReducer,
  Dispatch,
  useEffect,
} from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styled from 'styled-components'

import './App.css'
import {UsersList} from 'Screens'
import {Header} from 'Components'
import {Grid, CssBaseline, CircularProgress} from '@material-ui/core'
import userReducer, {initialState} from 'reducers/userReducer'
import {loadUsersAction, UserAction} from 'reducers/UserActions'
import {AppState} from './@types/index.d'

// I assume that entire application  is this,
// so I won't use some heavy libs and state managment system
// (there is no need to use something, hooks can handle everything)

const MainDiv = styled.div`
  background-color: #f3f3f3;
  height: 100vh;
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

  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <MainDiv>
        <CssBaseline />
        <AppContextProvider value={{state, dispatch}}>
          <Router>
            <Grid container>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid container xs={12} item>
                <Grid xs={1} item />
                <Grid item xs={10}>
                  <Switch>
                    <Route exact path={'/'}>
                      <UsersList />
                    </Route>
                    <Route path={`user-detail/:userId`}>
                      <h3>Please select a topic.</h3>
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
