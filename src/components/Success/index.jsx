import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Success() {
    return (
        <div>
            <Alert severity="success">
                <AlertTitle>博客发布成功！</AlertTitle>
                你的文章已经发送完成！
            </Alert>
        </div>
    )
}
