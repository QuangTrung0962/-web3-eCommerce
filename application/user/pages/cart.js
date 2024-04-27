import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import { CONTRACT_PRODUCT_ADDRESS, SDK } from "../../admin/constants/constant";
import Header from "../components/Header";
import Center from "../components/Center";
import Button from "../components/Button";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  async function getProductById(productId) {
    const contract = await SDK.getContract(CONTRACT_PRODUCT_ADDRESS);
    var id = "";
    if (productId._isBigNumber) {
      id = productId.toString();
    } else {
      id = parseInt(productId.hex, 16).toString();
    }
    const result = await contract.call("getProductById", id);
    return result;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const uniqueProducts = new Set();
      for (const productId of cartProducts) {
        const product = await getProductById(productId);
        // Kiểm tra xem có sản phẩm nào trong uniqueProducts có cùng id với sản phẩm hiện tại không
        const existingProduct = [...uniqueProducts].find(
          (p) => p.id.toString() === product.id.toString()
        );
        if (!existingProduct) {
          uniqueProducts.add(product);
        }
      }
      setProducts([...uniqueProducts]);
    };

    if (cartProducts.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Giỏ hàng của bạn đang trống !</div>}

            {products?.length > 0 && (
              <>
                <h2>Giỏ hàng</h2>
                {products.map((product) => (
                  <div>
                    {product.productName} :
                    {
                      cartProducts.filter(
                        (id) => id.toString() === product.id.toString()
                      ).length
                    }
                  </div>
                ))}
              </>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              <h2>Order infomation</h2>
              <input type="text" placeholder="Address1" />
              <input type="text" placeholder="Address2" />
              <Button black={1} block={1}>
                Tiep tuc thanh toan
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
