import React, { useEffect, useState } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import { handleTip } from '../../redux/actions';
import './index.scss'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import API from '../../utils/axios';

function EditTips(props) {
    const [html, setHtml] = useState('')
    const [editor, setEditor] = useState(null)
    const editorConfig = {                         // JS 语法
        placeholder: '随手记一个有用的小技巧',
    }

    const toolbarConfig = {
        toolbarKeys: [
            "bold", "|",
            {
                "key": "group-more-style",
                "title": "更多",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
                "menuKeys": [
                    "through",
                    "code",
                    "sup",
                    "sub",
                    "clearStyle"
                ]
            },
            "|", "color", "codeBlock", "undo", "redo"
        ]
    }

    const handleClose = () => {
        props.handleTip(false)
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const submit = () => {
        const data = {
            content: html,
            time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        }
        API.post('/addtips', data)
        props.handleTip(false)
    }

    return (
        <div className='editTips' >
            <Modal
                open={props.open}
                onClose={handleClose}
            >
                <div className='tipEditor' >
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
                        defaultConfig={editorConfig}
                        defaultHtml={html}
                        value={html}
                        onCreated={setEditor}
                        onChange={editor => {
                            setHtml(editor.getHtml())
                        }}
                        mode="default"
                        style={{ height: '301px', overflowY: 'hidden' }}
                    />
                    <Button variant='contained' className='button' color='success' onClick={submit}>提交</Button>
                </div>
            </Modal>
        </div>
    )
}

export default connect(
    state => ({
        open: state.handleTip,
    }),
    { handleTip }
)(EditTips)