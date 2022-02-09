const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const cauldron = "0x3581559DaA31DD3113E9dd338323Fca6c1215EFF";
  const bentobox = "0x4cA5dD575DacE76781C41cafe68281dfc4dF0038";
  const nusd = "0x83A90d53dbc9a55888333224ca6C8210A3a7bDef";

  const ownerAddressForTx = owner.address.slice(2);
  const nusdAddressForTx = nusd.slice(2);

  // await hre.network.provider.request({
  //   method: "hardhat_impersonateAccount",
  //   params: ["0xfe5427cd836062791a3551a8f8b2ace6c8eadb9d"],
  // });
  // const signer = await hre.ethers.getSigner("0xfe5427cd836062791a3551a8f8b2ace6c8eadb9d")

  const avax = (
    await hre.ethers.getContractAt(
      "ERC20",
      "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
    )
  ).connect(owner);
  const nusdContract = (
    await hre.ethers.getContractAt("NereusStableCoin", nusd)
  ).connect(owner);

  const txNUSD = await nusdContract.mintToBentoBox(
    cauldron,
    hre.ethers.utils.parseEther("10000"),
    bentobox
  );
  await txNUSD.wait();

  const balance = await nusdContract.balanceOf(bentobox);
  console.log("bento box balance", balance);

  await avax.approve(bentobox, "0");
  await avax.approve(
    bentobox,
    "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  // const transaction = {
  //   data: '0x656f3d640000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000150000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000280000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000006472ae6619181d29abb74e9f95c746de268a2c76000000000000000000000000c568a699c5b43a0f1ae40d3254ee641cb86559f40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001c40e015d676a5a256d65834cfd196c2d3a5c2d15c78bbc2a10a8db229b7cc23095712a56de55f596e6dc150a231dac1d984994e64f53650dc9c6517919c7d557d00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000001cdd16a6030dfbec0000000000000000000000006472ae6619181d29abb74e9f95c746de268a2c760000000000000000000000000000000000000000000000000000000000000080000000000000000000000000130966628846bfd36ff31a822705796e8cb8c18d0000000000000000000000006472ae6619181d29abb74e9f95c746de268a2c760000000000000000000000000000000000000000000000001cdd16a6030dfbeb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006472ae6619181d29abb74e9f95c746de268a2c76000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0000000000000000000000006472ae6619181d29abb74e9f95c746de268a2c760000000000000000000000000000000000000000000000000000000000000000',
  //   to: cauldron,
  //   value: hre.ethers.utils.parseEther('0.1')
  // };

  // const transaction = {
  //   data: '0x656f3d640000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000150000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000002d485ab4b80c05c50000000000000000000000000fe5427cd836062791a3551a8f8b2ace6c8eadb9d000000000000000000000000000000000000000000000000000000000000008000000000000000000000000083A90d53dbc9a55888333224ca6C8210A3a7bDef000000000000000000000000fe5427cd836062791a3551a8f8b2ace6c8eadb9d000000000000000000000000000000000000000000000002d485ab4b80c05c4f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fe5427cd836062791a3551a8f8b2ace6c8eadb9d0000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe000000000000000000000000fe5427cd836062791a3551a8f8b2ace6c8eadb9d0000000000000000000000000000000000000000000000000000000000000000',
  //   to: cauldron,
  //   value: hre.ethers.utils.parseEther('1')
  // };

  const transaction = {
    data: `0x656f3d640000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000150000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000002d485ab4b80c05c50000000000000000000000000${ownerAddressForTx}0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000${nusdAddressForTx}000000000000000000000000${ownerAddressForTx}000000000000000000000000000000000000000000000002d485ab4b80c05c4f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000${ownerAddressForTx}0000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe000000000000000000000000${ownerAddressForTx}0000000000000000000000000000000000000000000000000000000000000000`,
    to: cauldron,
    value: hre.ethers.utils.parseEther("1"),
  };

  const tx = await owner.sendTransaction(transaction);
  await tx.wait();
  console.log("tx", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
