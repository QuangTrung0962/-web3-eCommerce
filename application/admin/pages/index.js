import Layout from "../components/Layout";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Home() {
  //Address user
  const address = useAddress();
  if (!address) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <ConnectWallet
            btnTitle={"Đăng nhập"}
            modalTitle={"Phương thức đăng nhập"}
            theme={"light"}
            modalSize={"wide"}
            modalTitleIconUrl={""}
            showThirdwebBranding={false}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="text-blue-900">
          <h2>
            Admin <b>{address}</b>{" "}
          </h2>
        </div>
      </Layout>
    </>
  );
}
