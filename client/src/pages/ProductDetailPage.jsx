import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import noImage from '../no-img.png';
import checkmark from '../checkmark.svg';
import crossmark from '../crossmark.svg';
import AddToCartBtn from '../components/AddToCartBtn';
import UserContext from '../contexts/UserContext';

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
  min-width: 800px;
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

export default function ProductDetailPage({ match }) {
  const [product, setProduct] = useState('');
  const { cart, setCart } = useContext(UserContext);
  const { id } = match.params;

  async function getProduct() {
    const path = `https://group-e-commerce.herokuapp.com/api/products/${id}`;
    const { data } = await axios.get(path);
    setProduct(data.data.product);
  }

  useEffect(() => {
    getProduct();
  }, [id]);

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
                  src={`https://group-e-commerce.herokuapp.com/${product.images[0]}` || noImage}
                  onError={(e) => { e.target.src = noImage; }}
                />
              </ImageContainer>
              <InfoContainer>
                <p>
                  {product.description}
                  {' '}
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
                <AddToCartBtn
                  cart={cart}
                  setCart={setCart}
                  disabled={!product.quantity}
                  // eslint-disable-next-line no-underscore-dangle
                  productId={product._id}
                />
              </InfoContainer>
            </Container>
          </Card>
        )}
    </Container>
  );
}
