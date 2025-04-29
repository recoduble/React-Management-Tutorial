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
//import { styled } from '@mui/material/styles';  // 추가
import { styled, alpha } from '@mui/material/styles';

// npm install @mui/styles
// npm install @mui/material @emotion/react @emotion/styled
//import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

//import { withStyles } from '@mui/styles'; // 사용금지?
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import InputBase from '@mui/material/InputBase';
//import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


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
{/* 2025.04.29 디자인요소 수정중 */}
<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar>
    <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
    {/* <MenuIcon sx={{ fontSize: '2rem' }} /> 크기 조정 */}
    <Button color="inherit">메뉴아이콘에러</Button>
    </IconButton>            
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>고객관리시스템</Typography>
    <Button color="inherit">Login</Button>  
    <Search>
      <SearchIconWrapper>
        {/* <SearchIcon /> */}
        <button>Search</button>
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>          
  </Toolbar>
</AppBar>
</Box>
{/* 2025.04.29 디자인요소 수정중 */}

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
