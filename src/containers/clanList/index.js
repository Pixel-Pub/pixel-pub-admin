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
            .filter(({Name}) => {
              const name       = Name.toLowerCase()
              const exceptions = [
                'bravo',
                'alpha',
                'charlie'
              ]

              exceptions.forEach((exception) => {
                if (name.indexOf(exception) >= 0) {
                  return false
                }
              })

              return true
            })
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
