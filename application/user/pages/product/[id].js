import { useContext } from "react";
import { CartContext } from "../../components/CartContext";
import Header from "../../components/Header";
import Center from "../../components/Center";
import Title from "../../components/Title";
import WhiteBox from "../../components/WhiteBox";
import { useRouter } from "next/router";
import styled from "styled-components";
import ProductImages from "../../components/ProductImages";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import {
  CONTRACT_PRODUCT_ADDRESS,
  bigNumberToString,
  numberWithCommas,
} from "../../../admin/constants/constant";
import Button from "../../components/Button";
import CartIcon from "../../components/icons/CartIcon";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage() {
  const { addProduct } = useContext(CartContext);
  const router = useRouter();
  const { id } = router.query;
  const { contract } = useContract(CONTRACT_PRODUCT_ADDRESS);
  const { data: product } = useContractRead(contract, "getProductById", [id]);

  return (
    <>
      {product && (
        <>
          <Header />
          <Center>
            <ColWrapper>
              <WhiteBox>
                <ProductImages images={product.images} />
              </WhiteBox>

              <div>
                <Title>{product.productName}</Title>
                <p>{product.description}</p>
                <PriceRow>
                  <div>
                    <Price>
                      {numberWithCommas(bigNumberToString(product.price))}₫
                    </Price>
                  </div>
                  <div>
                    <Button primary onClick={() => addProduct(product.id)}>
                      <CartIcon />
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </PriceRow>
              </div>
            </ColWrapper>
          </Center>
        </>
      )}
    </>
  );
}
