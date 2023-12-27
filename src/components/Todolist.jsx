import { useState, useEffect, useRef, Fragment } from "react";

export default function Todolist() {
  const [todo, setTodo] = useState([]);
  // const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem('myData')))
    if (localStorage.hasOwnProperty("myData")) {
      const retriveMyData = localStorage.getItem("myData");
      setTodo(JSON.parse(retriveMyData));
    }
    if (!localStorage.hasOwnProperty("myData")) {
      setTodo([
        {
          id: 10,
          text: "text",
          showText: "block",
          showInput: "none",
          isChecked: false,
          textDecorate: ''
        },
      ]);
      localStorage.setItem(
        "myData",
        JSON.stringify([
          {
            id: 10,
            text: "text",
            showText: "block",
            showInput: "none",
            isChecked: false,
            textDecorate: ''
          },
        ])
      );
    }
    // console.log(todo)
  }, []);

  function submitTodo(event) {
    event.preventDefault();

    const todoID = Math.random() * 1000000;
    const form = event.target[0].value;
    const arrTodo = [...todo];

    arrTodo.push({
      id: Math.round(todoID),
      text: form,
      showText: "block",
      showInput: "none",
      isChecked: false,
      textDecorate: ''
    });
    // console.log(todo);
    localStorage.setItem("myData", JSON.stringify(arrTodo));
    setTodo([...arrTodo]);
    // console.log(form, todo);
  }

  function deleteTodo(item) {
    // console.log(item);
    // event.preventDefault();
    const arrTodo = [...todo];
    arrTodo.splice(arrTodo.indexOf(item), 1);
    localStorage.setItem("myData", JSON.stringify(arrTodo));
    // console.log(exceptSecond)
    setTodo(arrTodo);
  }

  function changeInputTodo(event, item) {
    event.preventDefault();
    // console.log(event,item)
    const arrTodo = [...todo];
    const indexOfItem = arrTodo.indexOf(item);
    if (arrTodo[indexOfItem].showText === "block") {
      arrTodo[indexOfItem].showText = "none";
      arrTodo[indexOfItem].showInput = "block";
    } else if (arrTodo[indexOfItem].showText === "none") {
      // console.log(event.target[0].value);
      arrTodo[indexOfItem].text = event.target[0].value;
      arrTodo[indexOfItem].showText = "block";
      arrTodo[indexOfItem].showInput = "none";
    }
    localStorage.setItem("myData", JSON.stringify(arrTodo));
    setTodo([...arrTodo]);

    // console.log(arrTodo,indexOfItem)
  }

  function checkboxTodo(event, item) {
    // event.preventDefault();
    const arrTodo = [...todo];
    const indexOfItem = arrTodo.indexOf(item);
    if (event.target.checked === true) {
      arrTodo[indexOfItem].isChecked = true;
      arrTodo[indexOfItem].textDecorate = 'line-through'
    } else if (event.target.checked === false) {
      arrTodo[indexOfItem].isChecked = false;
      arrTodo[indexOfItem].textDecorate = ''
    }
    localStorage.setItem("myData", JSON.stringify(arrTodo));
    setTodo([...arrTodo]);
  }

  return (
    <>
      <form
        className="input-group w-75 p-3"
        onSubmit={(event) => submitTodo(event)}
      >
        <div className="form-floating bg-secondary-subtle p-1">
          <input
            type="text"
            className="form-control"
            id="input-todo"
            name="myText"
            // defaultValue="test"
          />
          <label htmlFor="input-todo">Enter todolist</label>
        </div>
        <button type="submit" className="btn btn-primary text-uppercase">
          submit
        </button>
      </form>
      <p className="h1 text-uppercase text-center w-75">Todolist : {todo.length}</p>
      <ul className="list-group p-3">
        {todo.map((item, index) => {
          return (
            <li
              className="list-group-item list-group-item-action w-75 bg-secondary mb-1 rounded-2"
              key={index}
            >
              <div style={{ display: item.showText }}>
                <div class="input-group-text text-center justify-content-between bg-secondary-subtle mb-1">
                  <input
                    className="form-check-input mt-0 me-1"
                    type="checkbox"
                    value="false"
                    aria-label="Checkbox for following text input"
                    onChange={(event) => checkboxTodo(event, item)}
                    checked={item.isChecked}
                  />

                  <p className="lead mt-1" style={{'text-decoration-line': item.textDecorate}}>{item.text}</p>

                  <div>
                    <button
                      type="button"
                      className="btn btn-success me-1 text-uppercase"
                      onClick={(event) => changeInputTodo(event, item)}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger text-uppercase"
                      // onClick={ deleteTodo(item) }
                      onClick={() => deleteTodo(item)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ display: item.showInput }} className="bg-secondary">
                <form
                  className="input-group form-floating"
                  onSubmit={(event) => changeInputTodo(event, item)}
                >
                  <input
                    className="form-control w-75"
                    id="another-todo"
                    type="text"
                    defaultValue={item.text}
                  />
                  <label htmlFor="another-todo">Enter todolist</label>
                  <button
                    type="submit"
                    className="input-group-append btn btn-success me-1 text-uppercase"
                    // onClick={}
                  >
                    save
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
