<script>
    import {axios} from "./Singleton";
    import {MetamaskAccounts} from "./Session"
    import {modaltoggle} from "./Singleton"
    import {web3, getContract} from "./Singleton"
    import {marketaddress} from "./Setting.js"
    export let assetid = 1, activityid = 1, to = "", assetaddress = "";

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

    async function OnOfferSubmit()
    {
        let idx;
        for(let t of tokens)
        {
            if(t.checked)
            {
                idx = t.index;
                break;
            }
        }

        if(!idx)
            return;

        /*
        let result = await $axios.post("/activities/acceptoffer", {
            address: $MetamaskAccounts ? $MetamaskAccounts[0] : undefined,
            activityid: activityid,
            tokenidx : idx
        })*/
        let contract = getContract(assetaddress);
        let result = await contract.methods.acceptOffer(idx, to, $marketaddress).send({from:window.ethereum.selectedAddress, gas:6721975});
        alert("Used gas:" + result.gasUsed);
        $modaltoggle = false;
    }

    $: if(assetid != "")
    {
        getTokens();
    }
</script>

<div class="bidmenudiv">
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
    <button on:click={OnOfferSubmit}>submit</button>
</div>

<style>
.tablediv
{
    height: 60vh;
    overflow:scroll;
}
</style>