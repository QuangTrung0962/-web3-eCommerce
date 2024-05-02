import { CONTRACT_PRODUCT_ADDRESS } from "../../admin/constants/constant";
import Center from "../components/Center";
import Header from "../components/Header";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import Title from "../components/Title";
import ProductsGrid from "../components/ProductsGrid";

export default function ProductsPage() {
  const { contract } = useContract(CONTRACT_PRODUCT_ADDRESS);
  const { data: products } = useContractRead(contract, "getAllProducts");

  return (
    <>
      <Header />
      <Center>
        <Title>Tất cả sản phẩm</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}
