import { toWei } from "thirdweb";
import { CONTRACT_ORDER_ADDRESS } from "../../admin/constants/constant";
import { Web3Button } from "@thirdweb-dev/react";

export default function Checkout({ totalPrice }) {
  return (
    <Web3Button
      contractAddress={CONTRACT_ORDER_ADDRESS}
      action={(contract) => {
        contract.call("depositFunds", [], {
          value: toWei((totalPrice / 100000000).toString()),
        });
      }}
      onSuccess={() => {}}
    >
      Thanh toán
    </Web3Button>
  );
}
