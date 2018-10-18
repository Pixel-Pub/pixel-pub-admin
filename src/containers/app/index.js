import React from 'react'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  render() {
    <Container className="App">
      <Container as="main">
        <Route exact path="/" component={Landing} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/clan" component={fuck} />
      </Container>
    </Container>
  }
}

export default App
