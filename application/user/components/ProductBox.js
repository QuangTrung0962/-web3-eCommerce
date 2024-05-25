import styled from "styled-components";
import Link from "next/link";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ProductBox({
  id,
  productName,
  description,
  price,
  images,
}) {
  const numberWithCommas = (numberString) => {
    // Chuyển chuỗi số thành số nguyên
    const number = parseInt(numberString);
    // Kiểm tra nếu không phải là số
    if (isNaN(number)) return "Invalid number";

    // Chuyển số thành chuỗi và định dạng bằng cách thêm dấu phẩy sau mỗi 3 chữ số từ phải sang trái
    return number.toLocaleString("vi-VN");
  };

  const { addProduct } = useContext(CartContext);

  const url = "/product/" + id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{productName}</Title>
        <PriceRow>
          <Price>{numberWithCommas(price.toString())}₫</Price>
          <Button onClick={() => addProduct(id)} primary={1} outline={1}>
            <CartIcon />
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
