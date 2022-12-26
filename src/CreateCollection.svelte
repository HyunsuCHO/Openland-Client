<script>
    import Tooltip from './Tooltip.svelte'
    import ImageUploader from './ImageUploader.svelte'
    import {axios} from './Singleton';
    let itemdata = {
        logoimage:"",
        featuredimage:"",
        bannerimage:"",
        name:"",
        exlink:"",
        description:"",
        blockchain:"ethereum",
        earningaddress:"",
    }

    async function OnCreateCollecButtonClick()
    {
        if(itemdata.name == "")
            return;
        let form = new FormData();
        for(let key in itemdata)
        {
            form.append(key, itemdata[key]);
        }
        let result = await $axios({
            method: 'post',
            url: '/collections/createcollection',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if(result.data == "Success")
        {
            alert("Created");
            window.location.href = "/";
            window.location.reload();
        }
        else
        {
            alert(result.data);
        }
    }
</script>
<div class="createcollecdiv">
<h1>Create New Collection</h1>
<h7>* Required fields</h7>

<h5>Logo image*</h5>
<ImageUploader bind:imgdata={itemdata.logoimage}></ImageUploader>

<h5>Featured image</h5>
<ImageUploader bind:imgdata={itemdata.featuredimage}></ImageUploader>

<h5>Banner image</h5>
<ImageUploader bind:imgdata={itemdata.bannerimage}></ImageUploader>

<h5>Name*</h5>
<input class="text" type="text" placeholder="Collection name" bind:value={itemdata.name}>
<!--
<h5>External link</h5>
<h7>OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</h7>
<input class="text" type="text" placeholder="https://example.com" bind:value={itemdata.exlink}>
-->
<h5>Description</h5>
<h7>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</h7>
<input class="text" type="text" placeholder="Provide a detailed description of your item." bind:value={itemdata.description}>
<!--
<h5>Collection</h5>
<h7>This is the collection where your item will appear.
    <Tooltip>
        Moving items to a different collection may take up to 30 minutes. You can <a href="">manage your collections here.</a>
    </Tooltip>
</h7>

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

<h5>Supply</h5>
<h7>The number of items that can be minted. No gas cost to you!</h7>
<input type="number" bind:value={itemdata.supply}>

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


<h5>Creator earnings</h5>
<h7>Earn a percentage of the sale price every time one of your items is sold. Adding multiple addresses may increase gas fees for buyers.</h7>
<input class="text" type="text" placeholder="Your address" bind:value={itemdata.earningaddress}>
<br>
-->
<button on:click={OnCreateCollecButtonClick}>Create</button>

</div>
<style>
.createcollecdiv
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