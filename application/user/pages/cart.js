import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import {
  CONTRACT_PRODUCT_ADDRESS,
  CONTRACT_STORE_ADDRESS,
  SDK,
  bigNumberToString,
  numberWithCommas,
} from "../../admin/constants/constant";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { format } from "date-fns";
import Checkout from "../components/Checkout";
import Header from "../components/Header";
import Center from "../components/Center";
import Button from "../components/Button";
import Table from "../components/Table";
import Input from "../components/Input";

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

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const TolalRed = styled.span`
  color: red;
`;

const CenterH2 = styled.h2`
  margin-bottom: 10px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [details, setDetails] = useState("");
  const [clear, setclear] = useState(false);
  const { contract } = useContract(CONTRACT_STORE_ADDRESS);

  const {
    mutateAsync: createOrder,
    isSuccess: createOrderSuccess,
    isError,
  } = useContractWrite(contract, "createOrder");

  async function getProductById(productId) {
    const contract = await SDK.getContract(CONTRACT_PRODUCT_ADDRESS);
    const result = await contract.call(
      "getProductById",
      bigNumberToString(productId)
    );
    return result;
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  //Caculator the total price
  let total = 0;
  for (const productId of cartProducts) {
    const product = products.find(
      (p) => bigNumberToString(p.id) === bigNumberToString(productId)
    );
    const price = bigNumberToString(product?.price);
    total += parseInt(price);
  }

  async function setNewOrder() {
    const currentTime = new Date();
    const formattedTime = format(currentTime, "dd/MM/yyyy HH:mm:ss");
    const orderProducts = products.map((item) => {
      const quantity = cartProducts?.filter(
        (id) => bigNumberToString(id) === bigNumberToString(item.id)
      ).length;
      return [item.productName, quantity];
    });

    await createOrder({
      args: [
        name,
        email,
        phoneNumber,
        province,
        district,
        ward,
        details,
        formattedTime,
        total,
        parseInt(products.length),
        orderProducts,
      ],
    });
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

  useEffect(() => {
    if (createOrderSuccess) {
      clearCart();
    }
  }, [createOrderSuccess]);

  if (createOrderSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h3>Cảm ơn bạn vì đã mua hàng</h3>
              <Checkout totalPrice={total} />
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <CenterH2>Giỏ hàng</CenterH2>
            {!cartProducts?.length && !createOrderSuccess && (
              <div>Giỏ hàng của bạn đang trống !</div>
            )}

            {products && products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} />
                        </ProductImageBox>
                        {product.productName}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product.id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts?.filter(
                              (id) =>
                                bigNumberToString(id) ===
                                bigNumberToString(product.id)
                            ).length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product.id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        {numberWithCommas(
                          (
                            cartProducts.filter(
                              (id) =>
                                bigNumberToString(id) ===
                                bigNumberToString(product.id)
                            ).length * product.price
                          ).toString()
                        )}
                        ₫
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <b>Tổng tiền: </b>
                    </td>
                    <td></td>
                    <td>
                      <TolalRed>{numberWithCommas(total)}₫</TolalRed>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts.length && (
            <Box>
              <h2>Thông tin đơn hàng</h2>
              <Input
                type="text"
                placeholder="Họ tên"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={(ev) => setPhoneNumber(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Thành phố"
                onChange={(ev) => setProvince(ev.target.value)}
                value={province}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Quận"
                  onChange={(ev) => setDistrict(ev.target.value)}
                  value={district}
                />
                <Input
                  type="text"
                  placeholder="Huyện"
                  onChange={(ev) => setWard(ev.target.value)}
                  value={ward}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Chi tiết"
                onChange={(ev) => setDetails(ev.target.value)}
                value={details}
              />

              <Web3Button
                className="newOrder-btn "
                contractAddress={CONTRACT_PRODUCT_ADDRESS}
                action={setNewOrder}
              >
                Tiếp tục thanh toán
              </Web3Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
