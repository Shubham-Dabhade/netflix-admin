import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { useEffect } from "react";
import { getUsers } from "../../context/userContext/apiCalls";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const {users,dispatch} = useContext(UserContext);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  useEffect(()=>{
    console.log("calling in the users");
    getUsers(dispatch);
  },[dispatch]);
  
  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    { field: "profilePic", headerName: "profilePic", width: 190 },
    { field: "username", headerName: "username", width: 190 },
    { field: "email", headerName: "email", width: 190 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/user/" + params.row._id, list: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r)=>r._id}
      />
    </div>
  );
}
