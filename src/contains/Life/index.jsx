import React from 'react'
import noContent from '../../static/noContent.png'

import './index.scss'

export default function Life() {
    return (
        <div className='life'>
            <img src={noContent} alt='' className='noContent' />
        </div>
    )
}
