<script>
    import Explore from './Explore.svelte'
    //TODO: 카테고리별 정렬
    let watchlistdata = [];
    import {axios} from "./Singleton"
    import {onMount} from "svelte"
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import WatchListRow from './WatchListRow.svelte';
    let watchlistdatas = [
        {
            collection: "TestCollection",
            volume: 887.2,
            _24h:"+40.23%",
            _7d:"+10.87%",
            floorprice:4.2,
            owners:"30.8K",
            items:"102.9K"
        },
        {
            collection: "TestCollection2",
            volume: 158.3,
            _24h:"-21.53%",
            _7d:"-3.42%",
            floorprice:1.2,
            owners:"15.3K",
            items:"30.3K"
        },
        {
            collection: "TestCollection3",
            volume: 15.6,
            _24h:"+5.32%",
            _7d:"+0.4%",
            floorprice:0.7,
            owners:"5.7K",
            items:"3.9K"
        },
        {
            collection: "TestCollection4",
            volume: 305.7,
            _24h:"-8.21%",
            _7d:"+1.65%",
            floorprice:2.6,
            owners:"20.7K",
            items:"56.9K"
        },
        {
            collection: "TestCollection5",
            volume: 15.6,
            _24h:"+5.32%",
            _7d:"+0.4%",
            floorprice:0.7,
            owners:"5.7K",
            items:"3.9K"
        },
        {
            collection: "TestCollection6",
            volume: 887.2,
            _24h:"+40.23%",
            _7d:"+10.87%",
            floorprice:4.2,
            owners:"30.8K",
            items:"102.9K"
        },
        {
            collection: "TestCollection7",
            volume: 158.3,
            _24h:"-21.53%",
            _7d:"-3.42%",
            floorprice:1.2,
            owners:"15.3K",
            items:"30.3K"
        },
        {
            collection: "TestCollection8",
            volume: 305.7,
            _24h:"-8.21%",
            _7d:"+1.65%",
            floorprice:2.6,
            owners:"20.7K",
            items:"56.9K"
        },
        {
            collection: "TestCollection9",
            volume: 15.6,
            _24h:"+5.32%",
            _7d:"+0.4%",
            floorprice:0.7,
            owners:"5.7K",
            items:"3.9K"
        },
        {
            collection: "TestCollection10",
            volume: 158.3,
            _24h:"-21.53%",
            _7d:"-3.42%",
            floorprice:1.2,
            owners:"15.3K",
            items:"30.3K"
        },
    ];
    
    const durations = ["24h","7d","30d","all"];
    const categories = ["New", "Art", "Collectibles"]
    const chains = ["Ethereum"]

    function OnExploreButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Explore({target: contenttag, hydrate: true});
    }

    async function OnDataChange()
    {
        let result = await $axios.get("/watches/getdata");
        watchlistdata = result.data;
    }

    onMount(OnDataChange);
</script>

<div class="watchlistdiv">
    <div>
    <h1>My Watchlist</h1>
                <table>
                    <thead>
                        <th>Collection</th>
                        <th>Owner</th>
                        <th>Items</th>
                    </thead>
                    {#if watchlistdata.length > 0}
                    <tbody>
                        {#each watchlistdata as data}
                        <!--
                            <tr>
                                <td><CollectionNamePresenter collectionid={{id: data.collectionid}}></CollectionNamePresenter></td>
                                <td>{data.floorprice}eth</td>
                                <td>{data.volume}eth</td>
                                <td>{data._24h}</td>
                                <td>{data._7d}</td>
                                <td><UsernamePresenter userid={{id: data.userid}}></UsernamePresenter></td>
                                <td>{data.items}</td>
                            </tr>
                        -->
                        <WatchListRow data={data}></WatchListRow>
                        {/each}
                    </tbody>
                    {/if}
                </table>
                {#if watchlistdata.length == 0}
                <div class="nothavingwatchlist">
                    <h6>You are not watching any collections</h6>
                    <button on:click={OnExploreButtonClick}>Explore collections</button>
                </div>
                {/if}
    </div>
</div>

<style>
h1,h6,button
{
    text-align:center;
}

.nothavingwatchlist
{
    text-align:center;
}

.watchlistdiv
{
    width: 60vw;
    text-align:center;
    position: relative;
    left:20vw;
}
</style>