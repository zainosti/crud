import React, { useEffect, useState } from "react";
import axios from "axios";
import Btn from "./components/button";
import Table from "./components/table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    name: "",
    age: "",
    colour: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const myData = JSON.parse(localStorage.getItem("myData"));

  const getData = () => {
    try {
      axios
        .get(
          "https://crudcrud.com/api/98a6fe2849ce443fb3f0828871325c9a/unicorns  "
        )
        .then((response) => {
          console.log(response);
          setData(response.data);
          localStorage.setItem("myData", JSON.stringify(response.data));
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };
  const post = () => {
    let info = JSON.stringify(user);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://crudcrud.com/api/98a6fe2849ce443fb3f0828871325c9a/unicorns",
      headers: {
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        // setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(getData, 3000);
  };

  useEffect(() => {
    if (myData?.length > 0) {
      setData(myData);
    }
  }, []);
  return (
    <div className="p-5">
      <Btn btn_name="Get Data" click={getData} class="btn btn-info" />
      <label className="ps-2 pe-2">Name</label>
      <input
        type="text"
        name="name"
        defaultValue={user.name}
        onChange={handleUserChange}
      />
      <label className="ps-2 pe-2">Age</label>
      <input
        type="text"
        name="age"
        defaultValue={user.age}
        onChange={handleUserChange}
      />
      <label className="ps-2 pe-2">Color</label>
      <input
        type="text"
        name="colour"
        defaultValue={user.colour}
        onChange={handleUserChange}
      />
      <Btn btn_name="post new data" click={post} class="btn btn-danger ms-2" />
      <table class="table table-dark table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Color</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <>
              <Table
                item={item}
                index={index}
                getData={getData}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
              />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
