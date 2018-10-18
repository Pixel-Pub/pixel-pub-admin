import React from 'react';
import Sender from './sender'
import {Segment, Header, Button} from 'semantic-ui-react'
import {history} from '../../store'
import Loader from '../../components/loader'
import {getCookie} from '../../utils/cookie'

class Landing extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            validCookie: false,
            processing: false
        }
    }

    componentWillMount() {
        // before we mount, if we have a pxp auth cookie, let's go verify it
        const cookie = getCookie()

        if (cookie && Object.keys(cookie).length > 0) {
            this.setState({processing: true})
            const parsedCookie = JSON.parse(cookie)

            this
                .validateCookie(parsedCookie)
                .then((res) => this.setState({validCookie: res, processing: false}))
                .catch((e) => this.setState({validCookie: false, processing: false}))
        }
    }

    async validateCookie(cookie) {
        const accessToken = cookie.access_token
        const refreshToken = cookie.refresh_token

        const raw = await fetch('/api/util/validateAuth', {
            headers: {
                'BUNGIE-ACCESS-TOKEN': accessToken,
                'BUNGIE-REFRESH-TOKEN': refreshToken
            }
        })

        const response = await raw.json()

        return response && response.result
    }

    componentDidUpdate() {
        if (this.state.validCookie === true) {
            history.push('/clan')
        }
    }

    render() {
        const {url} = this.props

        if (this.state.processing === true) {
            return (<Segment>
                <Loader />
            </Segment>)
        }
        return (<Segment textAlign="center">
            <Header as="h1" color="red">
                No session has been detected
            </Header>
            <Segment color="red" inverted textAlign="center">

                <Header as="h2">
                    PLEASE LOG IN WITH A VALID WRATH INCARNATE ADMIN ACCOUNT
                </Header>

                <p>
                    You will be redirected to bungie to authorize with your current account, it is suggested you log out and log in with a WIN account
                </p>
                <p>
                    Press the button below whenever you're ready, you damned potato.
                </p>
                
            </Segment>
            <Button
                as="a"
                href={url}
                fluid
                color="black"
            >
                Authorize me, Cap'n
            </Button>
        </Segment>)
    }
}

export default () => <Sender component={Landing} />