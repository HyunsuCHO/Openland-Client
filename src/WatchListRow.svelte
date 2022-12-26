<script>
    import CollectionNamePresenter from "./CollectionNamePresenter.svelte";
    import UsernamePresenter from "./UsernamePresenter.svelte";
    import {axios} from "./Singleton"
    import {onMount} from "svelte"
    export let data = {}
    let collectiondata = {}

    async function countAssets()
    {
        if(data.collectionid)
            data.count = (await $axios.get("/collections/countassets/"+data.collectionid)).data;
    }

    async function getCollectionData()
    {
        if(!data.collectionid) return;
            let result = await $axios.get("/collections/collection/"+data.collectionid);
        collectiondata = result.data;
    }
    $: if (data !== '') {       // make it react to changes (in the parent)
        countAssets();
        getCollectionData()
    }; 
    //onMount(countAssets);
</script>

<tr>
    <td><CollectionNamePresenter collectionid={{id: data.collectionid}}></CollectionNamePresenter></td>
    <td><UsernamePresenter userid={{id: collectiondata.creator}}></UsernamePresenter></td>
    <td>{data.count}</td>
</tr>