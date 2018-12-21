import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export const FEED_QUERY = gql`
  {
    link {
        id
        createdAt
        url
        description
        postedBy {
            name
            email
        }
    }
  }
`;

class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    console.log(error);
                    console.log(data);

                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>;
                    return (
                        <ListGroup>
                            {data.link.map(link => <ListGroupItem><Link key={link.id} link={link} /></ListGroupItem>)}
                        </ListGroup>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList;