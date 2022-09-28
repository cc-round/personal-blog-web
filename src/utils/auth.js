
//这里是登录相关的函数
const TOKEN_NAME = 'doomBlog'


//获取token
const getToken = () => localStorage.getItem(TOKEN_NAME)

//设置token
const setToken = (value) => localStorage.setItem(TOKEN_NAME, value)

//删除（注销）token
const deleteToken = () => localStorage.removeItem(TOKEN_NAME)

//判断是否登录，返回值为true为已登录
const isAuth = () => !!getToken()



export { getToken, setToken, deleteToken, isAuth }