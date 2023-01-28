import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Pagination from '@material-ui/lab/Pagination';
import './PostContainer.css'
import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import ForumService from '../services/ForumService';
import './Searchbar.css';

const useStyles = (theme) => ({
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  }
});

class PostContainer extends Component {
  constructor(props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this);
    this.findAllForum = this.findAllForum.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.state = {
      forum: [],
      itemPerPage: 6,
      currentPage: 1,
      searchTitle: ""
    }
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
    console.log(searchTitle);
    if(searchTitle === ""){
      this.findAllForum(this.state.currentPage);
    } else {
      this.searchTitle(this.state.currentPage);
    }
  }

  componentDidMount() {
    this.findAllForum(this.state.currentPage);
  }

  handlePageChange(event, value) {
    this.setState(
      {
        currentPage: value,
      },
      () => {
        if (this.state.searchTitle) {
          this.searchTitle(this.state.currentPage);
        } else {
          this.findAllForum(this.state.currentPage);
        }
      }
    );
  }

  searchChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  searchTitle(currentPage) {
    if (this.state.searchTitle) {
      currentPage -= 1;
      ForumService.searchTitle(this.state.searchTitle + "?page=" + currentPage + "&size=" + this.state.itemPerPage)
        .then((response) => {
          this.setState({
            forum: response.data.content,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            currentPage: response.data.number + 1
          })
        });
    } else {
      this.findAllForum(this.state.currentPage);
    }
  }

  findAllForum(currentPage) {
    currentPage -= 1;
    ForumService.getAllForum("?page=" + currentPage + "&size=" + this.state.itemPerPage).then((response) => {
      this.setState({
        forum: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        currentPage: response.data.number + 1
      })
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Container maxWidth="lg" className={classes.blogsContainer}>
        <div className='searchbar'>
          <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search....." aria-label="Search"
              aria-describedby="search-addon" id="search-input" onChange={this.onChangeSearchTitle} />
            <span className="input-group-text border-0 noborder" id="search-addon">
              <button className='search-links' id="search-button" onClick={this.searchTitle}>
                <i className="fas fa-search"></i>
              </button>
            </span>
          </div>
        </div>
          <Typography variant="h4" className={classes.blogTitle}>
            Articles
          </Typography>
          <Grid container spacing={3}>
            {
              this.state.forum.map(
                item =>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={item.image}
                          title={item.title}
                          onClick={() => this.props.history.push(`forum/${item.postid}`)}
                        />
                        <CardContent className="content">
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                          <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                          <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                              Admin
                      </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p">
                              {`${item.ctime}`.slice(0, 10)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <BookmarkBorderIcon />
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
              )
            }
          </Grid>
          <Box my={4} className={classes.paginationContainer}>
            <Pagination
              count={this.state.totalPages}
              page={this.state.currentPage}
              onChange={this.handlePageChange}
            />
          </Box>
        </Container>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(PostContainer));
