import React from 'react'
import { useNavigate } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import listBorder from '../../static/listBorder.png'

import './index.scss'

export default function TechItem(props) {
    const { title, content, view, category, time, id } = props.text
    const html = { __html: content }
    const navigate = useNavigate()
    const isClick = function () {
        navigate(`/blog/article/${id}`)
    }
    return (
        <div className='techItem' >
            <img src={listBorder} alt="" className='listBack' />
            <div className='titleName' onClick={isClick}>{title}</div>
            <div className='preview' dangerouslySetInnerHTML={html}>
            </div>
            <div className="footer">
                <div className="time">
                    <AccessTimeFilledIcon className='icon' fontSize='inherit' color='disabled' />
                    {time}
                </div>
                <div className="category">
                    < CategoryIcon className='icon' fontSize='inherit' color='disabled' />
                    {category}
                </div>
                <div className="view">
                    <RemoveRedEyeIcon className='icon' fontSize='inherit' color='disabled' />
                    {view}
                </div>
            </div>
        </div>
    )
}
