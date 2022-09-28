import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleTip } from '../../redux/actions';
import { connect } from 'react-redux';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import CategoryIcon from '@mui/icons-material/Category';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

import { isAuth } from '../../utils/auth'
import './index.scss'
import API from '../../utils/axios';

function FloatBlock(props) {
    const navigate = useNavigate()
    const [anchorEL, setAnchorEL] = useState(null)
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        API.get('/category').then(res => {
            setCategoryList(res.data)
        })
    }, [])

    const clickWrite = () => {
        navigate('/blog/write')
    }
    const clickTip = () => {
        props.handleTip(true)
    }
    const clickTop = () => {
        window.scrollTo(0, 0)
    }

    const clickCate = (e) => {
        setAnchorEL(e.target)
    }

    const onClose = () => {
        setAnchorEL(null)
    }

    const open = Boolean(anchorEL)

    const clickCategory = (e) => {
        const name = e.target.innerHTML
        navigate(`/blog/categoryList/${name}`)
        onClose()
    }

    return (
        <div className='floatBlock'>
            <Tooltip title="文章分类" placement="right" arrow TransitionComponent={Zoom}
                sx={{ fontSize: '30px' }}
            >
                <CategoryIcon className='floatIcon' onClick={clickCate} />

            </Tooltip>
            <Popover
                open={open}
                anchorEl={anchorEL}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 50,
                }}
                marginThreshold={30}
            >
                {
                    categoryList.map(item => <Typography key={item.id} sx={{ p: 2 }}
                        className='nameItem'
                        onClick={clickCategory}

                    >{item.name}</Typography>)
                }
            </Popover>
            {
                isAuth() ? <Tooltip title="写博客" placement="right" arrow TransitionComponent={Zoom}
                    sx={{ fontSize: '30px' }}
                >
                    <EditIcon className='floatIcon' onClick={clickWrite} />
                </Tooltip> : ''

            }
            {
                isAuth() ? <div className="divider"></div> : ''
            }
            {
                isAuth() ? <Tooltip title="随手记" placement="right" arrow TransitionComponent={Zoom}
                    sx={{ fontSize: '30px' }}
                >
                    <EventNoteIcon className='floatIcon' onClick={clickTip} />
                </Tooltip> : ''
            }
            {
                isAuth() ? <div className="divider"></div> : ''
            }
            <Tooltip title="回到顶部" placement="right" arrow TransitionComponent={Zoom}
                sx={{ fontSize: '30px' }}
            >
                <VerticalAlignTopIcon className='floatIcon' onClick={clickTop} />
            </Tooltip>
        </div>
    )
}


export default connect(
    () => ({}),
    { handleTip }
)(FloatBlock)