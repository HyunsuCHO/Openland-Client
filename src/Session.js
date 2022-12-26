import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import {axios} from "./Singleton";
import {web3, defaultEvmStores} from 'svelte-web3'
import RegisterUser from './RegisterUser.svelte'

export const MetamaskAccounts = writable(undefined);
export const MetamaskConnected = writable(false);
export const MetamaskToken = writable(undefined);

export const SessionData = writable(undefined);
export async function getSessionData()
{
    let result = (await get(axios).post("/users/session")).data;
    if(result == "")
        result = undefined;
    SessionData.set(result);//(await ((await fetch("/users/session")).json()));
    return get(SessionData);
}
getSessionData();

export async function signInMetamask(returntohome = true) {
    try {
      // Connect to metamask and get user accounts
      await defaultEvmStores.setProvider();
      const accounts = [window.ethereum.selectedAddress]//await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Update vuex store
      //this.$store.commit('metamask/setMetamaskConnected', true)
      //this.$store.commit('metamask/setAccounts', accounts)

      MetamaskAccounts.set(accounts);
      MetamaskConnected.set(true);

      
      // Check if user is registered, if not, register them
      //const isRegistered = await this.checkIfUserRegistered(accounts[0])
      
      // Request nonce from backend
      const responseNonce = await get(axios).get('/metamasks/nonce/' + accounts[0])
      const nonce = responseNonce.data
      // Sign message
      //const signedMessage = await this.handleSignMessage(accounts[0], nonce)
      const signedMessage = await get(web3).eth.personal.sign("0x"+nonce.toString(16), accounts[0]);

      // Send signature to backend
      const responseSign = await get(axios).post('/metamasks/signature', {signature: signedMessage, address: accounts[0]});

      if(typeof(responseSign.data) == typeof("") && responseSign.data.startsWith("Do Register:"))
      {
        let contenttag = document.getElementsByTagName('content')[0];
        new RegisterUser({target: contenttag, hydrate: true, props: {address: responseSign.data.split(":")[1]}});
        return;
      }
      
      // Set token in local vuex state store
      //this.$store.commit('metamask/setToken', responseSign.data.token)
      //$MetamaskToken = responseSign.data.token;
      
      // If successful, redirect to home
      if (responseSign.status === 200 && returntohome) {
        window.location.href = "/";
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }