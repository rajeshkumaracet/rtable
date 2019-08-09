import React, { Component } from "react";
import Loader from "../Loader/Loader";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import axios from "axios";
import "../../App.css";

export class Table extends Component {
  state = {
    users: [],
    dec: 0,
    loading: false,
    length: "",
    perPage: 5
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const val = this.state.length - (this.state.length - this.state.perPage);
    const intial = res.data.splice(this.state.inital, val);

    this.setState({
      dec: this.state.length - (this.state.length - this.state.perPage),
      users: intial,
      loading: false,
      length: res.data.length
    });
  };

  incrementHandler = async () => {
    this.setState({
      loading: true
    });
    const res1 = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const inc = res1.data.filter(cur => {
      if (this.state.dec.length > this.state.length) {
        console.log("error");
      } else {
        return (
          cur.id >= this.state.dec + 1 &&
          cur.id <= this.state.dec + this.state.perPage
        );
      }
    });

    this.setState({
      users: inc,
      dec: this.state.dec + this.state.perPage,
      loading: false
    });
  };

  previousHandler = async () => {
    this.setState({
      loading: true
    });
    const res1 = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const decre = res1.data.filter(cur => {
      console.log(cur.id);
      console.log(this.state.dec);

      return (
        cur.id >= this.state.dec - this.state.perPage + 1 &&
        cur.id <= this.state.dec
      );
    });

    this.setState(prevState => ({
      users: decre,
      loading: false,
      dec: prevState.dec - this.state.perPage
    }));
  };

  selectChangeHandler = e => {
    this.setState({
      perPage: Number(e.target.value)
    });
    toast.notify(`😄 No of Rows now set to ${this.state.perPage + 5}!`);
  };

  render() {
    const table = this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td className="mx-5">{user.name.substr(0, 10)}</td>
          <td>{user.email}</td>
          <td>{user.body.substr(0, 100)}</td>
        </tr>
      );
    });
    return (
      <>
        {this.state.loading === true ? (
          <div className="text-center fixpos">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mx-3">
              <p className="lead d-flex justify-content-end">
                Total no of records:&nbsp; <b>{this.state.length + 5}</b>
              </p>

              <table
                style={{ tableLayout: "fixed" }}
                className="table table-hover responsive table-bordered"
              >
                <thead className="thead-dark  ">
                  <tr>
                    <th style={{ width: "5%" }} scope="col">
                      ID
                    </th>
                    <th style={{ width: "10%" }} scope="col" className="mx-5">
                      NAME
                    </th>
                    <th style={{ width: "20%" }} scope="col">
                      EMAIL
                    </th>
                    <th style={{ width: "35%" }} scope="col">
                      DESCRIPTION
                    </th>
                  </tr>
                </thead>
                <tbody>{table}</tbody>
              </table>
            </div>
          </>
        )}
        <div className="d-flex justify-content-between my-2 mx-3 mb-5 align-items-baseline ">
          <button
            className="btn btn-outline-secondary"
            onClick={this.previousHandler}
          >
            <i className="fas fa-arrow-left" /> Previous
          </button>
          <div className="form-group">
            <select
              className="form-control text-center"
              style={{ width: "100px" }}
              onChange={this.selectChangeHandler}
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="15">15 rows</option>
              <option value="20">20 rows</option>
              <option value="25">25 rows</option>
            </select>
          </div>
          <button
            className={`${
              this.state.dec < 0
                ? "btn btn-block btn-outline-secondary"
                : "btn btn-outline-secondary"
            }`}
            onClick={this.incrementHandler}
          >
            Next <i className="fas fa-arrow-right" />
          </button>
        </div>
      </>
    );
  }
}

export default Table;
