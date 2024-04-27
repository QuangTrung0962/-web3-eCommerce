import Featured from "../components/Featured";
import Header from "../components/Header";
import { CONTRACT_PRODUCT_ADDRESS, SDK } from "../../admin/constants/constant";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import NewProducts from "../components/NewProduct";

export default function HomePage({}) {
  const featuredProductId = "1";
  const { contract } = useContract(CONTRACT_PRODUCT_ADDRESS);
  const { data: product } = useContractRead(contract, "getProductById", [
    featuredProductId,
  ]);

  //Take 10 newest products
  const { data: newProducts } = useContractRead(contract, "getAllProducts");
  const products = newProducts?.slice(-10).reverse();

  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProducts products={products} />
    </div>
  );
}
