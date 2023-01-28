import React, { Component } from 'react';
import '../../App.css';
import CarouselContainer from '../../ForumComponents/Carousel'
import PostContainer from '../../ForumComponents/PostContainer';
import Footer from '../Footer';
export default class Forums extends Component {
  render() {
    return (
        <>
        <h1 className='forum'></h1>
        <CarouselContainer/>
        <PostContainer/>
        <Footer/>
    </>
    )
    
  }
}
