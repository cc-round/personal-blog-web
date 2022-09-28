import React from 'react'
import { Outlet } from 'react-router-dom'

import EditTips from '../../components/EditTips'
import FloatBlock from '../../components/FloatBlock'
import TipShow from '../../components/TipShow'

import './index.scss'


export default function Blog() {
    return (
        <div className='blog'>
            <div className="leftbar">
                <EditTips />
            </div>
            <div className="main">
                <div className="content">
                    <Outlet />
                </div>
                <div className="siderbar">
                    <TipShow />
                </div>
            </div>
            <div className="rightbar">
                <FloatBlock />
            </div>
        </div>
    )
}
