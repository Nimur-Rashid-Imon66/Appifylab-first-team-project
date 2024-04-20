import React, { useState } from "react";
import Final from "./notin/Final";
import AddTodo from "./AddTodo";
import Model2 from "./notin/Model2";

const TodoApps = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>From TodoApp </h1>

      <AddTodo open={open} setOpen={setOpen} />
      <Model2 open={open} setOpen={setOpen} />
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        click
      </button>

      <Final />
    </>
  );
};

export default TodoApps;
