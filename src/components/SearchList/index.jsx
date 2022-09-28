import React, { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import API from '../../utils/axios';

import Pagination from '@mui/material/Pagination';
import TechItem from '../TechItem';


import './index.scss'


export default function SearchList() {
    const { params: { key } } = useMatch('blog/search/result/:key')
    const [length, setLength] = useState(1)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {    //获取每页的文章内容
        API.get(`/search/${key}/${page}`).then(res => {
            setList(res.data)
        })
    }, [page, key])

    useEffect(() => {  //获取文章的总数，以便计算页数
        API.get(`/search/length/${key}`).then(res => {
            let l = Math.ceil(res.data['count(*)'] / 10)
            setLength(l)
        })
    }, [key])

    const handlePage = function (e, val) {
        setPage(val)
    }

    return (
        <div className='list'>
            <Pagination count={length} showFirstButton showLastButton onChange={handlePage} />
            {list.map(item => (<TechItem key={item.id} text={item} />))}
            <Pagination count={length} showFirstButton showLastButton onChange={handlePage} />
        </div>
    )
}
