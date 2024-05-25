import {
  useContract,
  useContractRead,
  Web3Button,
  useContractWrite,
  useAddress,
} from "@thirdweb-dev/react";
import Header from "../components/Header";
import {
  CONTRACT_ORDER_ADDRESS,
  bigNumberToString,
  numberWithCommas,
} from "../../admin/constants/constant";
import Center from "../components/Center";
import Title from "../components/Title";

export default function OrdersPage() {
  const { contract } = useContract(CONTRACT_ORDER_ADDRESS);
  const address = useAddress();
  const { mutateAsync: deleteOrder, isSuccess: deleteOrderSuccess } =
    useContractWrite(contract, "delelteUserOrder");

  const { data: orders } = useContractRead(contract, "getUserOrders", [
    address,
  ]);

  return (
    <>
      <Header />
      <Center>
        <Title>Danh sách đơn hàng</Title>
        <table className="basic">
          <thead>
            <tr>
              <th>Ngày đặt hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map(
                (order, index) =>
                  // Kiểm tra xem order.timestamp có khác rỗng không
                  order.timestamp !== "" && (
                    <tr key={index}>
                      <td>{order.timestamp}</td>
                      <td>
                        {order.items.map((item) => (
                          <>
                            {item.name} x {bigNumberToString(item.quantity)}{" "}
                            <br />
                          </>
                        ))}
                      </td>
                      <td>
                        {numberWithCommas(bigNumberToString(order.total))}₫
                      </td>
                      <td>Đang xử lý</td>
                      <td>
                        <Web3Button
                          className="btn-primary"
                          contractAddress={CONTRACT_ORDER_ADDRESS}
                          action={() => deleteOrder({ args: [index] })}
                          style={{ minWidth: "none" }}
                        >
                          Hủy đơn
                        </Web3Button>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </Center>
    </>
  );
}
