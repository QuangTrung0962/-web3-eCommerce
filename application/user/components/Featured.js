import styled from "styled-components";
import { useContext } from "react";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 50px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product.id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.productName}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/products/" + product?.id}
                  white={1}
                  outline={1}
                >
                  Xem thêm
                </ButtonLink>
                <Button onClick={addFeaturedToCart} white={1}>
                  <CartIcon />
                  Mua ngay
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img alt="iphone-img" src={product?.images[0]} />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
