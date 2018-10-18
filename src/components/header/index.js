import React from 'react'
import {Segment, Button} from 'semantic-ui-react'
// import {
//     receiveUserData,
//     receiveClan,
//     receiveClanMembers
// } from '../../actions'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class AppHeader extends React.Component {
    render() {
        const {user, clan} = this.props
        const {name} = user
        const {clanName} = clan

        return (
            <Segment.Group horizontal inverted>
                <Segment textAlign="left">
                    Welcome, {name}
                </Segment>
                <Segment textAlign="center">
                    {clanName}
                </Segment>
                <Segment textAlign="right">
                    <Button inverted color="red">
                        Log out
                    </Button>
                </Segment>
            </Segment.Group>
        )

    }
}

const mapStateToProps = ({ user, clan }) => ({
    user,
    clan
})

export default connect(mapStateToProps)(AppHeader)