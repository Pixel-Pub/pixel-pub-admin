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

class Clan extends React.Component {
  componentWillMount() {
    const {auth} = this.props

    if (!auth) {
      history.push('/')
    }

    this.fetchUser()
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
        groupId,
        founder,
        details
      } = clan
  
      const {name, memberCount} = details

      this.props.receiveClan({clanId: groupId, clanName: name, founder, memberCount})
      this.props.receiveUserData({name: displayName, id: membershipId, type})
    } catch (e) {
      alert('You Dun Goofd')
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Segment>
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
