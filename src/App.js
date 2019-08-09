import React from "react";
import Header from "./Components/Header/Header";
import Table from "./Components/Table/Table";
import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <div className=" card mx-3 my-1 mt-4 jumbo">
        <Header />
        <Table />
      </div>
    </div>
  );
};

export default App;
