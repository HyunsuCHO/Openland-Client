<script>
    import Tooltip from './Tooltip.svelte'
    import ImageUploader from './ImageUploader.svelte'
    import {axios, web3, abi} from "./Singleton"
    import {marketaddress} from "./Setting.js.bak"
    import {MetamaskAccounts} from'./Session'
    const generateRandomString = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    let itemdata = {
        name:"",
        symbol:generateRandomString(4),
        image:"",
        exlink:"",
        description:"",
        blockchain:"ethereum",
        unlockable:false,
        sensitive:false,
        supply:1,
        contractaddress:"",
        hash:"",
        collectionid:1,
        creatoraddress:"",

    }

    let collections;


    async function getMyCollectionLists()
    {
        let result = await $axios.get("/collections/mycollections");
        collections = result.data;
    }

    getMyCollectionLists();

    async function OnCreateButtonClick()
    {
        let form = new FormData();
        let address = $MetamaskAccounts ? $MetamaskAccounts[0] : window.ethereum.selectedAddress;//await window.ethereum.request({ method: 'eth_requestAccounts' });
        itemdata.creatoraddress = address;
        /*if(address)
            form.append("creatoraddress", address);*/
        form.append("attachment",itemdata["image"]);
        let result = await $axios({
            method: 'post',
            url: '/ipfs/uploadfile',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        delete itemdata["image"];
        let hash = result.data;
        itemdata.hash = hash;
        let contract = new $web3.eth.Contract($abi.abi, undefined,{data: $abi.bytecode});
        contract = contract.deploy({data: $abi.bytecode, arguments: [itemdata["name"], itemdata["symbol"], hash, itemdata["supply"], $marketaddress]});
        contract = await contract.send({from: address, gas:6721975});
        itemdata.contractaddress = contract.options.address;

        form = new FormData();
        for(var key in itemdata)
        {
            form.append(key, itemdata[key]);
        }

        /*
        result = await $axios({
            method: 'post',
            url: '/assets/createasset',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })*/
        result = await $axios.post("/assets/createasset", itemdata);

        if(result.data == "Success")
        {
            alert("Created");
        }
        else
        {
            alert(result.data);
            return;
        }

        await contract.methods.payToMint().send({from: address, gas:6721975, value: 8000000});
        alert("Minted");
        window.location.href = "/";
        window.location.reload();
    }
</script>
<div class="creatediv">
<h1>Create New Item</h1>
<h7>* Required fields</h7>

<h5>Image*</h5>
<ImageUploader bind:imgdata={itemdata.image}></ImageUploader>

<h5>Name*</h5>
<input class="text" type="text" placeholder="Item name" bind:value={itemdata.name}>

<!--
<h5>Symbol</h5>
<input class="text" type="text" placeholder="Symbol" bind:value={itemdata.symbol} maxlength="4">

<h5>External link</h5>
<h7>OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</h7>
<input class="text" type="text" placeholder="https://example.com" bind:value={itemdata.exlink}>-->

<h5>Description</h5>
<h7>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</h7>
<input class="text" type="text" placeholder="Provide a detailed description of your item." bind:value={itemdata.description}>

<h5>Collection</h5>
<h7>This is the collection where your item will appear.
    <Tooltip>
        Moving items to a different collection may take up to 30 minutes. You can <a href="">manage your collections here.</a>
    </Tooltip>
</h7>
<select bind:value={itemdata.collectionid}>
    {#if collections}
        {#each collections as collection}
            <option value={collection.id}>{collection.name}</option>
        {/each}
    {/if}
</select>
<!--
<h6>Properties</h6>
<h7>Textual traits that show up as rectangles</h7>

<h6>Levels</h6>
<h7>Numerical traits that show as a progress bar</h7>

<h6>Stats</h6>
<h7>Numerical traits that just show as numbers</h7>

<h6>Unlockable Content</h6>
<h7>Include unlockable content that can only be revealed by the owner of the item.</h7>
<input type="checkbox" bind:value={itemdata.unlockable}>

<h6>Explicit & Sensitive Content</h6>
<h7>Set this item as explicit and sensitive content
    <Tooltip>
        Setting your asset as explicit and sensitive content, like pornography and other not safe for work (NSFW) content, will protect users with safe search while browsing OpenSea. Learn more about explicit content at OpenSea here.
    </Tooltip>
</h7>
<input type="checkbox" bind:value={itemdata.sensitive}>
-->
<h5>Supply</h5>
<h7>The number of items that can be minted. No gas cost to you!</h7>
<input type="number" bind:value={itemdata.supply}>
<!--
<h5>Blockchain</h5>
<select bind:value={itemdata.blockchain}>
    <option value="ethereum"><img class="ethereum" src="ethereum.ico"/>Ethereum</option>
</select>
<h5>Freeze metadata</h5>
<h8>Freezing your metadata will allow you to permanently lock and store all of this item's content in decentralized file storage.
    <Tooltip>
        Once locked, your content cannot be edited or removed as it is permanently stored in decentralized file storage, which will be accessible for other clients to view and use. Learn more about freezing metadata here.
    </Tooltip>
</h8>
-->
<br>
<button on:click={OnCreateButtonClick}>Create</button>
</div>

<style>
.creatediv
{
    left:30vw;
    position: relative;
    width: 40vw;
}

input.text
{
    width: 100%;
    height: 3em;
    background-color: #FAFAFA;
    font-size: medium;
}

h6, h7, h8
{
    margin: 0;
}
</style>