import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css'

const CarouselContainer = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 h-50 max"
          src="https://www.elleman.vn/wp-content/uploads/2018/06/06/quai-vat-the-hinh-chris-heria-elleman-1.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Forum</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-50 max"
          src="https://i.ytimg.com/vi/z-5eSfJlhoo/maxresdefault.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Forum</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-50 max"
          src="https://i.ytimg.com/vi/q5okCePT380/maxresdefault.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1>Forum</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
export default CarouselContainer;
