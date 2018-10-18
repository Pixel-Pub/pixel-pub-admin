import React, { Component } from 'react';
import { OauthReceiver } from 'react-oauth-flow'
import {history} from '../../store'
import ENV from '../../env'
import qs from 'qs'
import { receiveAuthData } from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const CLIENT_AUTH = btoa(`${ENV.CLIENT_ID}:${ENV.CLIENT_SECRET}`)
const TOKEN_ARGS  = {
  method: 'POST',
  headers: {
    'X-API-KEY'    : ENV.API_KEY,
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${CLIENT_AUTH}`
  }
}

class Receiever extends Component {
  handleSuccess = async (accessToken, { response }) => {
    console.log('Successfully authorized');

    const data = await response.json();
    const {refresh_token, access_token, membership_id} = data

    this.props.receiveAuthData({
      refreshToken : refresh_token,
      accessToken  : access_token,
      membershipId : membership_id
    })

    document.cookie = `PXPAUTHCLAN=${JSON.stringify(data)}`

    history.push('/clan')
  }

  handleError = error => {
    console.error('An error occured', error);
    console.error(error.message);
  };
 
  tokenFn = (url) => {
    const urlParts = url.split('?');
    const base = urlParts[0]
    const query = urlParts[1];
    const params = qs.parse(query)
    const fetchUrl = `${base}?grant_type=authorization_code&code=${params.code}`

    return fetch(fetchUrl, {
      ...TOKEN_ARGS,
      body: fetchUrl.split('?').pop()
    })
  }

  render() {
    return (
      <OauthReceiver
        tokenUrl={'https://www.bungie.net/platform/app/oauth/token/'}
        clientId={'007'}
        redirectUri={'https://admin.pixelpubgaming.com/clan'}
        tokenFn={this.tokenFn}
        clientSecret={'ITSASECRET'}
        onAuthSuccess={this.handleSuccess}
        onAuthError={this.handleError}
        component={this.props.component}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {receiveAuthData},
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Receiever)