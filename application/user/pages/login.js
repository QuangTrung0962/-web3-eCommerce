import {
  ConnectEmbed,
  useShowConnectEmbed,
  lightTheme,
} from "@thirdweb-dev/react";

import { useRouter } from "next/router.js";

const customTheme = lightTheme({
  colors: {
    accentText: "#00e6a1",
    primaryText: "#261717",
    accentButtonBg: "#00e6a1",
    modalBg: "#fcfcfd",
    dropdownBg: "#fcfcfd",
  },
});

export default function Login() {
  const showConnectEmbed = useShowConnectEmbed();
  const router = useRouter();

  if (showConnectEmbed) {
    return (
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <img
          src="https://readymadeui.com/signin-image.webp"
          style={{
            width: "50%",
            height: "100vh",
            backgroundColor: "royalblue",
          }}
        ></img>
        <div
          style={{
            width: "50%",
            height: "100vh",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="titel-Login">Login</h1>
          <ConnectEmbed
            style={{ border: "none" }}
            showThirdwebBranding={false}
            theme={customTheme}
          />
        </div>
      </div>
    );
  } else {
    router.push("/");
  }
}
