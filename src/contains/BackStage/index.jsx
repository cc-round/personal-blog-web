import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './index.scss'

const list = [
    {
        type: 'techList',
        title: '文章管理'
    }, {
        type: 'techDrafts',
        title: '文章草稿箱'
    }, {
        type: 'tipsList',
        title: 'tip管理'
    }, {
        type: 'tipsDrafts',
        title: 'tip草稿箱'
    }
]
export default function BackStage() {

    const navigate = useNavigate()

    return (
        <div className='manage'>
            <header className='header'>
                {
                    list.map(item => <div key={item.type} className='menu' onClick={() => {
                        navigate(`/backstage/${item.type}`)
                    }}>
                        {item.title}
                    </div>)
                }
            </header>
            <div className='tableArea'>
                <Outlet />
            </div>

        </div>
    )
}
