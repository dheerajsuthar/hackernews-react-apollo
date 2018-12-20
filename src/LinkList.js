import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

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
                        <div>
                            {data.link.map(link => <Link key={link.id} link={link} />)}
                        </div>
                    )
                }}
            </Query>
        )
    }                                                                                                                                   
}

export default LinkList;