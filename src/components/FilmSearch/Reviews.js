import React from 'react'
import PropTypes from 'prop-types'

function Reviews({ reviews }) {
    console.log(reviews)
    return (
        <div>
                <p>{reviews.content}</p>
        </div>
    )
}

Reviews.propTypes = {

}

export default Reviews

