import React from 'react'
import { Container } from 'semantic-ui-react'
import Landing from '../landing'
import Success from '../success'
import Clan from '../clan'
import { Route } from 'react-router-dom'
import ClanList from '../clanList'
import ClanListAdmin from '../clanListAdmin'
import ClanAdmin from '../clanAdmin'

class App extends React.Component {
  render() {
    return (
      <Container className="App">
        <Container as="main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/clanlist" component={ClanList} />
          <Route exact path="/clanlist/admin" component={ClanListAdmin} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/clan" component={Clan} />
          <Route exact path="/clan/stats/:id" component={ClanAdmin} />
        </Container>
      </Container>
    )
  }
}

export default App
