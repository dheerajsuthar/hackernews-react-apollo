import React from 'react'

function Link(props) {
    return (
        <div>
            <div>
                {props.link.description} ({props.link.url}) -- <i>{props.link.postedBy.name}</i>
                </div>
        </div>
    )
}

export default Link