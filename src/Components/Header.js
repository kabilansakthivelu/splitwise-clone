import React from "react";

const Header = (props) => {
  return (
    <>
      <header className="header">
        <h1 className="heading">{props.title}</h1>
      </header>
    </>
  );
};

export default Header;
