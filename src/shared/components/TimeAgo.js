import React from 'react'
import ReactTimeAgo from 'react-time-ago'

function TimeAgo({ date }) {
    return (
        <span>
            <ReactTimeAgo date={date} locale="en-US" />
        </span>
    )
}

export default TimeAgo