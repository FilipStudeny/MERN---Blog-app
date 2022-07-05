import React from 'react'

const Comment = () => {
  return (
    <div className='post_Item'>
        <div className='post_header'>
            <div className='post_User_image'></div>
            <div>
                <h2 className='post_authorname'>user</h2>
            </div>
        </div>
        <div className='post_content'>
            <p>Comment </p>
        </div>
    </div>
  )
}

export default Comment