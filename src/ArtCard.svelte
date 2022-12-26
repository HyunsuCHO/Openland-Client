<script>
    export let artdata = {}, artid={id:1, index:1}, displayfooter = false;
    import Tooltip from "./Tooltip.svelte";
    import {axios} from "./Singleton"
    import {getIPFSURL} from './Util';
    import { onMount } from 'svelte';
    import { afterUpdate } from 'svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import Asset from './Asset.svelte';
    import {AssetCache} from './Cache'
    //let collectionamediv, usernamediv;
    async function OnArtIdChange()
    {
        if(!artid || !artid.id) return;
        if($AssetCache[artid.id])
            artdata = $AssetCache[artid.id]
        else{
            let result = await $axios.get("/assets/asset/"+artid.id);
            if(result.data)
                $AssetCache[artid.id] = result.data;
            artdata = result.data;
        }

        //new CollectionNamePresenter({target: collectionamediv, hydrate: true, props:{collectionid:{id: artdata.collectionid}}});
        //new UsernamePresenter({target: usernamediv, hydrate: true, props:{userid:{id: artdata.creator}}});
    };

    function OnClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Asset({target: contenttag, hydrate: true, props:{assetid:{id: artid.id, index:artid.index}}});
    }

    $: if(artid!="")
    {
        OnArtIdChange();
    }
</script>

<div class="artcarddiv">
    <input type="number" style="display: none" bind:value={artid} on:change={OnArtIdChange}>
    <a on:click={OnClick}>
        <img class="nomargin" src={getIPFSURL(artdata.ipfshash)} alt/>
        <br/>
        <!--<h6 class="nomargin">{artdata.collection}</h6>-->
        <CollectionNamePresenter collectionid={{id: artdata.collectionid}}></CollectionNamePresenter>
        <!--<div bind:this={collectionamediv}></div>-->
        <h5 class="nomargin artname">{artdata.name}</h5>
        <!--<p class="nomargin">by <a href>{artdata.author.name}</a></p>-->
        <UsernamePresenter userid={{id: artdata.creator}}></UsernamePresenter>
        <!--<div bind:this={usernamediv}></div>-->
        <br/>
        <p class="description">{artdata.description}</p>
        {#if displayfooter}
            <div class="artcardfooter">
                <Tooltip name="…">More Options</Tooltip>
                <span>Favorites {artdata.favorites}</span>
            </div>
        {/if}
    </a>
</div>

<style>
.artcarddiv
{
  display: inline-block;
  width: 20em;
  height: 28em;
  min-height: 28em;
  max-height: 32em;
  min-width: 20em;
  max-width: 20em;
  border-radius: 1em;
  box-shadow: 5px 5px 5px 5px gray;
  /*overflow: auto;*/
  margin: 0.5em;
}

.artcarddiv img 
{
  display: inline;
  width: 100%;
  height: 15em;
  overflow: hidden;
}

.artcardfooter
{
    display:flex;
    justify-content: space-between;
}

.description
{
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 6em;
    margin:0;
}

.artname
{
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 1.3em;
}
</style>