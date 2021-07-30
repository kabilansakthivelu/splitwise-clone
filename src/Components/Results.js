import React from "react";

const Results = (props) => {
  const transactionsToBeMade = props.people.filter((items) => {
    return items.amountSpent < props.costPerPerson;
  });

  return (
    <>
      <div className="resultsPanel">
        <h2>Results</h2>
        <div className="results-panel-summary">
          <p>People count: {props.people.length}</p>
          <p>Total products value: {props.totalAmount} Rs</p>
          <p>Cost per person : {props.costPerPerson} Rs / person</p>
        </div>
        <p className="results-panel-transactions-heading">
          Pending Transactions :
        </p>
        <div className="results-panel-transactions">
          {transactionsToBeMade.length === 0 ? (
            <p className="no-warning">NIL</p>
          ) : (
            transactionsToBeMade.map((items) => {
              return (
                <p key={items.id}>
                  {items.name} has to give{" "}
                  {props.costPerPerson - items.amountSpent} Rs in total
                </p>
              );
            })
          )}
          {/* {props.people.map((item) => {
            
            }
          })} */}
        </div>
      </div>
    </>
  );
};

export default Results;
