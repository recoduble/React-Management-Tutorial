const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'hello Express!!!!'});
})

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id':1,
            'image':'https://picsum.photos/128/128?random=1',
            'name' : '나동빈',
            'birthday' : '961222',
            'gender' : '남자',
            'job' : '대학생'
          },
          {
            'id':2,
            'image':'https://picsum.photos/128/128?random=2',
            'name' : '홍길동',
            'birthday' : '960305',
            'gender' : '남자',
            'job' : '프로그래머'  
          },
          {
            'id':3,
            'image':'https://picsum.photos/128/128?random=3',
            'name' : 'John',
            'birthday' : '960306',
            'gender' : '남자',
            'job' : '프로그래머3'  
          }  
        
    ]);
})

app.listen(port, () => console.log(`Listening on  port ${port}`));
