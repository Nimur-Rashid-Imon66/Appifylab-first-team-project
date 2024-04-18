import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MdOutlineCancel } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
interface FormData {
  title: string;
  description: string;
  priority: string;
  tags: string;
}

interface Model2Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate:React.Dispatch<React.SetStateAction<number>>
}

const AddTodo: React.FC<Model2Props> = ({ open, setOpen , setUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    const uuid = uuidv4();
    const curTodo = {
      id: uuid,
      title: data.title,
      description: data.description,
      priority: data.priority,
      tags: data.tags,
    };
    const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    console.log(existingTodos);

    const updatedTodos = [curTodo , ...existingTodos];
    console.log(updatedTodos);

   localStorage.setItem('todos', JSON.stringify(updatedTodos));

    reset();
    setOpen(false);    
    setUpdate((pre)=>pre+1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="md"
        className="mx-auto"
        sx={{
          width: "50%",
          "@media (min-width:1000px)": {
            width: "50%",
          },
          "@media (min-width:1224px)": {
            width: "50%",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="flex items-center justify-between mb-0 pb-0"
        >
          <h1 className="mx-4 font-400">Add Todo</h1>
          <button className="mx-8 text-3xl" onClick={() => setOpen(false)}>
            <MdOutlineCancel />
          </button>
        </DialogTitle>

        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-0 pb-8"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title:
              </label>
              <input
                className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.title ? "border-red-500" : ""
                }`}
                id="title"
                type="text"
                placeholder="Enter title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs italic">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                className={`w-full h-24 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.description ? "border-red-500" : ""
                }`}
                id="description"
                placeholder="Enter description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority:
              </label>
              <select
                className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.priority ? "border-red-500" : ""
                }`}
                id="priority"
                {...register("priority", { required: true })}
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-xs italic">
                  Please select priority
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tags"
              >
                Tags:
              </label>
              <input
                className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.tags ? "border-red-500" : ""
                }`}
                id="tags"
                type="text"
                placeholder="Enter tags"
                {...register("tags", { required: true })}
              />
              {errors.tags && (
                <p className="text-red-500 text-xs italic">
                  This field is required
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
                type="submit"
              >
                Add Task
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddTodo;
