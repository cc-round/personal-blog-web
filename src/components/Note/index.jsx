import React from 'react'
import './index.scss'
import CancelIcon from '@mui/icons-material/Cancel';

export default function Note(props) {

    const { content } = props
    const html = { __html: content }

    return (
        <div className='note'>
            <div>
                <CancelIcon className='icon' />
            </div>
            <p dangerouslySetInnerHTML={html}></p>
        </div>
    )
}
