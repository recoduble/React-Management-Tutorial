import { Component } from 'react';
import Customer from './components/Customer';

import logo from './logo.svg';
import './App.css';
const customers = [
  {
    'id':1,
    //'image':'https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill',
    //'image':'https://picsum.photos/64/64',
    //'image':'https://loremflickr.com/120/120?random=1',
    'image':'https://via.assets.so/movie.png?id=1&q=95&w=120&h=120&fit=fill',
    'name' : '나동빈',
    'birthday' : '961222',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id':2,
    'image':'https://via.assets.so/movie.png?id=2&q=95&w=120&h=120&fit=fill',
    'name' : '홍길동',
    'birthday' : '960305',
    'gender' : '남자',
    'job' : '프로그래머'  
  },
  {
    'id':3,
    'image':'https://via.assets.so/movie.png?id=3&q=95&w=120&h=120&fit=fill',
    'name' : '홍길동3',
    'birthday' : '960305',
    'gender' : '남자',
    'job' : '프로그래머3'  
  }  
]

class App extends Component {
  render() {
    return (
      <div>
        { customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        }) }
      </div>
    );
  }
}

export default App;
