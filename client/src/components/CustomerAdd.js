import React from 'react';
// import post from 'axios'; // ❌ 잘못된 import 방식
import axios from 'axios';   // ✅ 올바른 import 방식
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import withStyles from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});



class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName:'',
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
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName:'',
            open: false
        });        
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            } )
            .catch(error => {
                console.error('업로드 실패:', error); // (선택) 에러 핸들링 추가
            });

        // 아래는 개발시에만 사용 // ✅ setState 사용법 수정
        this.setState ({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName:'',
            open: false
        });
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {                                                                                          
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);                
        formData.append('job', this.state.job);                
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        
        // return post(url, formData, config); // ❌ 잘못된 사용
        return axios.post(url, formData, config); // ✅ 올바른 사용        
    }

    render() {
        const {classes} = this.props;

        return (
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} onChange={this.handleFileChange} /> {this.state.fileName}  <br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                성별 :  <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                직업 :  <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
                <br/>
                <button type="submit">추가하기</button>
                <br/><br/>
            </form>
            */
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} >
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} onChange={this.handleFileChange} /> 
                        <label htmlFor='raised-button-file'>
                            <Button variant='contained' color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
                        <DialogActions>
                            <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가</Button>
                            <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                        </DialogActions>

                    </DialogContent>
                    <Button onClick={this.handleClose} color="primary">닫기</Button>
                </Dialog>
            </div>
        )
    }
}

//export default CustomerAdd;
export default withStyles(styles)(CustomerAdd);
