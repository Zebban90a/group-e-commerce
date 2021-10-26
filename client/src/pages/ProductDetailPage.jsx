import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import noImage from '../no-img.png';
import checkmark from '../checkmark.svg';
import crossmark from '../crossmark.svg';

const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: solid 1px #000;
  width: 60vw;
  min-width: 800px; // TODO fix media queries
`;

const ImageContainer = styled.div`
  flex-basis: 50%;
  padding: 1rem;
`;

const Image = styled.img`
  object-fit: cover;
  height: 400px;
  width: 100%;
`;

const InfoContainer = styled.div`
  flex-basis: 50%;
  padding: 1rem;
  .price {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .availability {
    display: flex;
    align-items: center;
    img {
      width: 28px;
      padding-bottom: 3px;
      margin-right: 5px;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-self: flex-end;
  background-color: #01da01;
  height: 40px;
`;

export default function ProductDetailPage(props) {
  const [product, setProduct] = useState('');

  async function addToCart(e) {
    e.preventDefault();
    const payload = {
      productTitle: product.title,
      productPrice: product.price,
      productId: product._id,

    };
    console.log(payload);
    axios({
      url: '/api/addtocart',
      method: 'POST',
      data: payload,
    });
  }

  async function getProduct() {
    const { id } = props.match.params;
    console.log(id);
    const path = `/api/products/${id}`;
    const { data } = await axios.get(path);
    setProduct(data.data.product);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container pad>
      {!product && <p>Loading..</p>}
      {product
        && (
        <Card>
          <div>
            <h1>{product.title}</h1>
            <p>{product.category}</p>
          </div>
          <Container>
            <ImageContainer>
              <Image
                alt={product.title}
                src={`../${product.images[0]}` || noImage}
                onError={(e) => { e.target.src = noImage; }}
              />
            </ImageContainer>
            <InfoContainer>
              <p>
                {product.description}
                {' '}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet culpa modi nemo dolorem voluptatem? Cupiditate debitis cumque, quo error officiis recusandae sequi dicta natus fugiat, iusto iure corrupti obcaecati esse soluta! Quibusdam repudiandae ea veritatis earum cumque nemo maxime praesentium est hic ab, eligendi aliquid porro quo labore, exercitationem qui?
              </p>
              <p className="price">
                &#36;
                {product.price}
              </p>
              <div className="availability">
                {!product.quantity
                  && <img src={crossmark} alt="unavailable" />}
                {product.quantity
                  && <img src={checkmark} alt="available" />}
                <p>
                  {product.quantity}
                  {' '}
                  available
                </p>
              </div>
              <p>
                Manufacturer:
                {' '}
                {product.manufacturer}
              </p>
              <p>
                Weight:
                {' '}
                {product.weight}
                g
              </p>
              <button
                onClick={addToCart}
                disabled={!product.quantity}
                type="button"
              >
                TODO: Add add to cart function
              </button>
            </InfoContainer>
          </Container>
        </Card>
        )}
    </Container>
  );
}
