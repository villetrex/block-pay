import { network } from "hardhat";
import { developmentChains, INITIAL_SUPPLY } from "../helper-hardhat-config";
import { verify } from "../helper-functions";

export default async ({ getNamedAccounts, deployments }: any) => {
  const { deploy, log } = deployments;
  const { deployer, user1 } = await getNamedAccounts();
  console.log("deployer................................", deployer);
  const tdxToken = await deploy("Tdx", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    waitConfirmations: network.config.blockConfirmations ?? 1,
  });
  log(`tdx token deployed at ${tdxToken.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.EHTERSCAN_API_KEY
  ) {
    console.log("network name", network.name);
    await verify(tdxToken.address, [INITIAL_SUPPLY]);
  }
};

export const tags = ["all, token"];
