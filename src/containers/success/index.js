import React from 'react';
import Receiver from './receiver'
import {Segment, Header} from 'semantic-ui-react'

const Landing = ({processing, state, error}) => (
    <Segment textAlign="center">
        {processing && (
            <Header as="h1">
                Authorizing, hold on to your horses
            </Header>
        )}
        {error && (
            <Segment inverted color="red">
                {console.log(error)}
                <Header as="h1">We Goofed</Header>
                <p>Error returned: {error.message}</p>
                <p>Full Error Info: {JSON.stringify(error)}</p>
            </Segment>
        )}
    </Segment>
)

export default () => <Receiver component={Landing} />