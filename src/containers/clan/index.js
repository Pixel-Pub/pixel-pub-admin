import React from 'react'
import { Container, Segment} from 'semantic-ui-react'
import { receiveUserData,
  receiveClan,
  receiveClanMembers
} from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { history } from '../../store'


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
        name,
        founder
      } = clan
  
      this.props.receiveClan({clanId: groupId, clanName: name, founder}),
      this.props.receiveUserData({name: displayName, id: membershipId, type})
    } catch (e) {
      alert('You Dun Goofd')
    }
  }

  render() {
    return JSON.stringify(this.props)
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
