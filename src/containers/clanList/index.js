import React from 'react'
import { Container, Segment, Table } from 'semantic-ui-react'
import _ from 'lodash'

export default class ClanList extends React.Component {
  state = {
    loading: true,
    column: null,
    direction: null,
    data: [{
      name: 'loading'
    }]
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
        this.setState({
            column: clickedColumn,
            direction: 'ascending',
        });

        return;
    }

    this.setState({
        direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
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
    const {loading, data, column, direction} = this.state
    let localData = _.sortBy(data.slice(0), column);
        
    if(direction === "descending") {
      localData = localData.reverse();
    }

    return (
      <Container fluid>
        <Segment loading={loading}>
          <Table sortable celled>
            <Table.Header>
              <Table.HeaderCell onClick={this.handleSort('name')} sorted={column === 'name' ? direction: null}>
                Clan
              </Table.HeaderCell>
              <Table.HeaderCell onClick={this.handleSort('region')} sorted={column === 'region' ? direction: null}>
                Region
              </Table.HeaderCell>
              <Table.HeaderCell onClick={this.handleSort('platform')} sorted={column === 'platform' ? direction: null}>
                Platform
              </Table.HeaderCell>
              <Table.HeaderCell onClick={this.handleSort('member_count')} sorted={column === 'member_count' ? direction: null}>
                Member Count
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
            {localData.map((datum, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <a className="clan-link" href={`https://www.bungie.net/en/ClanV2?groupId=${datum.group_id}`}>{datum.name.toUpperCase()}</a>
                </Table.Cell>
                <Table.Cell>
                  {datum.region}
                </Table.Cell>
                <Table.Cell>
                  {datum.platform}
                </Table.Cell>
                <Table.Cell>
                  <Segment textAlign="center" inverted color={datum.member_count < 100 ? 'green' : 'red'}>{datum.member_count}/100</Segment>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          </Table>
        </Segment>
      </Container>
    )
  }
}
