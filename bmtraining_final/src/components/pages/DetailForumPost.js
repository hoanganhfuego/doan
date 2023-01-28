import React, { Component } from 'react';
import '../../App.css';
import ResponsivePlayer from '../../ForumComponents/video-player';
import PostDescription from '../../ForumComponents/PostDescription';


export default class Forums extends Component {
  render() {
    
    return (
        <>
        <ResponsivePlayer/>
        <PostDescription/>       
    </>
    )
    
  }
}

