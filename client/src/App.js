import { Component } from 'react';
import Customer from './components/Customer';

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

//const customers = []

class App extends Component {
  state = {
    customers:""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    const {classes} = this.props;
    return (
      // <Paper className={classes.root}>
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
            </TableRow>
          </TableHead>
          <TableBody>
          
            { this.state.customers ? this.state.customers.map(c => {
              return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}  /> );
            }) : "" }
          
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

//export default withStyles(styles)(App);
export default App;
