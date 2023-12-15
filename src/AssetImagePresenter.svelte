<script>
    export let assetid={id:1, index:1}, assetdata={};
    import {axios} from "./Singleton"
    import { onMount } from 'svelte';
    import Asset from './RentAsset.svelte'
    import {getIPFSURL} from './Util'

    async function OnAssetIdChange()
    {
        if(!assetid.id) return;
        let result = await $axios.get("/assets/asset/"+assetid.id);
        assetdata = result.data;
    }
    //onMount(OnAssetIdChange);

    $: if (assetid != '')
    {
        OnAssetIdChange();
    }

    function OnClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Asset({target: contenttag, hydrate: true, props:{assetid:{id: assetid.id, index:assetid.index}}});
    }

    //let assetproxy = new Proxy(assetid, OnAssetIdChange);
</script>

<a on:click|stopPropagation|preventDefault={OnClick}><img src={getIPFSURL(assetdata.ipfshash)}></a>

<style>
    img
    {
        width:2em;
        height:2em;
        border-radius: 0.3em;
        margin:0;
    }
</style>