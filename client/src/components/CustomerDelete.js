import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });        
    }    

    deleteCustomer = (id) => {
        const url='/api/customers/' + id;
        fetch(url, { method: 'DELETE' })
            .then(() => {
                this.props.stateRefresh();
                this.handleClose(); // 삭제 후 다이얼로그 닫기
            })
            .catch(error => {
                alert('삭제에 실패했습니다.');
                console.error(error);
            });
    }
    render() {
        return (
            <div>
            <Button variant="contained" color="secondary"  onClick={this.handleClickOpen} >삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle >
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={() => this.deleteCustomer(this.props.id)} >삭제</Button>
                    <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;