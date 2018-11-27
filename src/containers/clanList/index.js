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
          data: clans
            .filter(({Name}) => Name.indexOf('Bravo') < 0 && Name.indexOf('Alpha') < 0 && Name.indexOf('Charlie') < 0)
            .map(({GroupId, MemberCount, Region, Name, Platform}) => ({
              group_id: GroupId,
              member_count: MemberCount,
              platform: Platform,
              name: Name,
              region: Region
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
