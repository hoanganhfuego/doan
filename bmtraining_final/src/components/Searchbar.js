import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Searchbar.css';
import Form from "react-validation/build/form";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
  }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUserInput = this.onChangeUserInput.bind(this);
  }

  onChangeUserInput(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/searchshop/${this.state.userInput}`);
    await this.refresh();
  }

  refresh() {

  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>

          <div className='searchbar'>
            <div className="input-group rounded">

              <input type="search" className="form-control rounded" placeholder="Search....." aria-label="Search"
                aria-describedby="search-addon" id="search-input" value={this.state.userInput} onChange={this.onChangeUserInput}/>
              <span className="input-group-text border-0 noborder" id="search-addon">
                <button className='search-links' id="search-button" >
                  <i className="fas fa-search"></i>
                </button>
              </span>

            </div>

          </div>
        </Form>
      </>

    );
  }
}


export default withRouter(Searchbar);


