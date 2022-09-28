import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../../utils/axios'
import tipHeader from '../../static/tipHeader.png'
import tipsText from '../../static/tipsText.png'
import newLists from '../../static/newLists.png'
import newTitle from '../../static/newTitle.png'


import './index.scss'

export default function TipShow() {
    const [tip, setTip] = useState('')
    const [newTech, setNewTech] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        API.get('/getTip').then(res => {
            setTip(res.data[0])
        })
    }, [])

    useEffect(() => {
        API.get('/tech/getNew').then(res => {
            setNewTech(res.data)
        })
    }, [])

    const handleClick = (e) => {
        const id = e.target.attributes.value.value
        navigate(`/blog/article/${id}`)
    }

    return (
        <div className='show'>

            <div className="newArt">
                <img src={newLists} alt='' className='newLists' />
                <img src={newTitle} alt='' className='newTitle' />
                <div className="newText">
                    {
                        newTech.map(item => <div
                            key={item.id}
                            className='newItem'
                            onClick={(e) => handleClick(e)}
                            value={item.id}
                        >
                            {item.title}
                        </div>)
                    }
                </div>
            </div>
            <div className="textPage">
                <div className='tipHeader'>
                    <img src={tipHeader} alt='' className='headerImg' />
                    <img src={tipsText} alt='' className='tipsText' />
                </div>
                <p dangerouslySetInnerHTML={{ __html: tip.content }} className='tipText'></p>
            </div>


        </div>
    )
}
