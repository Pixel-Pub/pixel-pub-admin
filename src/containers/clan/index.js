import React from 'react'
import { Container, Segment} from 'semantic-ui-react'
import { receiveUserData,
  receiveClan,
  receiveClanMembers
} from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { history } from '../../store'
import Header from '../../components/header'
import MemberList from '../../components/memberList'

class Clan extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fetched: false
    }
  }

  componentWillMount() {
    const {auth} = this.props

    if (!auth) {
      history.push('/')
    }

    this
      .fetchUser()
      .then(() => this.setState({fetched: true}))
  }

  async fetchUser() {
    const {auth}         = this.props
    const {membershipId} = auth

    const response = await fetch(`/api/member/${membershipId}`)

    try {
      const {
        displayName,
        type,
        clan
      } = await response.json()
  
      const {
        id,
        founder,
        detail
      } = clan

      const {name, memberCount} = detail

      const results = await fetch(`/api/clan/${id}/member`)
      const members = await results.json()

      this.props.receiveClan({clanId: id, clanName: name, founder, memberCount})
      this.props.receiveUserData({name: displayName, id: membershipId, type})
      this.props.receiveClanMembers({members})

      return Promise.resolve()
    } catch (e) {
      alert('You Dun Goofd')
    }
  }

  render() {
    if (this.state.fetched === false) {
      return null
    }
  
    return (
      <Container>
        <Header />
        <Segment inverted color="grey">
          <MemberList />
          {JSON.stringify(this.props)}
        </Segment>
      </Container>
    )
  }
}


const mapStateToProps = ({ auth, user, clan }) => ({
  auth,
  user,
  clan
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      receiveUserData,
      receiveClan,
      receiveClanMembers
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Clan)
