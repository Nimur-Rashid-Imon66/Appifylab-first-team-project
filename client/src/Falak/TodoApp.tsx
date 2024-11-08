import  { useContext, useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import BackDataCheck from './notin/BackDataCheck';
import axios from 'axios';
import { OnlineUserContext } from '../App';


interface FormData {
  userid: number;
  id:number;
  title: string;
  description: string;
  priority: string;
  tags: string;
}

const TodoApp = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchBy, setSearchBy] = useState('title');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [update,setUpdate] =useState(0);
  const [todos, setTodos] = useState<FormData[]>([]);
  const  [editTodoId,setEditTodoId]=useState(0);
  const [editData, setEditData] = useState<FormData | null>(null);
  const [userid,setUserid]= useState(1);
  const { currentLoginUser} = useContext(OnlineUserContext);
  //console.log('heloo ',currentLoginUser);

  useEffect(()=>{
    // console.log('user id ',currentLoginUser.userid)
    setUserid(currentLoginUser.userid);
  },[])
  useEffect(() => {
    // const storedTodos = localStorage.getItem('todos');
    // if (storedTodos) {
    //   setTodos(JSON.parse(storedTodos));
    // }
    // const localhostonlineusesr = localStorage.getItem('localhostonlineusesr');
    // if(localhostonlineusesr && localhostonlineusesr!=='-1'){
    //   const userInfo=JSON.parse(localhostonlineusesr);
    //   console.log('user info ',userInfo);
    //   setUserid(userInfo.userid)
    //   // console.log('user id is found set user id  ',userInfo.userid)
    // }
    // else {
    //   // console.log('user id not found set user id 1 ',userid)
    // }
   // db todos
    axios.get('http://127.0.0.1:3333/todos',)
    .then(res => setTodos(res.data))
    .catch(err => console.log(err))



  }, [update]);

  const handleEdit = (id: number) => {
    // Handle edit action here
   // console.log('handleEdit ',id)
    setEditTodoId(id);
 
     console.log('edit in todos ',todos);

      const editData = todos.find((todo: FormData ) => {
        return todo.id === id;
      });

  
      if(editData){
        console.log("editData from final ", editData);
        setEditData(editData);
      }
      
    

    setOpenEdit(true);
  };


  const handleDelete = (id: number) => {
    console.log('Delete id ',id);
    // const afterDeleteData = todos.filter((todo)=>{
    //   return todo.id !== id ;
    // })
    // console.log('after delete data ',afterDeleteData);
    // setTodos(afterDeleteData);
    // localStorage.setItem('todos', JSON.stringify(afterDeleteData));
    //db data
    axios.post(`http://127.0.0.1:3333/todos/${id}/delete`,)
    .then(res => console.log('delete done ',res))
    .catch(err => console.log(err))

    setUpdate((pre)=>pre+1);

  };

  



  return (
    <>
      <h1>{userid}</h1>
      <AddTodo open={open} setOpen={setOpen} setUpdate={setUpdate} userid={userid} />
      <EditTodo open={openEdit} setOpen={setOpenEdit} setUpdate={setUpdate} editTodoId={editTodoId} editData={editData}  userid={userid}/>

      {/* <BackDataCheck></BackDataCheck> */}
      <div className="overflow-x-auto m-10">
        <div className="flex justify-between mb-4">
          {/* <div className="flex items-center">
            <select
              className="mr-2 px-2 py-1 border border-gray-300 bg-white rounded-md my-10"
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
          </div> */}
         
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-28 my-10 " onClick={() => setOpen(true)}>Add Task</button>

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
              ?.filter(todo => todo.userid === userid)
              ?.map((todo) => (
                
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

export default TodoApp;
