import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>Sản phẩm mới</Title>
      <ProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product.id} {...product} />
          ))}
      </ProductsGrid>
    </Center>
  );
}
