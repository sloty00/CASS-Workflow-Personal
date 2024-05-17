import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylecomp.css';

const BodyHome = () => {
  const images = [
    {
      src: 'images/VINTAGE1.jpg',
      caption: 'BRINDANDO SERVICIOS A TODO CHILE DESDE 1994'
    },
    {
      src: 'images/VINTAGE2.jpg',
      caption: 'BRINDANDO SERVICIOS A TODO CHILE DESDE 1994'
    },
    {
      src: 'images/VINTAGE3.jpg',
      caption: 'BRINDANDO SERVICIOS A TODO CHILE DESDE 1994'
    },
    {
      src: 'images/VINTAGE4.jpg',
      caption: 'BRINDANDO SERVICIOS A TODO CHILE DESDE 1994'
    },
    {
      src: 'images/VINTAGE5.jpg',
      caption: 'BRINDANDO SERVICIOS A TODO CHILE DESDE 1994'
    },
    {
      src: 'images/VINTAGE6.jpg',
      caption: 'BRINDANDO SERVICIOS A TODO CHILE DESDE 1994'
    }
    // Agrega más objetos para cada imagen con su respectivo texto
  ];

  return (
    <div className="centered-imagec">
      <Carousel style={{ height: 600, width: 900 }} fade>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Carousel.Caption style={{ top: '20%', bottom: 'auto' }}>
              <h3>{image.caption}</h3>
            </Carousel.Caption>
            <img
              className="d-block w-100"
              src={image.src}
              alt={`Slide ${index}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BodyHome;