import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteToken, isAuth, setToken } from '../../utils/auth'
import API from '../../utils/axios';

import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HttpsIcon from '@mui/icons-material/Https';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import img from '../../static/logoLetter.png'
import './index.scss'


export default function HeadTop() {
    const [key, setKey] = useState('')
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [isLogin, setIsLogin] = useState(isAuth)
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }


    const Enter = (e) => {
        if (e.code === 'Enter') {
            navigate(`/blog/search/result/${key}`)
        }
    }
    const clickSearch = () => {
        if (key.length > 0) navigate(`/blog/search/result/${key}`)
    }
    const errorMessage = () => {
        if (password.length !== 0) {
            if (password.length < 6) {
                return '密码要在6位以上'
            } else if (password.length > 16) {
                return '密码过长，要小于16位'
            }
        }
        return ''
    }

    const onButton = () => {
        if (isAuth()) {
            deleteToken()
            setIsLogin(false)
            window.location.reload()
        } else {
            setOpen(true)
        }
    }

    const login = () => {
        if (account.length * password.length === 0) {
            return alert('账号或密码不能为空')
        }
        if (password.length < 6) {
            return alert('密码要在6位以上')
        } else if (password.length > 16) {
            return alert('密码过长，要小于16位')
        }
        API.post('/login', { username: account, password }).then(res => {
            if (res.data.status < 200 || res.data.status >= 300) {
                alert(res.data.message)
            } else {
                setToken(res.data.token)
                setIsLogin(true)
                setOpen(false)
                window.location.reload()
            }
        })
    }

    const manageList = () => {
        navigate('/backstage')
    }

    return (
        <div className='headTop'>
            <img src={img} alt='' className='logo'></img>
            <div className="search">
                <InputBase
                    sx={{ ml: 1 }}
                    size='small'
                    onKeyDown={(e) => Enter(e)}
                    onChange={(e) => { setKey(e.target.value) }}
                />
                <IconButton type="button" sx={{ p: '5px' }} edge='end' onClick={clickSearch}>
                    <SearchIcon />
                </IconButton>
            </div>

            <Button className='button' variant="contained"
                onClick={onButton}
            >{isLogin ? '注销' : '登录'}
            </Button>
            {
                isAuth() ? <div className='welcome'>欢迎您，<span onClick={manageList}>黄盛</span></div> : ''
            }

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className="loginWindow">
                    <div className="input">
                        <p>密码登录</p>
                        <TextField
                            onChange={(e) => {
                                setAccount(e.target.value)
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <div style={{ width: '40px' }}></div>
                                    </InputAdornment>
                                )
                            }}
                            variant="standard"
                            value={account}
                        />
                        <TextField
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (password.length < 5 || password.length > 15) {
                                    setPasswordCheck(true)
                                } else {
                                    setPasswordCheck(false)
                                }
                            }}
                            error={passwordCheck}
                            helperText={errorMessage()}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowPassword(!showPassword)
                                            }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            variant="standard"
                        />
                        <div className="loginButton" >
                            <Button variant="outlined">注册</Button>
                            <Button variant="contained" onClick={login}>登录</Button>
                        </div>
                    </div>

                </div>
            </Modal >
        </div >
    )
}
