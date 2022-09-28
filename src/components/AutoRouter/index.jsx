import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { isAuth } from '../../utils/auth'

export default function AutoRouter(props) {
    const { children } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth()) {
            alert('请登录')
            navigate('/blog/home')
        }
    }, [navigate])
    return children
}
