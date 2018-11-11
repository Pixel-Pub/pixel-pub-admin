import React from 'react'
import { Container, Segment, Select, Radio} from 'semantic-ui-react'
import { receiveClanListMembers } from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MemberList from '../../components/memberList'
import moment from 'moment'

const INACTIVE_PERIODS = [
  {text: 'Default (30)', value: 30},
  {text: 'Aggressive (20)', value: 20},
  {text: 'Permissive (45)', value: 45}
]

class ClanAdmin extends React.Component {
  state = {
    fetched: false,
    inactiveOnly: true,
    inactivePeriod: 30
  }

  componentWillMount() {
    const {id} = this.props.match.params
    const {members} = this.props

    if (members) {
      return this.setState({fetched: true})
    }

    fetch(`/api/clan/${id}/member`)
      .then((data) => data.json())
      .then((members) => this.props.receiveClanListMembers({clanId: id, members}))
  }

  render() {
    const {state, inactiveOnly, inactivePeriod} = this.state

    if (fetched === false) {
      return null
    }
  
    let memberList = [...this.props.members]

    if (inactiveOnly === true) {
      const current = new moment()

      memberList = memberList.filter(({updated_at}) => {
        const lastSeen = new moment(updated_at)

        return current.diff(lastSeen, 'days') >= inactivePeriod
      })
    }
    return (
      <Container>
        <Segment.Group horizontal inverted color="grey">
          <Segment>
            View Only Inactive Members?
            <Radio toggle onChange={() => this.setState({inactiveOnly: !inactiveOnly})} />
          </Segment>
          <Segment>
            Inactive Period? (30 is default)
            <Select options={INACTIVE_PERIODS} onChange={(e) => this.setState({inactivePeriod: e.target.value})} />
          </Segment>
        </Segment.Group>
        <Segment inverted color="grey">
          <MemberList members={memberList} />
        </Segment>
      </Container>
    )
  }
}


const mapStateToProps = ({clanList}, props) => ({
  members: clanList[props.match.params.id] || []
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      receiveClanListMembers
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ClanAdmin)
