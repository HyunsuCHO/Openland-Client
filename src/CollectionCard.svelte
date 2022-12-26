<script>
    export let collectiondata = {}, collectionid={id:1}, displayfooter = false;
    import Tooltip from "./Tooltip.svelte";
    import {axios} from "./Singleton"
    import {getIPFSURL, getFileURL} from './Util';
    import { onMount } from 'svelte';
    import { afterUpdate } from 'svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import Asset from './Asset.svelte';
    import Collection from './Collection.svelte';
    let collectionamediv, usernamediv;
    async function OnCollectionIdChange()
    {
        if(!collectionid) return;
        let result = await $axios.get("/collections/collection/"+collectionid.id);
        collectiondata = result.data;

        /*
        new CollectionNamePresenter({target: collectionamediv, hydrate: true, props:{collectionid:{id: artdata.collectionid}}});
        new UsernamePresenter({target: usernamediv, hydrate: true, props:{userid:{id: artdata.creator}}});
        */
    };
    //OnArtIdChange();

    function OnClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Collection({target: contenttag, hydrate: true, props:{collectionid:{id: collectionid.id}}});
    }


    $: if(collectionid != "")
    {
        OnCollectionIdChange();
    }
</script>

<div class="artcarddiv">
    <a on:click={OnClick}>
        <img class="nomargin" src={getFileURL(collectiondata.featuredimg)} alt/>
        <br/>
        <!--<h6 class="nomargin">{artdata.collection}</h6>-->
        <!--<CollectionNamePresenter collectionid={{id: artdata.collectionid}}></CollectionNamePresenter>-->
        <div bind:this={collectionamediv}></div>
        <h4 class="nomargin">{collectiondata.name}</h4>
        <!--<p class="nomargin">by <a href>{artdata.author.name}</a></p>-->
        <UsernamePresenter userid={{id: collectiondata.creator}}></UsernamePresenter>
        <!--<div bind:this={usernamediv}></div>-->
        <br/>
        <p>{collectiondata.description}</p>
        <!--
        {#if displayfooter}
            <div class="artcardfooter">
                <Tooltip name="…">More Options</Tooltip>
                <span>Favorites {artdata.favorites}</span>
            </div>
        {/if}-->
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
  overflow: auto;
  margin: 0.5em;
}

.artcarddiv img 
{
  display: inline;
  width: 100%;
  height: 15em;
}

.artcardfooter
{
    display:flex;
    justify-content: space-between;
}
</style>