<script>
    export let assetid={id:1, index:1}, assetdata={};
    import {axios} from "./Singleton"
    import { onMount } from 'svelte';
    import Asset from './RentAsset.svelte'

    async function OnAssetIdChange()
    {
        if(!assetid.id) return;
        let result = await $axios.get("/assets/asset/"+assetid.id);
        assetdata = result.data;
    }

    function OnClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Asset({target: contenttag, hydrate: true, props:{assetid:{id: assetid.id, index:assetid.index}}});
    }

    if (assetid != '')
    {
        OnAssetIdChange();
    }
</script>

<a on:click|stopPropagation|preventDefault={OnClick}>{assetdata.name}</a>