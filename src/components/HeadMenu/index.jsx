import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/axios'
import './index.scss'

export default function HeadMenu() {
    const [menu, setMenu] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        API.get('/home/navigations').then(res => {
            setMenu(res.data)
        })
    }, [])
    return (
        <div className='headMenu'>
            <div className='menu'>
                {
                    menu ? menu.map(item => (
                        <div key={item.id} className='menuItem'
                            onClick={() => navigate(`/blog${item.path}`)}
                        >
                            {item.name}
                        </div>
                    )) : ''
                }
            </div>
        </div>
    )
}
