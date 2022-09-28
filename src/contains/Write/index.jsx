import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom'
import { Button, FormControl, TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import API from '../../utils/axios';
import { getOpen, editorText } from '../../redux/actions';
import Confirm from '../../components/Confirm';

import './index.scss'
import Markdown from '../../components/Markdown';
import UploadImg from '../../components/UploadImg';

function Write(props) {
    const { content } = props
    const location = useLocation()
    const [data] = useState(location.state ? location.state.data : null)
    const [category, setCategory] = useState([])
    const [select, setSelect] = useState('')
    const [input, setInput] = useState(data ? data.title : '')
    const [result, setResult] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        API.get('/category').then(res => {
            setCategory(res.data)
            data && setSelect(res.data.find(item => item.name === data.category).id)
        })
    }, [data])

    // console.log(content)

    const isClick = function () {
        if (input.length === 0) {
            alert('请输入标题')
            return
        }

        if (select.length === 0) {
            alert('请选择分类')
            return
        }
        if (content === '<p><br></p>') {
            alert('请输入内容')
            return
        }
        const article = {
            title: input,
            author: 'hs',
            time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            content: content,
            view: 0,
            category: category[select - 1].name
        }
        console.log(article)
        setResult(article)
        props.getOpen(true)
    }

    return (
        <div className='write'>
            <h1 className='title'>{data ? '请进行修改' : '写下一篇新博客吧！'}</h1>
            <div className='editor'>
                <div className="and">
                    <TextField label="文章标题" variant="outlined"
                        className='input'
                        onChange={(e) => setInput(e.target.value)}
                        defaultValue={input}

                    />
                    <div className="category">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                            <InputLabel >文章分类</InputLabel>
                            <Select
                                value={select.length === 0 ? '' : select}
                                label="文章分类"
                                onChange={(event) => setSelect(event.target.value)}
                            >
                                {
                                    category ? category.map(item => <MenuItem key={item.id} value={item.id}> {item.name} </MenuItem>) : ''
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <UploadImg />
                <Markdown />
            </div>
            <Button className='button' variant="contained" onClick={() => isClick()}>提交</Button>
            <Confirm result={result} articleId={data ? data.id : -1} />
        </div >
    )
}

export default connect(
    state => ({
        content: state.getText
    }), { getOpen, editorText }
)(Write)