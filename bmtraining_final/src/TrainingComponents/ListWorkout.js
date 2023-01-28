import React from 'react';
import { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import program from '../services/program';
import { useParams } from 'react-router-dom';
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

class ListWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isOpen: false,
            link: ""
        }
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    componentDidMount() {
        program.getListWorkout(this.props.myHookValue).then((response) => {
            this.setState({
                list: response.data
            })
        });
    }

    filterID(youtubeLink) {
        var video_id = youtubeLink.split('v=')[1];
        var tempLink = video_id.indexOf('&');
        if (tempLink !== -1) {
            video_id = video_id.substring(0, tempLink);
        }
        this.setState({
            link: video_id
        })
    }

    render() {
        return (
            <>
                <h1>List Workout</h1>
                <ListGroup classname="listcontainer">
                    {
                        this.state.list.map(
                            item => (
                                <>
                                    <ModalVideo
                                        channel="youtube"
                                        isOpen={this.state.isOpen}
                                        videoId={this.state.link}
                                        onClose={() => this.setState({ isOpen: false })}
                                    />
                                    <button onClick={() => { this.openModal(); this.filterID(item.video) }} class="btn btn-light btn-lg btn-block">{item.name}</button>

                                </>
                            )
                        )
                    }
                </ListGroup>
            </>
        )
    }
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useParams();
        return <Component {...props} myHookValue={myHookValue.label} />;
    }
}

export default withMyHook(ListWorkout)
