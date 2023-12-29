import Web3 from 'web3';
import { writable } from 'svelte/store';
import {axios} from "./Singleton";
import RegisterUser from './RegisterUser.svelte';

export const MetamaskAccounts = writable(undefined);
export const MetamaskConnected = writable(false);
export const MetamaskToken = writable(undefined);
export const SessionData = writable(undefined);

// Web3 인스턴스 초기화
let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
} else {
    console.error("MetaMask is not installed!");
}

export async function signInMetamask(returntohome = true) {
    try {
        // Connect to metamask and get user accounts
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();

        MetamaskAccounts.set(accounts);
        MetamaskConnected.set(true);

        // Request nonce from backend
        const responseNonce = await axios.get('/metamasks/nonce/' + accounts[0]);
        const nonce = responseNonce.data;

        // Sign message
        const signedMessage = await web3.eth.personal.sign(nonce, accounts[0]);

        // Send signature to backend
        const responseSign = await axios.post('/metamasks/signature', {signature: signedMessage, address: accounts[0]});

        if (typeof(responseSign.data) === "string" && responseSign.data.startsWith("Do Register:")) {
            let contentTag = document.getElementsByTagName('content')[0];
            new RegisterUser({target: contentTag, hydrate: true, props: {address: responseSign.data.split(":")[1]}});
            return;
        }

        // If successful, redirect to home
        if (responseSign.status === 200 && returntohome) {
            window.location.href = "/";
            window.location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 아래부터는 rent/crowdfunding 내용

import rentTokenABI from '../public/ABI/Rent.json';
import fundingTokenABI from '../public/ABI/CrowdFunding.json';

const rentTokenAddress = "0x07A4B14c88c48bF8cB933A3E86286cfA70FA1675";
const rentTokenContract = new web3.eth.Contract(rentTokenABI, rentTokenAddress);
const rentMContract = rentTokenContract.methods;
const fundingTokenAddress = "0x6c47e14E822ca9A2452d6b858e8af783Df4fbC50";
const fundingTokenContract = new web3.eth.Contract(fundingTokenABI, fundingTokenAddress);
const fundingMContract = fundingTokenContract.methods;


const accounts = ["0x65F54Ea6fd2aBc20FF39d0b2157504A49E6A1715"]
export async function getContractName() {
    try {
        const name = await rentMContract.name().call();
        console.log('Contract Name:', name);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function startRenting(tokenId, months) {
    try {
        const value = months * await rentMContract.getRentPrice(tokenId).call();
        const options = {
            from: accounts[0],
            value: value
        };
        const receipt = await rentMContract.startRenting(tokenId, months).send(options);
        console.log('Start Renting Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function extendRenting(tokenId, additionalMonths) {
    try {
        const value = additionalMonths * await rentMContract.getRentPrice(tokenId).call();
        const options = {
            from: accounts[0],
            value: value
        };
        const receipt = await rentMContract.extendRenting(tokenId, additionalMonths).send(options);
        console.log('Extend Renting Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function cancelRenting(tokenId) {
    try {
        const receipt = await rentMContract.cancelRenting(tokenId).send({ from: accounts[0] });
        console.log('Cancel Renting Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getRentInfo(tokenId) {
    try {
        const rentInfo = await rentMContract.getRentInfo(tokenId).call();
        const result = {
            userAddress: rentInfo.user,
            expiresDate: new Date(rentInfo.expires * 1000)
        };

        return result; // 수정된 반환 값
    } catch (error) {
        console.error('Error:', error);
        return null; // 오류 발생 시 null 반환
    }
}

export async function getRentPrice(tokenId) {
    try {
        const rentPrice = await rentMContract.getRentPrice(tokenId).call();
        return rentPrice; // 대여 가격 반환
    } catch (error) {
        console.error('Error:', error);
        return null; // 오류 발생 시 null 반환
    }
}


// CrowdFunding

export async function consentToSponsor(numConsents) {
    try {
        const value = numConsents * (await fundingMContract.getFundingInfo().call())[2];
        const receipt = await fundingMContract.consentToSponsor(numConsents)
            .send({ from: accounts[0], value: value});
        console.log('Consent to Sponsor Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function consentToEarlyBirdSponsor(numConsents) {
    try {
        const value = numConsents * (await fundingMContract.getFundingInfo().call())[3];
        const receipt = await fundingMContract.consentToEarlyBirdSponsor(numConsents)
            .send({ from: accounts[0], value: value });
        console.log('Consent to Early Bird Sponsor Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function mintNFTEach() {
    try {
        const receipt = await fundingMContract.mintNFTEach().send({ from: accounts[0] });
        console.log('Mint NFT Each Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getFundingInfo() {
    try {
        const mintingInfo = await fundingMContract.getFundingInfo().call();
        return {
            requiredConsents: mintingInfo[0],
            maxMintsPerAddress: mintingInfo[1],
            consentPrice: web3.utils.fromWei(mintingInfo[2], 'ether'),
            earlyBirdConsentPrice: web3.utils.fromWei(mintingInfo[3], 'ether'),
            mintingStartTime: new Date(mintingInfo[4] * 1000),
            consentDeadline: new Date(mintingInfo[5] * 1000),
            earlyBirdConsentStartTime: new Date(mintingInfo[6] * 1000),
            earlyBirdConsentEndTime: new Date(mintingInfo[7] * 1000),
            totalConsents: mintingInfo[8],
            mintAtOnce: mintingInfo[9],
            mintEach: mintingInfo[10]
        };
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 다시 던집니다.
    }
}

export async function checkFundingIsSuccess() {
    try {
        const isSuccessful = await fundingMContract.checkFundingIsSuccess().call();
        console.log('Is Funding Successful:', isSuccessful);
        return isSuccessful; // 펀딩 성공 여부 반환
    } catch (error) {
        console.error('Error:', error);
        return false; // 오류 발생 시 false 반환
    }
}
export async function withdrawFundRaised() {
    try {
        const receipt = await fundingMContract.withdrawFundRaised().send({ from: accounts[0] });
        console.log('Withdraw Fund Raised Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

