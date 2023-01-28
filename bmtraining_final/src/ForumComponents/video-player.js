import React from 'react'
import { Component } from 'react'
import ReactPlayer from 'react-player'
import "./video-player.css"
import ForumService from '../services/ForumService'
import { useParams } from 'react-router-dom';

class ResponsivePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forum: [],
    }
  }

  componentDidMount() {
    ForumService.getDetailForum(this.props.myHookValue).then((response) => {
      this.setState({ forum: response.data })
    });
  }

  render() {
    return (
      <div>
        {this.state.forum.map(item => (
          <div>
            <div className='post-title'>{item.title}</div>
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={item.video}
                width='80%'
                height='90%'
                controls={true}
              />
            </div>
          </div>
        ))}
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
export default withMyHook(ResponsivePlayer);

