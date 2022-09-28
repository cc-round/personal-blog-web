import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import API from '../../utils/axios';

import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Divider from '@mui/material/Divider';
import MDEditor from '@uiw/react-md-editor';

import { isAuth } from '../../utils/auth'
import { connect } from 'react-redux';
import { editorText } from '../../redux/actions'

import './index.scss'

function Article(props) {
    const match = useMatch('/blog/article/:id')
    const navigate = useNavigate()
    const [list, setList] = useState({})
    useEffect(() => {
        window.scrollTo(0, 0)
        API.get(`/getArticle/${match.params.id}`).then(res => {
            res.data.view++
            setList(res.data)
            API.patch(`/addView/?id=${res.data.id}&&view=${res.data.view}`)
        })
    }, [match.params.id])

    const edit = function () {
        props.editorText(list.content)
        navigate('/blog/update', {
            state: {
                data: list
            }
        })
    }
    return (
        <div className='articleArea'>
            <div className='article'>
                <div className="title">
                    <span>{list.title}</span>
                    {/* <div className="author">{list.author}</div> */}
                    {
                        isAuth() ? <EditIcon onClick={edit} className='edit' color='disabled' fontSize='small' /> : ''
                    }
                </div>
                <div className="message">
                    <div className='category'>
                        <CategoryIcon fontSize='inherit' color="disabled" className='icon' />
                        {list.category}
                    </div>
                    <div className="time">
                        <AccessTimeFilledIcon fontSize='inherit' color="disabled" className='icon' />
                        {list.time}
                    </div>
                    <div className="view">
                        <RemoveRedEyeIcon fontSize='inherit' color="disabled" className='icon' />
                        {list.view}
                    </div>
                </div>
                <Divider />
                <div className="contentArea">
                    <MDEditor.Markdown source={list.content} className='markdown' />
                </div>
            </div>
        </div>
    )
}

export default connect(
    () => ({}),
    { editorText }
)(Article)
