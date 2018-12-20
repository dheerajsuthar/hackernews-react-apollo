import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Login from './Login';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'


class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div>
          <Switch>
            <Route exact path="/" component={LinkList}></Route>
            <Route exact path="/submit" component={CreateLink}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </div>
      </div>)
  }
}

export default App