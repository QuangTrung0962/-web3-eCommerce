import { toWei } from "thirdweb";
import { CONTRACT_STORE_ADDRESS } from "../../admin/constants/constant";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
export default function Checkout({ totalPrice }) {
  return (
    <Web3Button
      contractAddress={CONTRACT_STORE_ADDRESS}
      action={(contract) => {
        contract.call("depositFunds", [], {
          value: toWei((totalPrice / 1000000000).toString()),
        });
      }}
      onSuccess={() => alert("TC")}
    >
      Thanh toán
    </Web3Button>
  );
}
