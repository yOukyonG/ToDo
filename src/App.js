import './App.css';
import React from "react";
import ToDo from "./ToDo";
import {Paper, List, Container} from "@material-ui/core"
import AddToDo from "./AddToDo";
import { call } from './service/APiService';

class App extends React.Component {
  constructor(props){
    super(props);
    //여러 개의 객체를 생성해서 state에 items 라는 이름으로 저장
    this.state = {items:[]};
  }

  componentDidMount(){
    // 데이터를 가져오는 API 요청 수행
      call("/todo", "GET", null)
      .then((response) => this.setState({items:response.list}));
    }

  // 데이터 추가를 위한 함수
  // Item 1개 items에 추가하는 함수
  add = (item) => {
    // // 기존 items를 thisItems에 복제
    // const thisItems = this.state.items;
    // item.id = "ID-" + thisItems.length;
    // item.done = false;

    // // 복제본에 데이터를 추가
    // thisItems.push(item);
    
    // //props 나 state가 변경되면 컴포넌트를 자동 재출력
    // this.setState({items:thisItems});
    item.userid = "kong";
    call("/todo/", "POST", item)
    .then((response) => this.setState({items:response.data}));
  }

  //데이터를 삭제하는 함수
  delete = (item) => {
      item.userid = "kong";
      call('/todo/',"GET",null).then((response) => this.setState({items:response.data}))

      // const thisItems = this.state.items;
      // //thisItems에서 item을 삭제 -> id가 구별하는 속성
      // //thisItems에서 id가 다른 것만 골라내는 것 -> 원본을 변경시키지 않으면서 삭제
      // const newItems = thisItems.filter((e)=> e.id !== item.id);
      // this.setState({items:newItems}, () => {
      //   console.log(item.id + "가 제거되었습니다.");
      // })

  }
  // 데이터를 수정하는 함수
  update = (item) => {
    item.userid = "kong"
    call("/todo/","PUT", item).then((response)=> 
    this.setState({items:response.list})
    );
  }


  render(){
    // map: 데이터의 모임을 순회하면서 함수를 적용해 함수의 리턴 값을 가지고
    // 데이터의 모임을 만들어주는 함수
    // 데이터 변환에 활용
    // 조건 && 실행문 형태 (false이면 수행하지 않고, true이면 뒤의 실행문 수행)
    var todoItems = this.state.items.length > 0 && (
      <Paper style = {{margin:16}}>
        <List>
          {this.state.items.map((item, idx) =>(
            <ToDo item={item} 
            key={item.id} 
            delete={this.delete}
            update={this.update}/>
          ))}
          </List> 
      </Paper>
    )
    return(
      <div className="App">
        <Container maxWidth ="md">
          <AddToDo add={this.add}/>
          <div className="ToDoList">{todoItems}</div>
        </Container>
      </div>
    )
  }
}

export default App;
