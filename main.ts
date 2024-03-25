import { ethers } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';
import { abi } from './abis/Token';

// Connect to a locally run ethereum node (e.g. run `anvil` for testing)
// const RPC_URL = 'http://127.0.0.1:8545';

// Connect to 3rd party provider
import 'dotenv/config'
const RPC_URL = process.env.RPC_URL_ETHEREUM;

async function getTokenTransfers(addressList: string[], tokenContractAddress: string, years: number, fromBlock?: number, toBlock?: number): Promise<any[]> {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const tokenContract = new ethers.Contract(tokenContractAddress, abi, provider);
    const currentBlockNumber: number = toBlock || await provider.getBlockNumber();
    const blockNumberXYearsAgo: number = fromBlock || currentBlockNumber - Math.floor(365 * 24 * 60 * 60 * years / 13);

    const transfers: string[] = [];

    for (let blockNumber = blockNumberXYearsAgo; blockNumber <= currentBlockNumber; blockNumber++) {
        const block = await provider.getBlockWithTransactions(blockNumber);
        if (block && block.transactions) {
            for (const tx of block.transactions) {
                const interactedWith = tx.to;
                if (interactedWith === tokenContractAddress) {
                    const txReceipt = await provider.getTransactionReceipt(tx.hash);
                    if (txReceipt) {
                        for (const log of txReceipt.logs) {
                            if (log.address === tokenContractAddress) {
                                const decodedLog: LogDescription = tokenContract.interface.parseLog(log);
                                if (decodedLog && (addressList.includes(decodedLog.args[0]) || addressList.includes(decodedLog.args[1]))) {
                                    transfers.push(tx.hash); // decodedLog.args[2] for value
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return transfers;
}

///////////// Example usage /////////////

// mandatory params
const binance = "0x28C6c06298d514Db089934071355E5743bf21d60"
const coinbase = "0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43"
const addressList: string[] = [binance, coinbase];
const tokenContractAddress: string = "0x3506424F91fD33084466F402d5D97f05F8e3b4AF"; // chiliz mainnet
const years = 1;
// optional params
const fromBlock = 	19510910;
const toBlock = 19510911;

getTokenTransfers(addressList, tokenContractAddress, years, fromBlock, toBlock)
    .then(transfers => {
        console.log("Transfers hashes", transfers);
    })
    .catch(error => {
        console.error(error);
    });
