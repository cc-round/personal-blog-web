import React, { useEffect, useState } from 'react'
import { editorText } from '../../redux/actions'
import { connect } from 'react-redux';

import MDEditor from '@uiw/react-md-editor';

import './index.scss'

function Markdown(props) {
    const { editorText, text } = props
    const [content, setContent] = useState(text)

    useEffect(() => {
        setContent(text)
    }, [text])
    return (
        <div className='mdeditor' >
            <MDEditor
                height={400}
                value={content}
                onChange={(e) => {
                    setContent(e)
                    editorText(e)
                }}
            />
        </div>
    )
}

export default connect(
    state => ({
        text: state.getText
    }),
    { editorText }
)(Markdown)

