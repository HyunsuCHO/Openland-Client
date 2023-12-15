<script>

    export let _dropsdata = {}, _dropsid = {};
    let collectiondata = _dropsdata;
    let collectionid = JSON.parse(JSON.stringify(_dropsid));
    import Tooltip from "./Tooltip.svelte";
    import {axios} from "./Singleton"
    import {getIPFSURL, getFileURL} from './Util';
    import { onMount } from 'svelte';
    import { afterUpdate } from 'svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import Asset from './RentAsset.svelte';
    import Collection from './Collection.svelte';
    import DropInfo from "./DropInfo.svelte";
    let collectionamediv, usernamediv;
    let representingartdata = {asset:{}, token:{}}; //= {icon: "https://picsum.photos/100",src:"https://picsum.photos/500", title:"TestAsset1", description:"placeholder",author:{name:"TestAccount1"}};

    async function OnCollectionIdChange()
    {
        if(!collectionid) return;
        // let result = await $axios.get("/collections/collection/"+collectionid.id);
        collectiondata = collectiondata.data;

        /*
        new CollectionNamePresenter({target: collectionamediv, hydrate: true, props:{collectionid:{id: artdata.collectionid}}});
        new UsernamePresenter({target: usernamediv, hydrate: true, props:{userid:{id: artdata.creator}}});
        */
    };
    //OnArtIdChange();

    function openDropInfo()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new DropInfo({target: contenttag, hydrate: true, props:{collectionid:{id: collectionid.id}}});
    }


</script>

<div class="artcarddiv">
    <a on:click={openDropInfo}>
        <br/>

        <img class="nomargin" src={collectiondata.thumbnail} alt/>
        <br/>
<!--        <h6 class="nomargin">{artdata.collection}</h6>-->
<!--        <CollectionNamePresenter collectionid={{id: collectiondata.id}}></CollectionNamePresenter>-->
<!--        <div bind:this={collectionamediv}></div>-->
        <h4 class="nomargin">{collectiondata.title}</h4>
        <p class="nomargin">by <a href>{collectiondata.author.name}</a></p>
<!--        <UsernamePresenter userid={{id: collectiondata.creator}}></UsernamePresenter>-->
        <!--<div bind:this={usernamediv}></div>-->
        <br/>
        <p>Price : {collectiondata.price}</p>
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