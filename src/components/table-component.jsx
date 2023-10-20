import axios from "axios";
import React, { useState } from "react";

const Table = (props) => {
  console.log(props);
  const [text, setText] = useState(props.item);
  const [showContent, setShowContent] = useState(false);
  // const [save, setSave] = useState(false);
  const save = props.editingIndex === props.index;

  const [putUser, setPutUser] = useState({
    name: "",
    age: "",
    colour: "",
  });
  const handleEdit = () => {
    setShowContent(!showContent);
    props.setEditingIndex(props.index);
  };
  const handleSave = (e) => {
    // setSave(false);
    let updatedInfo = JSON.stringify(putUser);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://crudcrud.com/api/98a6fe2849ce443fb3f0828871325c9a/unicorns/${props.item?._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedInfo,
    };
    console.log(config.url);
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    setShowContent(!showContent);
    setTimeout(props.getData, 3000);
  };
  const handleDelete = (e) => {
    let data = "";
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://crudcrud.com/api/98a6fe2849ce443fb3f0828871325c9a/unicorns/${props.item?._id}`,
      headers: {},
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(props.getData, 3000);
  };
  const handlePutUser = (e) => {
    const { name, value } = e.target;
    setPutUser((putUser) => ({
      ...putUser,
      [name]: value,
    }));
    console.log(putUser);
    setText((text) => ({
      ...text,
      [name]: value,
    }));
  };
  return (
    <>
      <tr key={props?.index} className="table-secondary">
        <th scope="row">{props.index + 1}</th>
        <td>
          {showContent ? (
            <div className="mb-2">
              <input
                type="text"
                className="form-control w-25"
                name="name"
                value={`${text.name}`}
                onChange={handlePutUser}
              ></input>
            </div>
          ) : (
            <p>{props.item?.name}</p>
          )}
        </td>
        <td>
          {showContent ? (
            <div className="mb-2">
              <input
                type="text"
                className="form-control w-25"
                name="age"
                value={text.age}
                onChange={handlePutUser}
              ></input>
            </div>
          ) : (
            <p>{props.item?.age}</p>
          )}
        </td>
        <td>
          {showContent ? (
            <div className="mb-2">
              <input
                type="text"
                className="form-control w-25"
                name="colour"
                value={text.colour}
                onChange={handlePutUser}
              ></input>
            </div>
          ) : (
            <p>{props.item?.colour}</p>
          )}
        </td>
        <td>
          <span className="bg-red">
            {save ? (
              <div onClick={handleSave}>
                <button className="btn btn-secondary" key={props.item?._id}>
                  <div className="bg-red">save</div>
                </button>
              </div>
            ) : (
              <span onClick={handleEdit}>
                <svg
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill text-success"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </span>
            )}
          </span>
          <svg
            style={{ cursor: "pointer" }}
            key={props.item?._id}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash ms-2 text-danger"
            viewBox="0 0 16 16"
            onClick={handleDelete}
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
        </td>
      </tr>
    </>
  );
};

export default Table;
