<script>
    export let artdata = {}, artid={id:1, index:1}, displayfooter = false;
    import Tooltip from "./Tooltip.svelte";
    import {axios} from "./Singleton"
    import {getIPFSURL} from './Util';
    import { onMount } from 'svelte';
    import { afterUpdate } from 'svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import Asset from './RentAsset.svelte';
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


    // $: if(artid!="")
    // {
    //     OnArtIdChange();
    // }
</script>

<div class="artcarddiv">
    <input type="number" style="display: none" bind:value={artid} on:change={OnArtIdChange}>
    <div on:click={OnClick} style="height: max-content">

        <img class="square_img nomargin" src={artdata.ipfshash} alt/>

        <div style="padding: 15px; font-size: 10px">
        <h5 style="margin-top: 0" class="nomargin artname">{artdata.name}</h5>
            by&nbsp;{artdata.creator}
        <br/>
        <p class="artcard_description">{artdata.description}</p>
        <div class="artcardfooter">
            <Tooltip name="…">More Options</Tooltip>
            <span>Favorites <span style="font-weight: 600"> {artdata.favorites}</span></span>
        </div>
        </div>
    </div>
</div>

<style>
.artcarddiv
{
  display: inline-block;
  width: 24rem;
  min-height: 34rem;
  min-width: 24rem;
  max-width: 24rem;
  box-shadow: 0 0 8px 5px #eeeeee;
  border-radius :0.7rem;
  /*overflow: auto;*/
  margin: 0.5rem 1.5rem 1.5rem 0;
}

.square_img {
    width: 100%; /* 상위 태그의 가로 너비에 맞춤 */
    height: auto; /* 세로 너비를 가로 너비에 맞춰 조정 */
    aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
    object-fit: cover; /* 이미지가 태그를 넘어가지 않도록 조정 */
    display: block;
}


.artcardfooter
{
    display:flex;
    justify-content: space-between;
}

.artcard_description
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