import  { useEffect, useState } from 'react';
import AddTodo from '../AddTodo';
import EditTodo from '../EditTodo';

interface FormData {
  userid: string;
  id:string 
  title: string;
  description: string;
  priority: string;
  tags: string;
}

const Final = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [update,setUpdate] =useState(0);
  const [todos, setTodos] = useState<FormData[]>([]);
  const  [editTodoId,setEditTodoId]=useState('');
  const [editData, setEditData] = useState<FormData | null>(null);
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [update]);

  const handleEdit = (id: string) => {
    // Handle edit action here
    console.log('handleEdit ',id)
    setEditTodoId(id);
    const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    console.log(existingTodos);
    if (existingTodos) {
      const editData = existingTodos.find((todo: FormData) => {
        return todo.id === id;
      });
      console.log("editData from final ", editData);
      setEditData(editData);
    }

    setOpenEdit(true);
  };


  const handleDelete = (id: string) => {
    console.log('Delete id ',id);
    const afterDeleteData = todos.filter((todo)=>{
      return todo.id !== id ;
    })
    console.log('after delete data ',afterDeleteData);
    setTodos(afterDeleteData);
    localStorage.setItem('todos', JSON.stringify(afterDeleteData));
  };

  return (
    <>
      <AddTodo open={open} setOpen={setOpen} setUpdate={setUpdate} />
      <EditTodo open={openEdit} setOpen={setOpenEdit} setUpdate={setUpdate} editTodoId={editTodoId} editData={editData} />
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <select
              className="mr-2 px-2 py-1 border border-gray-300 bg-white rounded-md"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="id">Account ID</option>
              <option value="name">Name</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchBy}`}
              className="px-2 py-1 border border-gray-300 bg-white rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4" onClick={() => setOpen(true)}>Add User</button>
        </div>
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Priority</th>
              <th className="border px-4 py-2">Tags</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {todos
              .filter(todo => todo.userid === '1')
              .map((todo) => (
                <tr key={todo.id} className="border">
                  <td className="border px-4 py-2">{todo.title}</td>
                  <td className="border px-4 py-2">{todo.description}</td>
                  <td className="border px-4 py-2">{todo.priority}</td>
                  <td className="border px-4 py-2">{todo.tags}</td>
                  <td className="border px-4 py-2 flex">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(todo.id)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(todo.id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Final;
