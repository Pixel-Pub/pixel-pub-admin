import React from 'react'
import {Segment, Table, TableBody, TableRow, TableHeader, TableHeaderCell, TableCell} from 'semantic-ui-react'

const PlatformMap = {
    "0": "None",
    "1": "Xbox",
    "2": "Playstation",
    "4": "PC Master Race",
    "10": "Some weird bungo thing called TigerDemon",
    "254": "Uber 1337 Bungo Hax0r"
}

class MemberList extends React.Component {
    render() {
        const {members} = this.props
        console.log('[test]', members)
        return (
            <Segment loading={!members || members.length === 0} basic>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>
                                Member
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Destiny Id
                            </TableHeaderCell>
                            <TableHeaderCell>
                                First Joined
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Platform
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Last Seen
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    {member.name}
                                </TableCell>
                                <TableCell>
                                    {member.destiny_member_id}
                                </TableCell>
                                <TableCell>
                                    {new Date(member.created_at).toDateString()}
                                </TableCell>
                                <TableCell>
                                    {PlatformMap[member.type]}
                                </TableCell>
                                <TableCell>
                                    {new Date(member.updated_at).toDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Segment>
        )

    }
}

export default MemberList