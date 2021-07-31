import React from "react";
import Results from "./Results";
import { useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "EMPTY_SUBMISSION") {
    return {
      ...state,
      emptySubmission: true,
    };
  }
  if (action.type === "NAME_NO_MATCH") {
    return {
      ...state,
      isNameMatching: false,
    };
  }
};

const Products = (props) => {
  const defaultState = {
    emptySubmission: false,
    isNameMatching: true,
    emptyName: false,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const addingProduct = (productName, person, amount) => {
    if (productName !== "" && amount !== "" && person !== "") {
      let idToBeUpdated = props.people.find((items) => {
        return items.name === person;
      });
      if (idToBeUpdated === undefined) {
        dispatch({ type: "NAME_NO_MATCH" });
        state.isNameMatching = true;
      } else {
        state.emptySubmission = false;
        state.isNameMatching = true;
        let value1 = person;
        let value2 = amount;
        let value5 = productName;
        const value3 = {
          name: value1,
          amountSpent: value2,
          productName: value5,
        };
        let obj1 = {
          id: idToBeUpdated.id,
          name: value1,
          amountSpent: value2,
          productName: value5,
        };
        let removeDuplication = props.people.find((items) => {
          return items.id === obj1.id;
        });
        let index = props.people.indexOf(removeDuplication);
        props.people.splice(index, 1);
        props.setPeople([...props.people, obj1]);
        let value4 = JSON.stringify(value3);
        localStorage.setItem(idToBeUpdated.id, value4);
        document.getElementById("productName").value = "";
        document.getElementById("broughtBy").value = "";
        document.getElementById("amountOfTheProduct").value = "";
      }
    }
    if (productName === "" || amount === "" || person === "") {
      dispatch({ type: "EMPTY_SUBMISSION" });
    }
  };

  let totalAmount = 0;

  const test = props.people.filter((items) => {
    return items.amountSpent !== "";
  });

  test.map((items) => {
    let amountInteger = parseInt(items.amountSpent);
    if (amountInteger !== "NaN") {
      totalAmount += amountInteger;
    }
  });

  let costPerPerson;
  if (props.people.length > 0) {
    costPerPerson = totalAmount / props.people.length;
  } else {
    costPerPerson = 0;
  }

  return (
    <>
      <div className="productsPanel">
        <p className="products-panel-heading">Products</p>
        <table className="people-panel-table">
          <tbody>
            {props.people.map((items) => {
              if (items.productName !== "") {
                return (
                  <tr key={items.id}>
                    <td className="people-panel-table-row">
                      {items.productName}
                      <span className="products-panel-item-buyer">
                        {items.name}
                      </span>
                      <span className="products-panel-table-row-amount">
                        {items.amountSpent} Rs
                      </span>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <p className="products-panel-add-products">ADD PRODUCT</p>
        <div>
          <input
            type="text"
            placeholder="Product name...."
            className="productName"
            id="productName"
          />
          <input
            type="text"
            placeholder="Brought by...."
            className="broughtBy"
            id="broughtBy"
          />
          <input
            type="number"
            placeholder="Amount...."
            className="amountOfTheProduct"
            id="amountOfTheProduct"
          />
          <p className="priceButton">Rs</p>
        </div>
        <button
          className="addProductButton"
          onClick={() => {
            addingProduct(
              document.getElementById("productName").value,
              document.getElementById("broughtBy").value,
              document.getElementById("amountOfTheProduct").value
            );
          }}
        >
          Add product
        </button>
        {state.emptySubmission ? (
          <p className="warning">Please enter values for all the fields</p>
        ) : (
          <p>
            Note: Enter "Brought by" field with a matching text entered in
            People section
          </p>
        )}
        {state.isNameMatching === false ? (
          <p className="warning">
            Entered name is not matching with your people name
          </p>
        ) : (
          <p>Brought By field is case sensitive</p>
        )}
      </div>
      <Results
        people={props.people}
        setPeople={props.setPeople}
        costPerPerson={costPerPerson}
        totalAmount={totalAmount}
      />
    </>
  );
};

export default Products;
