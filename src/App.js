import React, { useState } from 'react';
import {Container, Row, Form, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';

function App() {
  
  const [taskTodo, setTaskTodo] = useState('');  
  const [todos, setTodos] = useState([]);  

  function handleInput(e) {
    e.preventDefault();
    setTaskTodo(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (taskTodo === '') return;
    setTodos([...todos, {id: Date.now(), text: taskTodo, isCompleted: false}]);
    setTaskTodo('');
    e.target.reset();
  }

  function removeTodo(id){
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(id, text){
    const newTodos = [...todos];
    newTodos.forEach(item => {
      if (item.id === id) {item.text = text;}
    });
    setTodos(newTodos);
  }

  function completeTodo(id){
    const newTodos = [...todos];
    let todo;
    newTodos.forEach(item => {
      if (item.id === id) {
        todo = item;
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(newTodos);
  }

  return (
    <div>
     <h1>Todo List</h1>
      <Container className="py-5" style={{ backgroundColor: 'sandybrown', borderColor: 'sandybrown' }}>
        <Row>
          <Form inline className="col-6 offset-3 mb-4 justify-content-center" onSubmit={handleAddTodo} >
              <Input type="text" name="todo" placeholder="Enter a new todo" className="pr-5 ml-0" onChange={handleInput}/>
              <Button type="submit" className="ml-lg-1 ml-md-1 mt-lg-0 mt-md-0 mt-1 px-4">Add</Button>
          </Form>
          <ListGroup className="col-6 offset-3">
            {
              todos.map((todo) => (
                <ListGroupItem  className="item mt-1" color="warning" key={todo.id} >
                  {/* <input type="text" id={todo.id} value={todo.text} style={{textDecoration:todo.isCompleted ? 'strike-through': ''}} onChange={(e) => editTodo(e.target.value,todo.id)}/> */}
                  <input type="text" id={todo.id} 
                          value={todo.text} 
                          className={todo.isCompleted ? 'strike-through': ''} 
                          onChange={(e) => editTodo(todo.id, e.target.value)}/>

                  <div className="icons">
                    <button onClick={()=>completeTodo(todo.id)}>
                      <i className="fas fa-check-square"></i>
                    </button> 
                    <button onClick={()=>removeTodo(todo.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button> 
                  </div> 
              </ListGroupItem>)
              )
            }
          </ListGroup> 
        </Row>  
      </Container>
    </div>
  );
}
export default App;
