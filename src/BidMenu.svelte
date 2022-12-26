<script>
    import {axios} from "./Singleton";
    import {MetamaskAccounts} from "./Session"
    import {modaltoggle, web3,  getContract} from "./Singleton"
    import {marketaddress} from "./Setting.js.bak"
    import {AssetCache} from "./Cache"
    //import {web3, defaultEvmStores} from 'svelte-web3'
    export let assetid = 1;

    let tokens = [], cost = 0, amount = 0, targetaddress="",mod = 0;

    async function getTokens()
    {
        let result = await $axios.get("/activities/getownedtokensbyasset/"+assetid);
        tokens=result.data;
        for(var t of tokens)
        {
            t.checked = false;
        }
    }

    async function OnListSubmit()
    {
        let asset = $AssetCache[assetid];
        let seltokens = []
        for(var t of tokens)
        {
            if(t.checked)
                seltokens.push(t.index);
        }
        let contract = getContract(asset.address);
        /*
        let result = await $axios.post("/activities/createlist", {
            tokenindexes:seltokens,
            assetid:assetid,
            from: $MetamaskAccounts ? $MetamaskAccounts[0] : undefined,
            cost: cost
        })
        alert(result.data);
        */
       let promises = []
       for(var i of seltokens)
       {
         promises.push(contract.methods.makeListing(i, cost, $marketaddress).send({from:window.ethereum.selectedAddress, gas:6721975}));
       }
       alert("Please wait for block mining");
       await Promise.all(promises);
       alert("Listing created");
        $modaltoggle = false;
    }

    async function OnOfferSubmit()
    {
        /*
        let result = await $axios.post("/activities/createoffer", {
            assetid:assetid,
            to: $MetamaskAccounts ? $MetamaskAccounts[0] : undefined,
            cost: cost,
            amount: amount
        })
        alert(result.data);
        if(result.data="Success")
        {
            $modaltoggle = false;
        }
        */
        let asset = $AssetCache[assetid];
        let contract = getContract(asset.address);
        await contract.methods.makeOffer(cost, amount, $marketaddress).send({from:window.ethereum.selectedAddress, gas:6721975, value: 8000000 + (cost+500000) * amount});
        alert("Offer created");
        $modaltoggle = false;
    }

    async function OnTransferSubmit()
    {
        let seltokens = []
        for(var t of tokens)
        {
            if(t.checked)
                seltokens.push(t.index);
        }

        /*
        let result = await $axios.post("/activities/transfernft", {
            assetid:assetid,
            tokenindexes: seltokens,
            from: $MetamaskAccounts ? $MetamaskAccounts[0] : undefined,
            to: targetaddress
        })
        alert(result.data);
        if(result.data="Success")
        {
            $modaltoggle = false;
        }*/
        let asset = $AssetCache[assetid];
        let contract = getContract(asset.address);
        let promises = []
        for(var i of seltokens)
       {
         promises.push(contract.methods.TransferNft(i, targetaddress).send({from:window.ethereum.selectedAddress, gas:6721975}));
       }
       alert("Please wait for block mining");
       await Promise.all(promises);
       alert("Transfered");
        $modaltoggle = false;
    }

    $: if(assetid != "")
    {
        getTokens();
    }
</script>

<div class="bidmenudiv">
    <select bind:value={mod}>
        <option value=0 selected>List</option>
        <option value=1>Offer</option>
        <option value=2>Transfer</option>
    </select>
    {#if mod == 0}
        <div class="tablediv">
            <table>
                <thead>
                    <th>Selected</th>
                    <th>Token Index</th>
                </thead>
                    <tbody>
                        {#each tokens as token}
                            <tr>
                                <td><input type="checkbox" bind:value={token.checked}/></td>
                                <td>{token.index}</td>
                            </tr>
                        {/each}
                    </tbody>
            </table>
        </div>
        <label for="cost">Cost: </label>
        <input type="number" name="cost" bind:value={cost}/><br>
        <button on:click={OnListSubmit}>submit</button>
    {:else if mod == 1}
        <label for="amount">Amount: </label>
        <input type="number" name="amount" bind:value={amount}/><br>
        <label for="cost">Cost: </label>
        <input type="number" name="cost" bind:value={cost}/><br>
        <button on:click={OnOfferSubmit}>submit</button>
    {:else if mod == 2}
    <table class="tablediv">
        <thead>
            <th>Selected</th>
            <th>Token Index</th>
        </thead>
        <tbody>
            {#each tokens as token}
                <tr>
                    <td><input type="checkbox" bind:value={token.checked}/></td>
                    <td>{token.index}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    <label for="address">Target address: </label>
    <input name="address" bind:value={targetaddress}/><br>
    <button on:click={OnTransferSubmit}>submit</button>
    {/if}
</div>

<style>
.tablediv
{
    height: 60vh;
    overflow:scroll;
}
</style>