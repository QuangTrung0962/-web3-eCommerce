const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Products Contract", function () {
  it("has a name", async function () {
    const Products = await ethers.getContractFactory("Products");
    const products = await Products.deploy();
    await products.deployed();
    expect(await products.name()).to.equal("Products");
  });
});
