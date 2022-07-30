import Web3 from 'web3/dist/web3.min.js'
import { AbiItem } from 'web3-utils'

// web3 ts的类型定义
import { ContractOptions } from 'web3-eth-contract'
import _web3 from 'web3'
// 检查是否是新的MetaMask 或 DApp浏览器
let web3Provider
if (window.ethereum) {
    web3Provider = window.ethereum
    try {
        // 请求用户授权
        await window.ethereum.enable()
    } catch (error) {
        // 用户不授权时
        console.error('User denied account access')
    }
} else if (window.web3) {
    // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
}
const web3 = new Web3(web3Provider)

// 链接钱包
async function connectWallet() {
    return new Promise(async (resolve, reject) => {
        const accounts = await window.ethereum
            .request({
                method: 'eth_requestAccounts',
            })
            .catch((err: any) => {
                reject(err)
            })
        if (accounts && accounts[0]) {
            resolve(accounts[0])
        } else {
            reject()
        }
    })
}
// 获取区块信息
function getBlockInfo() {
    web3.eth.getBlock(48, function (error, result) {
        if (!error) {
            return result
        } else console.error(error)
    })
}

// 读合约方法
interface readContractType {
    abi: AbiItem // 合约abi
    contract: string // 合约地址
    method: string // 合约方法
    walletAddress: string // 钱包地址
    options?: ContractOptions // 合约配置 类似gas费那些
    config?: {
      account?: string
      quantity?: string
    }
}
function readContract(obj: readContractType) {
  const {config} = obj
    // 创建合约对象
    return new Promise(async (resolve, reject) => {
        await new web3.eth.Contract(obj.abi, obj.contract, obj.options).methods[obj.method](
            obj.walletAddress,
        ).call((error: any, result: string) => {
            if (!error) {
                resolve(Web3.utils.fromWei(result, 'ether'))
            } else {
                reject(error)
            }
        })
    })
}
 // let quantity = ''
  // if(obj.unlimited){
  //   // Math.pow(2, 190).toString()
  //   // h5
  //   quantity = '11579208923731620000000000000000000000000000000000000000000000000000000000000'
  // } else {
  //   if(obj.process){
  //     quantity = Web3.utils.toWei(config.quantity, 'ether').toString()
  //   } else {
  //     quantity = config.quantity.toString()
  //   }
  // }
// 写合约方法

interface writeContractType {
    abi: AbiItem // 合约abi
    contract: string // 合约地址
    method: string // 合约方法
    walletAddress?: string | undefined// 钱包地址
    config?: string[] // 合约方法需要的参数,需要按照该方法的参数顺序进行传参
    options?: ContractOptions // 合约配置 类似gas费那些
    // process?: boolean // 数据预处理
    // unlimited?: boolean
}
async function writeContract(obj: writeContractType) {
  const { config } = obj
    // 创建合约对象
    return new Promise(async (resolve, reject) => {
        await new web3.eth.Contract(obj.abi, obj.contract, obj.options).methods[obj.method](...Array.from(config)).send(
            {
                from: obj.walletAddress,
            },
            (error: any, transactionHash: string) => {
                if (!error) {
                    // 成功执行，返回交易号
                    resolve(transactionHash)
                } else {
                    // 失败执行
                    reject(error)
                }
            },
        )
    })
}


export { web3, getBlockInfo, readContract, writeContract, connectWallet }
