import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { MdOutlineCancel } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { OnlineUserContext } from "../App";

interface FormData {
  userid: number;
  id:number;
  title: string;
  description: string;
  priority: string;
  tags: string;
}

interface Model2Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
  editTodoId: string;
  editData: FormData;
  userid: number;
}

const EditTodo: React.FC<Model2Props> = ({
  open,
  setOpen,
  setUpdate,
  editTodoId,
  editData,
  userid
}) => {
  
  //console.log(userid);
  //console.log("edit TodoId ", editTodoId);
  //   const [editData, setEditData] = React.useState<FormData | null>(null);

  //console.log('edit data pass by final ',editData)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: editData, // Set defaultValues to editData
  });


  const { currentLoginUser} = React.useContext(OnlineUserContext);

  React.useEffect(() => {
  //  console.log('edit  id change sdasdas dsa dsa', editData)
    reset(editData)
  }, [editTodoId])

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('submit data ', data);
     
    const curTodo = {
      userid: currentLoginUser.userid,
      title: data.title,
      description: data.description,
      priority: data.priority,
      tags: data.tags,
    };

    console.log('before hit',curTodo)
    axios.post(`http://127.0.0.1:3333/todos/${editTodoId}/update`,curTodo)
    .then(res => console.log('respose ',res))
    .catch(err => console.log(err))
      setUpdate((pre) => pre + 1);

      setOpen(false);
  
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
          className="mb-0 pb-0"
        >
          <div className="flex items-center justify-between">
            <h1 className="font-400">Edit_Task</h1>
            <div className="text-3xl w-[10%]" onClick={() => setOpen(false)}>
              x
            </div>
          </div>

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
                className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? "border-red-500" : ""
                  }`}
                id="title"
                type="text"
                placeholder="Enter title"
                defaultValue={'hello'}
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
                className={`w-full h-24 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? "border-red-500" : ""
                  }`}
                id="description"
                placeholder="Enter description"
                defaultValue={editData?.description || ""}
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
                className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.priority ? "border-red-500" : ""
                  }`}
                id="priority"
                defaultValue={editData?.priority || ""}
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
                className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.tags ? "border-red-500" : ""
                  }`}
                id="tags"
                type="text"
                placeholder="Enter tags"
                defaultValue={editData?.tags || ""}
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
                Save  Update
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditTodo;
