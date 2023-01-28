import React from 'react'
import { Component } from 'react'
import './PostDescription.css'
import ForumService from '../services/ForumService'
import AuthService from '../services/auth.service'
import { useParams, withRouter } from 'react-router-dom';
import Form from "react-validation/build/form";
import { FacebookProvider, ShareButton } from 'react-facebook';

class PostDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forum: [],
            comment: [],
            currentUser: undefined,
            userInput: "",
            clicked: false,
            n: "",
            t: "",
            c: ""
        }
        this.onChangeUserInput = this.onChangeUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ForumService.getDetailForum(this.props.myHookValue).then((response) => {
            this.setState({ forum: response.data })
        });
        ForumService.getCommentOfThatForum(this.props.myHookValue).then((response) => {
            this.setState({ comment: response.data })
        });
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            })
            this.setState({
                n: user.username,
            })
        }
    }

    onChangeUserInput(e) {
        this.setState({
            userInput: e.target.value
        });
    }

    async handleSubmit(event) {
        if (this.state.n) {
            event.preventDefault();
            await ForumService.saveCmt(this.state.n, this.state.userInput, this.props.myHookValue);
            await this.refresh();
        } else {
            window.confirm("You must login to do this function!");
            this.props.history.push("/login");
        }

    }

    refresh() {
        ForumService.getCommentOfThatForum(this.props.myHookValue).then((response) => {
            this.setState({
                comment: response.data,
                userInput: ""
            })
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.forum.map(item => (
                        <div>
                            <p className="description">
                                {item.content}
                                <br />
                                <FacebookProvider appId="1361592584220078">
                                    <ShareButton href={window.location.href} className="sharebtn" >
                                        <i className="fab fa-facebook-f"></i> Share
                                    </ShareButton>
                                </FacebookProvider>
                            </p>
                            <hr />
                            <h1>Comments</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-8">
                                        <textarea wrap="hard" className="form-control" id="comment" rows="3" placeholder="Leave a comment here" value={this.state.userInput} onChange={this.onChangeUserInput}></textarea>
                                    </div>
                                    <div className="col-4">
                                        <button className="post-button">Post</button>
                                    </div>
                                </div>
                            </Form>
                            {
                                this.state.comment.map(
                                    item => (
                                        <div>
                                            <div className="row">
                                                <div className="col-8 col-sm-8 name">{item.uname}</div>
                                                <div className="col-4 col-sm-4 time">{item.cctime}</div>

                                                <div className="w-100 d-none d-md-block"></div>
                                                <div className="col-6 col-sm-4" className="preline">{item.ccomment}</div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                )
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useParams();
        return <Component {...props} myHookValue={myHookValue.id} />;
    }
}

export default withRouter(withMyHook(PostDescription))
