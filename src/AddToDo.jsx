import React from "react";
import {TextField, Paper, Button, Grid} from "@material-ui/core";


// 한줄의 텍스트를 입력받아서 버튼을 누르면 추가하는 컴포넌트
class AddToDo extends React.Component{
    constructor(props){
        super(props);
        //입력받은 내용을 저장할 state를 생성
        this.state = {item:{title:""}}
        // 넘겨준 데이터를 변수에 대입
        this.add = props.add
    }
    //입력 내용이 변경될 때 title을 수정하는 메서드
    onInputChange = (e) =>{
        //복제된 객체의 title의 값을 입력한 내용으로 수정
        const thisItem = this.state.item;
        // 복제한 객체를 다시 item으로 복사
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
    }
    // + 버튼을 누를 때 호출되는 메서드
    onButtonClick = (e) =>{
        this.add(this.state.item); //데이터 추가
        //title을 clear - 입력상자도 클리어
        this.setState({item:{title:""}});
    }
    // Enter를 누를 때 호출되는 메서드
    enterKeyEnterHandler = (e) =>{
    // Enter를 누르면 버튼을 누른 것과 동일한 효과
        if(e.key === "Enter"){
            this.onButtonClick();
        }
    }

    render(){
        return(
            <Paper style={{margin:16, paddaing:16}}>
             <Grid container>
                <Grid xs ={11} md={11} item style={{padding:16}}>
                <TextField
                placeholder="제목을 입력하세요"
                fullwidth
                value = {this.state.item.title}
                onChange={this.onInputChange}
                onKeyPress = {this.enterKeyEnterHandler}
                 />
            </Grid>
            <Grid xs={2} md={1} item>
                <Button
                fullWidth
                color = "secondary"
                variant = "outlined"
                onClick={this.onButtonClick}>
                    +
                </Button>
            </Grid>
            </Grid>
        </Paper>
        )
    }
}
export default AddToDo;