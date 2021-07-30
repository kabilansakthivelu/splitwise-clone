import React from "react";
import { useState, useEffect, useReducer } from "react";
import { FaPlus, FaPen, FaTimes } from "react-icons/fa";
import Products from "./Products";

const reducer = (state, action) => {
  if (action.type === "EMPTY_NAME") {
    return { ...state, emptyname: true };
  }
};

const People = () => {
  const defaultState = {
    emptyname: false,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const addPeople = () => {
    if (
      document.getElementById("people-panel-input-field").value !== "" &&
      document.getElementById("people-panel-input-field").value !== " "
    ) {
      state.emptyname = false;
      let key = new Date().getTime().toString();
      let value1 = document.getElementById("people-panel-input-field").value;
      let value2 = "";
      let value5 = "";
      const value3 = {
        name: value1,
        amountSpent: value2,
        productName: value5,
      };
      let obj1 = {
        id: key,
        name: value1,
        amountSpent: value2,
        productName: value5,
      };
      setPeople([...people, obj1]);
      let value4 = JSON.stringify(value3);
      localStorage.setItem(key, value4);
      document.getElementById("people-panel-input-field").value = "";
    } else {
      dispatch({ type: "EMPTY_NAME" });
    }
  };

  const [people, setPeople] = useState([]);

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let initialLoad = localStorage.key(i);
      let initialGetValue = localStorage.getItem(initialLoad);
      let parsingData = JSON.parse(initialGetValue);
      let obj = {
        id: initialLoad,
        name: parsingData.name,
        amountSpent: parsingData.amountSpent,
        productName: parsingData.productName,
      };
      people.push(obj);
      setPeople([...people]);
    }
  }, []);

  const clearPeople = () => {
    localStorage.clear();
    setPeople([]);
  };

  const deletePerson = (id) => {
    localStorage.removeItem(id);
    setPeople(
      people.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <>
      <div className="peoplePanel">
        <div className="people-panel-header">
          <p className="people-panel-heading">People</p>
          <button className="people-panel-clear-button" onClick={clearPeople}>
            Clear
          </button>
        </div>
        <table className="people-panel-table">
          <tbody>
            {people.map((item) => {
              return (
                <tr key={item.id} id={item.id}>
                  <td className="people-panel-table-row">
                    {item.name}
                    <FaTimes
                      className="delete-people-details"
                      onClick={() => deletePerson(item.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="people-panel-add-person">ADD PERSON</p>
        <input
          type="text"
          placeholder="Name.."
          className="people-panel-input-field"
          id="people-panel-input-field"
        />
        <button className="people-panel-add-button" onClick={addPeople}>
          <FaPlus /> Add
        </button>
        {state.emptyname ? (
          <p className="warning">Please enter a name</p>
        ) : (
          <p>Note: This field is case sensitive</p>
        )}
      </div>
      <Products people={people} setPeople={setPeople} />
    </>
  );
};

export default People;
