import { Component } from 'react';
import Customer from './components/Customer';

import logo from './logo.svg';
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

// const styles = theme => ({
//   root: {
//     width: "100%",
//     //marginTop: theme.spacing.unit *3,
//     marginTop: theme.spacing(3),
//     overflowX:"auto"
//   },
//   table:{
//     minWidth:1080
//   }
// })

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   width: "100%",
//   marginTop: theme.spacing(3),
//   overflowX: "auto"
// }));

// const StyledTable = styled(Table)({
//   minWidth: 1080
// });

const customers = [
  {
    'id':1,
    //'image':'https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill',
    'image':'https://picsum.photos/128/128?random=1',
    //'image':'https://loremflickr.com/120/120?random=1',
    //'image':'https://via.assets.so/movie.png?id=1&q=95&w=120&h=120&fit=fill',
    'name' : '나동빈',
    'birthday' : '961222',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id':2,
    'image':'https://picsum.photos/128/128?random=2',
    //'image':'https://via.assets.so/movie.png?id=2&q=95&w=120&h=120&fit=fill',
    'name' : '홍길동',
    'birthday' : '960305',
    'gender' : '남자',
    'job' : '프로그래머'  
  },
  {
    'id':3,
    'image':'https://picsum.photos/128/128?random=3',
    //'image':'https://via.assets.so/movie.png?id=3&q=95&w=120&h=120&fit=fill',
    'name' : '홍길동3',
    'birthday' : '960305',
    'gender' : '남자',
    'job' : '프로그래머3'  
  }  
]

class App extends Component {
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
          
            { customers.map(c => {
              return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}  /> );
            }) }
          
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

//export default withStyles(styles)(App);
export default App;
