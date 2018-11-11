import React from 'react'
import ClanList from '../../components/clanlist'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { receiveClanList } from '../../actions'

class ClanListAdmin extends React.Component {
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
        const data = clans.map(({group_id, member_count, platform, name, synced_at}) => ({
          group_id,
          member_count,
          platform,
          name,
          synced_at: new Date(synced_at).getTime(),
          region: name.indexOf('EU') >= 0 ? 'Europe' : 'North America'
        }))

        this.props.receiveClanList(data)
        this.setState({
          loading: false,
          data
        })
      })
  }

  render() {
    const {loading, data} = this.state

    return (
      <ClanList data={data} loading={loading} admin={true} />
    )
  }
}

const mapStateToProps = ({clanList}) => clanList

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      receiveClanList
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ClanListAdmin)