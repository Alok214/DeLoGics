import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
// import nftAbi from "../../assets/contract_data/nft.json";
import { ethers } from "ethers";
import axios from "axios";
// import NftCard from "@/components/NftCard";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { getMyNfts } from "@/redux/slices/collection";
// import { useAccount } from "wagmi";
// import Loader from "@/components/Loader";

function Collection() {
  const { walletAddress, instances, nft_contract_address } = useSelector(
    (state) => state.header
  );
  // // const [localLoading, setLocalLoading] = useState(false);
  // const { address } = useAccount();
  // // const mynfts = useSelector((state) => state.collection);

  // useEffect(() => {
  //   dispatch(getMyNfts(address));
  // }, [address, dispatch]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x8256c9a4fe745DFc7b37D2c1B7A3a0475F04C26f&apikey=MIAEXYAS736K5A1FCH2HIU5X8KVVI4IW2A`
        )
        .then(async (resp) => {
          console.log(resp);
          const provider = ethers.getDefaultProvider(
            `https://polygon-mumbai.g.alchemy.com/v2/0liQDILfMykQioL4-ahtxqmBP6N6RPeN`
          );
          const contractABI = await resp.data.result;
          console.log(contractABI);
          const currentWallet = new ethers.Wallet(
            "da7cf3b84b5f1acae846f526ca15a762d7acfedaeadb0739c17aa41b3df74c95",
            provider
          );
          console.log(currentWallet);

          const currentContract = new ethers.Contract(
            nft_contract_address,
            currentWallet
          );
          // const ownerOfNft = await currentContract.ownerOf(data.tokenId);
          // if (ownerOfNft != walletAddress) {
          //   console.error("The Owner can only call this function");
          // }
        });
    }

    fetchData();
  });

  return (
    <Layout>
      <div className="collection-container">
        <div className="card-container">
          <>
            {/* {mynfts ? (
              mynfts.map(() => <></>)
            ) : (
              <div>
                <Loader />
              </div>
            )} */}
          </>
        </div>
      </div>
    </Layout>
  );
}

export default Collection;
