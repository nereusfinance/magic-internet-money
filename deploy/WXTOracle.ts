import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ChainId, setDeploymentSupportedChains } from "../utilities";
import { LothricFin } from "../test/constants";
import { WXTOracle } from "../typechain";

const ParametersPerChain = {
  [ChainId.Avalanche]: {
    owner: LothricFin,
  },
  [ChainId.Localhost]: {
    owner: LothricFin,
  },
  [ChainId.Fuji]: {
    owner: LothricFin,
  },
};

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const tx = await deploy("WXTOracle", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });

  await deployments.save("WXTOracle", {
    abi: [],
    address: tx.address,
  });
};

export default deployFunction;

setDeploymentSupportedChains(Object.keys(ParametersPerChain), deployFunction);

deployFunction.tags = ["WXTOracle"];
deployFunction.dependencies = [];
