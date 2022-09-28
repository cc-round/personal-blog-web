import React, { useState } from 'react'
import { connect } from 'react-redux';
import { editorText } from '../../redux/actions';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './index.scss'

function UploadImg(props) {
    const { content, editorText } = props

    const [fileList, setFileList] = useState([]);

    const handleChange = (e) => {
        const { fileList: newFileList, file } = e
        if (file.status === 'done') {  //上传成功
            const arr = file.response.ImgPath.split('/')
            const filename = arr[arr.length - 1]
            console.log(filename)
            const newContent = `${content}
![${filename}](${file.response.ImgPath})`
            editorText(newContent)
            console.log(file.response.ImgPath)
        }
        return setFileList(newFileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <div className='uploadImg'>
            <Upload
                action="http://localhost:8000/upload/image"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
            >
                {fileList.length >= 7 ? null : uploadButton}
            </Upload>
        </div>
    )
}

export default connect(
    state => ({
        content: state.getText
    }), { editorText }
)(UploadImg)