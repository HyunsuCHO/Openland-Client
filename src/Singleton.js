import { readable, writable } from 'svelte/store';
import { create } from 'axios';
import { get } from 'svelte/store';
import {serverurl, cors} from './Setting';
export const axios = readable(
    create(
        {
            baseURL:"http://"+get(serverurl), 
            headers:{"Access-Control-Allow-Origin":get(cors)},
            withCredentials: true,
        })
);

//export const websocket = readable(
//    new WebSocket("ws://"+get(serverurl))
//)
export const abi = writable(undefined);
export const web3 = writable(undefined);
async function wrapper()
{
    let _abi = (await get(axios).get("/solidity/getbytecode")).data;
    abi.set(_abi);
}
wrapper();

export function getContract(address)
{
    let _web3 = get(web3);
    return new _web3.eth.Contract(get(abi).abi, address, {data:get(abi).bytecode});
}

export const modalslot = writable("");
export const modaltoggle = writable(false);
export const modalprop = writable({});
export const backtrace = writable([]);