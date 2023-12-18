const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/your_project_id'));
const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
tokenContract.methods.name().call().then(name => console.log('Token Name:', name));
tokenContract.methods.symbol().call().then(symbol => console.log('Token Symbol:', symbol));
tokenContract.methods.totalSupply().call().then(supply => console.log('Total Supply:', supply));
tokenContract.methods.balanceOf(userAddress).call().then(balance => console.log('Balance:', balance));
