import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import API from '../../utils/axios';
import { handleTip, tipHtml } from '../../redux/actions';

import './index.scss'


function ManageTable(props) {
    const location = useLocation()
    const type = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [rows, setRows] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        API.get(`/${type}/data`).then(res => {
            setRows(res.data)
        })
    }, [type])

    function renderButton(props) {
        return (<Button
            value={props.id}
            onClick={(e) => {
                const res = window.confirm('确认删除？')
                if (res) deleteItem(e.target.value)
            }}
            variant="contained"
            size='small'
            color='error'
        >删除</Button>)
    }

    function deleteItem(id) {
        API.delete(`/techList/deleteArticle/${id}`)
    }

    function renderTitle(params) {
        return <span onClick={() => {
            navigate(`/blog/article/${params.id}`)
        }}
            className='titleStyle'
        >{params.formattedValue}</span>
    }
    function renderContent(params) {
        return <span onClick={() => {
            props.tipHtml({
                id: params.id,
                content: params.formattedValue
            })
            props.handleTip(true)
        }}
            className='titleStyle'
        >{params.formattedValue}</span>
    }

    const techColumns = [
        {
            field: 'id',
            headerName: 'ID',
        }, {
            field: 'title',
            headerName: '标题',
            width: 300,
            renderCell: renderTitle
        }, {
            field: 'category',
            headerName: '类别',
            width: 150
        }, {
            field: 'time',
            headerName: '时间',
            width: 180
        }, {
            field: 'view',
            headerName: '访问量'
        }, {
            field: 'handle',
            headerName: '操作',
            renderCell: renderButton
        }
    ]

    const tipsColumns = [
        {
            field: 'id',
            headerName: 'ID',
        }, {
            field: 'content',
            headerName: '内容',
            width: 300,
            renderCell: renderContent
        }, {
            field: 'time',
            headerName: '时间',
            width: 300
        }, {
            field: 'handle',
            headerName: '操作',
            renderCell: renderButton
        }
    ]

    return (
        <div className='table'>
            <DataGrid
                columnVisibilityModel={{
                    id: false,
                }}
                rows={rows}
                columns={type === 'techList' || type === 'techDrafts' ? techColumns : tipsColumns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                disableExtendRowFullWidth
            />
        </div>
    );
}

export default connect(
    () => ({}),
    { handleTip, tipHtml }
)(ManageTable)