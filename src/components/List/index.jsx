import React, { useEffect, useState } from 'react'
import API from '../../utils/axios';

import Pagination from '@mui/material/Pagination';
import TechItem from '../TechItem';


import './index.scss'


export default function List(props) {
    const { type } = props
    const [length, setLength] = useState(1)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {    //获取每页的文章内容
        API.get(`/${type}/list/${page}`).then(res => {
            setList(res.data)
        })
    }, [page, type])

    useEffect(() => {  //获取文章的总数，以便计算页数
        API.get(`/${type}/length`).then(res => {
            let l = Math.ceil(res.data['count(*)'] / 10)
            setLength(l)
        })
    }, [type])

    const handlePage = function (e, val) {
        setPage(val)
    }

    return (
        <div className='list'>
            <Pagination count={length} showFirstButton showLastButton onChange={handlePage} />
            <div className="listShow">
                {list.map(item => (<TechItem key={item.id} text={item} />))}
            </div>
            <Pagination count={length} showFirstButton showLastButton onChange={handlePage} className='footerPage' />
        </div>
    )
}
