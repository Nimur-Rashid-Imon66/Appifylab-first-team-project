import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Income from "./Expenses/Income";
import Expense from "./Expenses/Expense";
import ExpenseHome from "./Expenses/Home";
import Mushahid from "./Mushahid";
import TodoApps from "./Falak/TodoApp";
import TodoLists from "./Falak/TodoLists";
import Mainpage from "./Authentication/Mainpage";
import UserRegistration from "./Authentication/UserRegistration";
import UserLogIn from "./Authentication/UserLogIn";
import AddProductCategory from "./Components/EMON/AddProductCategory";
import AddProduct from "./Components/EMON/AddProduct";
import ShowProduct from "./Components/EMON/ShowProduct";
import EditProduct from "./Components/EMON/EditProduct";
import NavBar from "./Navbar/NavBar";
import PrivateRouting from "./Authentication/PrivateRouting";
import PrivateRoutingLog from "./Authentication/PrivateRoutingLog";
import ModalParent from "./Components/Modal Practice/ModalParent";


export interface categoryInterface {
  categoryname: string;
}
interface categoryContextInterface {  
  category: categoryInterface[] ;
  setCategory: React.Dispatch<React.SetStateAction<categoryInterface[]>>
}

export const OnlineUserContext = createContext({});
const categoryContext = createContext<categoryContextInterface>({category:[],setCategory:()=>{}});

export function useCategoryContext() {
  const category = useContext(categoryContext);
  return category;
}

interface UserData {
  userid?: string;
  username?: string;
  email?: string;
  password?: string;
  id?: number;
}

const App: React.FC = () => {
  const storedData = localStorage.getItem("localhostonlineusesr");
  let onlineUserFromLocalHost: UserData;

  if (storedData) {
    try {
      onlineUserFromLocalHost = JSON.parse(storedData);
    } catch (error) {
      //  console.error("Error parsing JSON:", error);
      onlineUserFromLocalHost = { id: -1 };
    }
  } else {
    onlineUserFromLocalHost = { id: -1 };
  }
  const [currentLoginUser, setCurrentLoginUser] = useState<UserData>(onlineUserFromLocalHost);
  const [category, setCategory] = useState<categoryInterface[]>([]);
  // const [indpro,setIndpro] = useState<ProductInterface>({} as ProductInterface);
  // const getdata: UserData[] = JSON.parse(
  //   localStorage.getItem("localhostUserData") || "[]"
  // );
  // const localhostUserData: UserData[] = getdata;

  // const addUser = (
  //   userid: string,
  //   username: string,
  //   email: string,
  //   password: string
  // ) => {
  //   localhostUserData.push({ userid, username, email, password });
  //   localStorage.setItem(
  //     "localhostUserData",
  //     JSON.stringify(localhostUserData)
  //   );
  //   console.log("user", localhostUserData);
  // };

  return (
    <>
      <OnlineUserContext.Provider
        value={{ currentLoginUser, setCurrentLoginUser }}
      >
      <categoryContext.Provider value={{category,setCategory}}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutingLog />}>
              <Route path="/registration" element={<UserRegistration />} />
              <Route path="/login" element={<UserLogIn />} />
            </Route>
            <Route path="/" element={<PrivateRouting />}>
              <Route path="/expense-management" element={<ExpenseHome />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              {/* <Route path="/ahsan" element={<Ahsan />} /> */}
              <Route path="/mushahid" element={<Mushahid />} />

              <Route path="/todoapps" element={<TodoApps />} />
              <Route path="/todoLists" element={<TodoLists />} />
             
                <Route path="/addProductCategory" element={<AddProductCategory />}/>
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/showProducts" element={<ShowProduct />} />
                <Route path="/editProduct/:id" element={<EditProduct />} />
                <Route path="/modal" element={<ModalParent />} />
              

              <Route path="/" element={<Mainpage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </categoryContext.Provider>
      </OnlineUserContext.Provider>
    </>
  );
};

export default App;
