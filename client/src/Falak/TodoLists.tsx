import React, { useState } from 'react';
import Final from './notin/Final';
import Model2 from './notin/Model2';
import AddTodo from './AddTodo';


const TodoLists = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
   <>
   <h1>from TodoLists </h1>
    {/* <AddTodo></AddTodo> */}
    {/* <AddTodo open={open} setOpen={setOpen} /> */}
    {/* <Model2 open={open} setOpen={setOpen} /> */}

    {/* <button onClick={()=>{setOpen(true)}}>click</button> */}
    {/* <div className="max-w-md mx-auto mt-8 ">
      <h1 className="text-3xl font-semibold mb-4">To-Do List</h1>
      <p className="text-gray-600 mb-4">
        Add and manage your to-dos with ease!
      </p>
      <div className="flex">
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mr-2"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="border-t border-gray-300 py-2 flex justify-between items-center"
          >
            <span>{todo}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div> */}
   <Final></Final>
   
   </>
  );
};

export default TodoLists;
