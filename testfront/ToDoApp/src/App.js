import React, { useState } from "react";
import logo from "./Logo_Final.png";
import "./App.css";

function App() {
  const [newItem, setnewItem] = useState("");
  const [list, setList] = useState([]);

  function addItem(todoValue) {
    if (todoValue !== "") {
      const myNewItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      };

      setList((list) => [...list, myNewItem]);
      setnewItem("");
    }
  }

  const handleNewItemInput = (e) => {
    setnewItem(e.target.value);
  };

  const handleAddItemClick = () => {
    addItem(newItem);
  };

  const handleDeleteClick = (e) => {
    const id = parseInt(e.target.id, 10);
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  return (
    <div>
      <img src={logo} width="100" height="150" alt="" className="logo" />
      <h1 className="app-title">Akash To Do App</h1>
      <div className="container">
        Add an item....
        <br />
        <input
          type="text"
          className="input-text"
          placeholder="Write to do"
          value={newItem}
          onChange={handleNewItemInput}
        />
        <button className="add-btn" onClick={handleAddItemClick}>
          Add Todo
        </button>
        <div className="list"></div>
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  name="isDone"
                  checked={item.isDone}
                  onChange={() => {}}
                />
                {item.value}
                <button
                  id={item.id}
                  className="btn"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </li>
            );
          })}
          <li>
            <input type="checkbox" name="" id="" />
            Record youtube videos
            <button className="btn">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
