import React from 'react'
import {Segment, Button, Table, TableBody, TableRow, TableHeader, TableHeaderCell, TableCell} from 'semantic-ui-react'
import {
    receiveClanMembers
} from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MemberList extends React.Component {
    componentWillMount() {
        if (this.props.clan.clanId) {
            this.fetchMemberList()
        }
    }

    async fetchMemberList() {
        const {clanId} = this.props.clan

        const results = await fetch(`/api/clan/${clanId}/member`)
        const members = await results.json()

        this.props.receiveClanMembers(members)
    }

    render() {
        const {clan} = this.props
        const {members} = clan

        if (!members || members.length === 0) {
            return null
        }

        const keys = Object.keys(members[0])

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        {keys.map((key, idx) => (
                            <TableHeaderCell key={key+idx}>
                                {key}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member, idx) => (
                        <TableRow key={idx}>
                            {Object.values(member).map((value, index) => (
                                <TableCell key={`${idx}${index}`}>
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )

    }
}


const mapStateToProps = ({ clan }) => ({
    clan
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {receiveClanMembers},
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)