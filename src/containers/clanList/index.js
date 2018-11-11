import React from 'react'
import ClanList from '../../components/clanlist'

export default class ClanListGuest extends React.Component {
  state = {
    loading: true,
    data: [{
      name: 'loading'
    }]
  }

  componentWillMount() {
    fetch('/api/clan')
      .then(response => response.json())
      .then(clans => {
        this.setState({
          loading: false,
          data: clans.map(({group_id, member_count, platform, name}) => ({
            group_id,
            member_count,
            platform,
            name,
            region: name.indexOf('EU') >= 0 ? 'Europe' : 'North America'
          }))
        })
      })
  }

  render() {
    const {loading, data} = this.state

    return (
      <ClanList data={data} loading={loading} />
    )
  }
}
