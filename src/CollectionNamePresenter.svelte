<script>
    export let collectionid={id:1}, collectiondata={};
    import {axios} from "./Singleton"
    import { onMount } from 'svelte';
    import Collection from './Collection.svelte'

    async function OnCollectionIdChange()
    {
        if(!collectionid.id) return;
        let result = await $axios.get("/collections/collection/"+collectionid.id);
        collectiondata = result.data;
    }
    $: if (collectionid && collectionid != '')
    {
        OnCollectionIdChange();
    }

    function OnClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Collection({target: contenttag, hydrate: true, props:{collectionid:{id: collectionid.id}}});
    }

</script>

<a on:click|stopPropagation|preventDefault={OnClick}>{collectiondata.name}</a>