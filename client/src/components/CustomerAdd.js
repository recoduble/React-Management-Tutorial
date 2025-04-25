import React from 'react';
// import post from 'axios'; // ❌ 잘못된 import 방식
import axios from 'axios';   // ✅ 올바른 import 방식

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName:''
        }
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
        this.setState = ({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName:''
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
        return (
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
        )
    }
}

export default CustomerAdd;