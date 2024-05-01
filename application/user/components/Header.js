import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>QuangTrungStore</Logo>
          <StyledNav>
            <NavLink href={"/"}>Trang chủ</NavLink>
            <NavLink href={"/products"}>Sản phẩm</NavLink>
            <NavLink href={"/catergories"}>Danh mục</NavLink>
            <NavLink href={"/account"}>Tài khoản</NavLink>
            <NavLink href={"/cart"}>Giỏ hàng ({cartProducts.length})</NavLink>
            <ConnectWallet
              btnTitle={"Đăng nhập"}
              modalTitle={"Phương thức đăng nhập"}
              theme={"dark"}
              modalSize={"wide"}
              modalTitleIconUrl={""}
              showThirdwebBranding={false}
            />
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
