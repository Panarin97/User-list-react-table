import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";


function App() {

  // initialize data and form data for the table and store in state objects
  const [personal_data, setData] = useState(data);
  const [newUserFormData, setNewUserFormData] = useState({firstname: "", lastname: "", age: ""});
  const [editUserFormData, setEditUserFormData] = useState({firstname: "", lastname: "", age: ""});
  const [curUserId, setCurUserId] = useState(null); // done for determining which row is being updated atm

  // handle new user form change
  const NewUserFormChange = (event) => {
    event.preventDefault();

    const field = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newData = {...newUserFormData };
    newData[field] = fieldValue;

    setNewUserFormData(newData);
  }

  // handle edit user form change
  const EditUserFormChange = (event) => {
    event.preventDefault();

    const field = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newData = {...editUserFormData };
    newData[field] = fieldValue;

    setEditUserFormData(newData);
  }

  // handle submitting new data
  const NewUserFormSubmit = (event) => {
    event.preventDefault();

    // create new object with user details + id and update the data
    const newUser = {id: nanoid(), 
                     firstname: newUserFormData.firstname, 
                     lastname: newUserFormData.lastname, 
                     age: newUserFormData.age};

    const updatedData = [...personal_data, newUser];
    setData(updatedData);
  }

  // handle editing data
  const EditUserFormSubmit = (event) => {
    event.preventDefault();

    // create new object with edited user details + id and update the data
    const userEdit = {id: curUserId, 
                      firstname: editUserFormData.firstname, 
                      lastname: editUserFormData.lastname, 
                      age: editUserFormData.age};

    const updatedData = [...personal_data];
    const index = personal_data.findIndex((user) => user.id === curUserId);
    updatedData[index] = userEdit;
    setData(updatedData);

    // reset the currently edited id
    setCurUserId(null);
  }

  const editClick = (event, user) => {
    event.preventDefault();
    setCurUserId(user.id);

    const editedValues = {firstname: user.firstname, lastname: user.lastname, age: user.age
    };

    setEditUserFormData(editedValues);
  }


  const deleteClick = (deleteId) => {
    const updatedData = [...personal_data];
    const index = personal_data.findIndex((user) => user.id === deleteId);
    updatedData.splice(index, 1);
    setData(updatedData);
  }


  return (
    <div className="table-app">
      <h1>React table</h1>
      <div className="first" id="rectangle">
        <h2>Enter new personal information</h2>

        <form onSubmit={NewUserFormSubmit}>
          <input
                type="text"
                name="firstname"
                required="required"
                onChange={NewUserFormChange}
                placeholder="Enter first name/Kirjoita etunimesi"
          />
          <input
                type="text"
                name="lastname"
                required="required"
                onChange={NewUserFormChange}
                placeholder="Enter last name/Kirjoita sukunimesi"
          />
          <input
                type="text"
                name="age"
                required="required"
                onChange={NewUserFormChange}
                placeholder="Enter your age/Kirjoita ikäsi"
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="second">
        <h2>List of users</h2>

        <form onSubmit={EditUserFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>First name/Etunimi</th>
                <th>Last name/Sukunimi</th>
                <th>Age/Ikä</th>
                <th>Commands</th>
              </tr>
            </thead>
            <tbody>
              {personal_data.map((user) => (
                <Fragment>
                  {curUserId === user.id ? (
                    <tr>
                      <td>
                        <input
                          type="text"
                          required="required"
                          placeholder="Enter first name/Kirjoita etunimesi"
                          name="firstname"
                          value={editUserFormData.firstname}
                          onChange={EditUserFormChange}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="text"
                          required="required"
                          placeholder="Enter last name/Kirjoita sukunimesi"
                          name="lastname"
                          value={editUserFormData.lastname}
                          onChange={EditUserFormChange}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="text"
                          required="required"
                          placeholder="Enter your age/Kirjoita ikäsi"
                          name="age"
                          value={editUserFormData.age}
                          onChange={EditUserFormChange}
                        ></input>
                      </td>
                      <td>
                        <button id="confirmButton" type="submit">Confirm</button>
                      </td>
                  </tr>
                  ) : (
                  <tr>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.age}</td>
                    <td>
                      <button id="editButton" onClick={(event) => editClick(event, user)}>Change</button>
                      <button id="deleteButton" onClick={() => deleteClick(user.id)}>Delete</button>
                    </td>
                  </tr>)}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default App;
