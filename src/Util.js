import {get} from 'svelte/store';
import {axios} from './Singleton'

export function getIPFSURL(hash)
{
    return get(axios).defaults.baseURL + "ipfs/" + hash;
}

export function getFileURL(name)
{
    return get(axios).defaults.baseURL + "files/" + name;
}