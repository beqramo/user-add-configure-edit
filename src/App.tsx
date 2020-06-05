import React, {ReactElement} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import './App.css'

// I assume that entire application  is this,
// so I won't use some heavy libs and state managment system
// (there is no need to use something, hooks can handle everything)

function App(): ReactElement {
  return <Router></Router>
}

export default App
