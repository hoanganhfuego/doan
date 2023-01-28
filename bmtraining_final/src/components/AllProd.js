import React, { Component } from 'react';
import CardItem from './CardItem';
import './ListProd.css';
import { useParams } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ip from '../services/ip.json';
import authHeader from '../services/auth-header';

const useStyles = (theme) => ({
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  }
});

class AllProd extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.findCategory = this.findCategory.bind(this);
    this.state = {
      items: [],
      itemPerPage: 8,
      currentPage: 1
    }
  }

  handlePageChange(event, value) {
    this.setState(
      {
        currentPage: value,
      },
      () => {
        this.findCategory(this.state.currentPage);
      }
    );
  }

  componentDidMount() {
    this.findCategory(this.state.currentPage);
  }

  findCategory(currentPage) {
    currentPage -= 1;
    if (this.props.myHookValue === 'apparel') {
      axios.get("http://" + ip.ip + ":1999/api/products/category/apparel?page=" + currentPage + "&size=" + this.state.itemPerPage, { headers: authHeader() }).then((response) => {
        this.setState({
          items: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          currentPage: response.data.number + 1
        })
      });
    } else if (this.props.myHookValue === 'accessories') {
      axios.get("http://" + ip.ip + ":1999/api/products/category/accessories?page=" + currentPage + "&size=" + this.state.itemPerPage, { headers: authHeader() }).then((response) => {
        this.setState({
          items: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          currentPage: response.data.number + 1
        })
      });
    } else {
      axios.get("http://" + ip.ip + ":1999/api/products/category/supplement?page=" + currentPage + "&size=" + this.state.itemPerPage, { headers: authHeader() }).then((response) => {
        this.setState({
          items: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          currentPage: response.data.number + 1
        })
      });
    }
  }

  render() {
    
    const { classes } = this.props;
    return (
      <>
        <h1>SHOP {`${this.props.myHookValue}`.toLocaleUpperCase()}</h1>

        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__item_lists'>
              {
                this.state.items.map(
                  supplement =>
                    <CardItem
                      src={supplement.image1}
                      prodName={supplement.productname}
                      price={supplement.price}
                      path={`/details/${supplement.id}`}
                    />
                )
              }
            </ul>
          </div>
        </div>
        <Box my={4} className={classes.paginationContainer}>
          <Pagination
            count={this.state.totalPages}
            page={this.state.currentPage}
            onChange={this.handlePageChange}
          />
        </Box>
      </>
    )
  }
}

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useParams();
    return <Component {...props} myHookValue={myHookValue.category} />;
  }
}

export default withMyHook(withStyles(useStyles)(AllProd));