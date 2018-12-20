import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FEED_QUERY } from './LinkList';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';


const MUTATION = gql`
    mutation PostMutation($url: String!, $description: String!){
        createLink(url: $url, description: $description){
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

class CreateLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            description: ''
        };
    }

    render() {
        const url = this.state.url;
        const description = this.state.description;
        return (
            <form>
                <FormGroup>
                    <ControlLabel>URL</ControlLabel>
                    <FormControl
                        type="text"
                        value={url}
                        onChange={e => this.setState({ url: e.target.value })}
                        placeholder="www.imdb.com"
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })}
                        placeholder="Random ratings."
                    />
                </FormGroup>
                <Mutation
                    mutation={MUTATION}
                    variables={{ url, description }}
                    onCompleted={() => this.props.history.push('/')}
                    update={(store, res) => {
                        const link = res.data.createLink;
                        console.log(link);
                        const data = store.readQuery({ query: FEED_QUERY });
                        data.link.push(link);
                        store.writeQuery({ query: FEED_QUERY, data: data });
                    }}
                >
                    {
                        postMutation => <Button onClick={postMutation}>Submit</Button>
                    }
                </Mutation>
            </form>
        );
    }
}

export default CreateLink;