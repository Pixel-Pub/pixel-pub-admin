import React from 'react'
import PropTypes from 'prop-types'
import { Container, Segment, Table } from 'semantic-ui-react'
import {history} from '../../store'
import _ from 'lodash'
import moment from 'moment'

export default class ClanList extends React.Component {
  state = {
    loading: false,
    column: null,
    direction: null,
    data: [{
      name: 'loading'
    }]
  }

  handleRowClick = id => () => {
      history.push(`/clan/stats/${id}`)
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

  render() {
    const {loading, column, direction} = this.state
    const {admin, data} = this.props
    let localData = _.sortBy(data.slice(0), column);
        
    if(direction === "descending") {
      localData = localData.reverse();
    }

    return (
      <Container fluid>
        <Segment loading={loading || this.props.loading}>
          <Table sortable celled selectable={admin === true}>
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
              {admin === true &&
                <Table.HeaderCell onClick={this.handleSort('member_count')} sorted={column === 'member_count' ? direction: null}>
                  Last Updated
                </Table.HeaderCell>
              }
            </Table.Header>
            <Table.Body>
            {localData.map((datum, index) => (
              <Table.Row key={index} onClick={admin ? this.handleRowClick(datum.group_id) : () => null}>
                <Table.Cell>
                  {admin === true
                    ? datum.name.toUpperCase()
                    : <a className="clan-link" href={`https://www.bungie.net/en/ClanV2?groupId=${datum.group_id}`}>{datum.name.toUpperCase()}</a>
                  }
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
                {admin === true &&
                  <Table.Cell>
                    {new moment(datum.synced_at).format('MM/DD/YYYY')}
                  </Table.Cell>
                }
              </Table.Row>
            ))}
          </Table.Body>
          </Table>
        </Segment>
      </Container>
    )
  }
}

ClanList.propTypes = {
    admin: PropTypes.bool,
    data: PropTypes.array,
    loading: PropTypes.bool
}