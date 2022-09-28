import React from 'react'
import API from '../../utils/axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getOpen, editorText } from '../../redux/actions';
import { connect } from 'react-redux';

function Confirm(props) {
    const { result, articleId } = props

    const handleAgree = function () {
        articleId > 0 ? API.patch('/updateText', { ...result, id: articleId })
            : API.post('/tech/add', result)
        props.editorText('')
        props.getOpen(false)
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => { props.getOpen(false) }}
            >
                <DialogTitle >
                    确认
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        是否要进行文章提交
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.getOpen(false) }}>取消</Button>
                    <Button onClick={handleAgree} autoFocus variant="contained" style={{ backgroundColor: "red" }}>
                        提交
                    </Button>
                </DialogActions >
            </Dialog>
        </div>
    )
}


export default connect(
    state => ({
        open: state.firmOpen
    }), { getOpen, editorText }
)(Confirm)