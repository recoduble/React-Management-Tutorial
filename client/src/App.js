import { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
//import { withStyles } from '@mui/styles';
//import { withStyles } from '@mui/material/styles';
//import { styled } from '@mui/material/styles'; //  이거 대신 sx 사용. sx는 MUI(Material-UI)에서 제공하는 스타일링 전용 prop입니다
// npm install @mui/styles
// npm install @mui/material @emotion/react @emotion/styled

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


class App extends Component {
  // state = {
  //   customers:"",
  //   completed:0
  // }
  constructor(props) {
    super(props);
    this.state = {
      //customers: '',
      customers: [],
      completed: 0      
    }
  }

  stateRefresh = () => {
    this.setState ({
      //customers: '',
      customers: [],
      completed: 0
    });
    this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));    
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed +1});
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
      <Paper sx={{ width: "100%", mt: 3, overflowX: "auto" }}>
        {/* <Table className={classes.table}> */}
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>          
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
            <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            { this.state.customers ? this.state.customers.map(c => {
              // name={c.NAME} 이 맞음.
              return ( <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.NAME} birthday={c.birthday} gender={c.gender} job={c.job}  /> );
              //return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}  /> );

            }) : 
            <TableRow>
              <TableCell colSpan="6" align='center'>
              {/* <CircularProgress variant="determinate" value={progress} /> */}
              <CircularProgress variant="indeterminate" value={this.state.completed} />
              {/* LOADING !!!!! */}
              </TableCell>
            </TableRow>
            }
          
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

//export default withStyles(styles)(App);
export default App;
