import React from 'react'

function Link(props) {
    return (
        <div>
            <h4>{props.link.url}</h4>
            <em>{props.link.description}</em>
            <small class="pull-right">by {props.link.postedBy.name}
            </small>
        </div>
    )
}

export default Link