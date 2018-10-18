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
                <Segment invertedtextAlign="left">
                    Welcome, {name}
                </Segment>
                <Segment invertedtextAlign="center">
                    {clanName}
                </Segment>
                <Segment inverted textAlign="right">
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