import { assert, expect } from "chai";
import { developmentChains, INITIAL_SUPPLY } from "../../helper-hardhat-config";
import { network, getNamedAccounts, deployments, ethers } from "hardhat";
import { Tdx } from "../../typechain-types";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("TdxToken tests", () => {
      const multiplier = 1e18;
      let tdxToken: Tdx, deployer: string, user: string;
      beforeEach(async () => {
        const accounts = await getNamedAccounts();
        deployer = accounts.deployer;
        user = accounts.user;
        await deployments.fixture("all");
        tdxToken = await ethers.getContract("Tdx", deployer);
      });
      it("was deployed", () => {
        assert(tdxToken.address);
      });
      describe("constructor", () => {
        it("should have correct initial supply of tokens", async () => {
          expect(await tdxToken.totalSupply()).equal(INITIAL_SUPPLY);
        });
        it("initilize the token with correct name and symbol", async () => {
          assert.equal(tdxToken.name().toString(), "TdxToken");
          assert.equal(tdxToken.symbol().toString(), "Tdx");
        });
      });
      describe("transfers", () => {
        it("should be able to transfer tokens successfully", async () => {
          const amount = ethers.utils.parseEther("10");
          const senderBalance = await tdxToken.balanceOf(deployer);
          const receiverBalance = await tdxToken.balanceOf(user);
          await tdxToken.transfer(user, amount);
          expect(await tdxToken.balanceOf(deployer)).lessThanOrEqual(
            senderBalance - amount
          );
          expect(await tdxToken.balanceOf(deployer)).equals(
            senderBalance + amount
          );
        });
        it("should emit transfer event", async () => {
          expect(
            await tdxToken.transfer(user, ethers.utils.parseEther("10"))
          ).to.emit(tdxToken, "Transfer");
        });
      });
    });
