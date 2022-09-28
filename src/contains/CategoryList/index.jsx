import React, { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import API from '../../utils/axios';

import Pagination from '@mui/material/Pagination';
import TechItem from '../../components/TechItem';

import noContent from '../../static/noContent.png'

import './index.scss'


export default function CategoryList() {
    const match = useMatch('blog/categoryList/:name')

    const { params: { name } } = match
    const [length, setLength] = useState(1)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {    //获取每页的文章内容
        API.get(`/category/list/${page}/${name}`).then(res => {
            console.log(res.data)
            setList(res.data)
        })
    }, [page, name])

    useEffect(() => {  //获取文章的总数，以便计算页数
        API.get(`/category/length/${name}`).then(res => {
            let l = Math.ceil(res.data['count(*)'] / 10)
            setLength(l)
        })
    }, [name])

    const handlePage = function (e, val) {
        setPage(val)
    }
    return (
        <div className='categoryList'>
            <div className="list">
                <Pagination count={length} showFirstButton showLastButton onChange={handlePage} />
                <div className="listShow">
                    {list.map(item => (<TechItem key={item.id} text={item} />))}
                </div>
                {
                    list.length === 0 ? <img src={noContent} alt='' className='noContent' /> : ''
                }
                <Pagination count={length} showFirstButton showLastButton onChange={handlePage} className='footerPage' />
            </div>

        </div>
    )
}
