<script>
    import Sidebar from './Sidebar.svelte';
    import Collapse from './Collapse.svelte';
    import ArtCard from './ArtCard.svelte';
    import {axios} from './Singleton';
    import {onMount} from 'svelte';
    import Watchlist from './Watchlist.svelte';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import AssetImagePresenter from './AssetImagePresenter.svelte';
    import AssetNamePresenter from './AssetNamePresenter.svelte';
    import {getFileURL} from './Util'
    import {CollectionCache} from './Cache'
    export let collectiondata = {
        items: [

        ],
        itemscount : 0,
        ownerscount: 0,
        floorprice: 0,
        volumetraded: 0,
        title: "Test Collection",
        author: {name : "TestAccount", twitterlink: ""},
        bannerimage: "https://picsum.photos/511",
        iconimage: "https://picsum.photos/251",
        description: "This is test collection.",
    }, collectionid, assets = [], activitydata = [];
    
    let info = {assets: 0, volumes:0,owners:0};

    let index = 0, y, type = 0;

    async function OnCollectionIdChange()
    {
        let result
        if(!collectionid) return;
        if($CollectionCache[collectionid.id])
            collectiondata = $CollectionCache[collectionid.id];
        else
        {
            result = await $axios.get("/collections/collection/"+collectionid.id);
            if(result.data)
                $CollectionCache[collectionid.id] = result.data;
            collectiondata = result.data;
        }

        /*
        let targets = document.getElementsByClassName("replacewithcreator");
        for(let ele of targets)
        {
            if(ele)
            new UsernamePresenter({target:ele, hydrate: true, props:{userid:{id:collectiondata.creator}}});
        }*/
        result = await $axios.get("/collections/getadditionalinfo/"+collectionid.id);
        info = result.data;

        result = await $axios.get("/collections/assets/"+collectionid.id);
        assets = result.data;
    };

    async function getActivities()
    {
        let params = {collectionid: collectionid.id, offset:index};
        let result = await $axios.get("/collections/getactivities", {params});
        if(result.data)
            activitydata = [...activitydata, ...result.data];
    }
    $: if (collectionid && collectionid != '' && type)
    {
        if(type == 0)
            OnCollectionIdChange();
        else
            getActivities();
    }

    async function OnAddWatchButtonClicked()
    {
        let result = await $axios.get("/watches/add/"+collectionid.id);
        alert(result.data);
        let content = document.getElementsByTagName("content");
        new Watchlist({target:content, hydrate: true});
    }
    //OnArtIdChange();
    $: if(index == 0 || y / (window.screen.height * index) > 1)
    {
        if(type == 0)
        {
            OnCollectionIdChange();
        }
        else
        {
            getActivities();
        }
        index++;
    }

    let itemsdiv, activitydiv;

    function OnItemsClick()
    {
        itemsdiv.classList.add("categorybarselected");
        activitydiv.classList.remove("categorybarselected");
        type = 0;
    }

    function OnActivityClick()
    {
        itemsdiv.classList.remove("categorybarselected");
        activitydiv.classList.add("categorybarselected");
        type = 1;
        activitydata = [];
    }

    function ActivityType(type)
    {
        switch (type)
        {
            case 0: return "Minted";
            case 1: return "List";
            case 2: return "Offer";
            case 3: return "Sale";
            case 4: return "Transfer";
        }
    }

</script>

<div class="collectiondiv">
    <div class="bannercontainer">
        <img class="collectionbannerimg" src={getFileURL(collectiondata.bannerimg)} alt/>
    </div>
    <img class="collectioniconimg" src={getFileURL(collectiondata.logoimg)} alt/>

    <div class="collectioninnerdiv">
        <h1>{collectiondata.name}</h1>
        <h7 class="nobold">Created by <UsernamePresenter userid={{id:collectiondata.creator}}/><!--<a class="replacewithcreator"></a>--></h7>

        <!--{#if collectiondata.author.twitterlink.length != 0}
        <div><a href={collectiondata.author.twitterlink}>twitter</a></div>
        {/if}-->
        <div class="tablecontainer">
            <div class="collectioninfotable">
                <div class="nobold collectioninfotableitem leftmostitem">
                    <h4>{info.assets}</h4>
                    <h7 class="nobold">items</h7>
                </div>
                <div class="nobold collectioninfotableitem">
                    <h4>{info.owners}</h4>
                    <h7 class="nobold">owners</h7>
                </div>
                <!--
                <div class="nobold collectioninfotableitem">
                    <h4>{collectiondata.floorprice}</h4>
                    <h7 class="nobold">floor price</h7>
                </div>
                -->
                <div class="nobold collectioninfotableitem rightmostitem">
                    <h4>{info.volumes}</h4>
                    <h7 class="nobold">volume traded</h7>
                </div>
            </div>
        </div>

        <button class="watchbutton" on:click={OnAddWatchButtonClicked}>Add Watch</button>

        <h6 class="nobold">{collectiondata.description}</h6>
        <div class="collectioncategorybar">
            <div bind:this={itemsdiv} class="categorybardiv categorybarselected" on:click={OnItemsClick}>Items</div>
            <div bind:this={activitydiv} class="categorybardiv" on:click={OnActivityClick}>Activity</div>
        </div>
        <div class="itemsdiv">
            <!--
            <Sidebar>
                <Collapse buttonname="Status">
                    <div class="eventtypediv">
                        <button>Buy Now</button><br/>
                        <button>On Auction</button><br/>
                        <button>New</button><br/>
                        <button>Has Offers</button>
               		</div>
                </Collapse>
                <Collapse buttonname="Price">
                    <select>
                        <option>United States Dollar (USD)</option>
                        <option>Ether (ETH)</option>
                    </select><br/>
                    <input type="number" placeholder="Min"/> to <input type="number" placeholder="Max"/>
                    <button>Apply</button>
                </Collapse>
                <Collapse buttonname="Collections">
                    <input placeholder="Filter"/>
                </Collapse>
                <Collapse buttonname="Chains">
                    <div class="chainsdiv">
                        <button><img class="ethereum" src="ethereum.ico"/>Ethereum</button>
                    </div>
                </Collapse>
                <Collapse buttonname="Categories">
                    <div class="chainsdiv">
                        <button>Cartoon</button>
                        <button>Modern</button>
                        <button>Classic</button>
                    </div>
                </Collapse>
            </Sidebar>
            -->
            <div>
                <!--
                <div>
                    <input class="searchbynameinput" placeholder="Search by name"/>
                    <select class="itemsselect">
                        <option>Single items</option>
                        <option>All items</option>
                        <option>Bundles</option>
                    </select>
                    <select class="sortbyinput">
                        <option>Recently Received</option>
                        <option>Recently Created</option>
                        <option>Recently Listed</option>
                        <option>Recently Sold</option>
                        <option>Recently Received</option>
                        <option>Ending Soon</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Highest Last Sale</option>
                        <option>Most Viewed</option>
                        <option>Most Favorited</option>
                        <option>Oldest</option>
                    </select>
                </div>
                -->
                <div class="assetcards">
                    {#if type == 0}
                    {#each assets as asset}
                        <ArtCard artid={{id:asset.id, index:1}}></ArtCard>
                    {/each}
                    {:else}
                    <table>
                        <thead>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Price</th>
                            <!--<th>Quantity</th>-->
                            <th>From</th>
                            <th>To</th>
                            <th>Time</th>
                        </thead>
                        <tbody>
                            {#each activitydata as asset}
                                {#if asset.id}
                                    <tr>
                                        <td>{ActivityType(asset.type)}</td>
                                        <td class="activitiyitem">
                                            <div class="itemimg">
                                            <AssetImagePresenter assetid={{id:asset.assetid, index:asset.tokenindex}}></AssetImagePresenter>
                                            </div>
                                            <div>
                                                <!--<CollectionNamePresenter collectionid={{id:asset.collectionid}}></CollectionNamePresenter>
                                                <br>-->
                                                <AssetNamePresenter assetid={{id:asset.assetid, index:asset.tokenindex}}></AssetNamePresenter>
                                            </div>
                                        </td>
                                        <td><img class="ethereum" src="ethereum.ico"/>{asset.cost}</td>
                                        <!--<td>1</td>-->
                                        <td>{asset.from}</td>
                                        <td>{asset.to}</td>
                                        <td>{asset.timestamp}</td>
                                    </tr>
                                {/if}
                            {/each}
                            
                        </tbody>
                    </table>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
<style>
.collectiondiv
{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.collectioninnerdiv
{   
    display:flex;
    flex-direction: column;
    top: -50px;
    position: relative;
    width: 100%;
    align-items:center;
}
.bannercontainer
{
  display: block;
  width: 100vw;
  height:13em;
  overflow: hidden;
  margin: 0;
}

.collectionbannerimg
{
  display: block;
  width: 100vw;
  height: 50vh;
}

.collectioniconimg
{
    display: inline;
    width: 6em;
    height: 6em;
    text-align: center;
    position: relative;
    top: -50px;
    margin:0;
    border-radius:100em;
    border: 2px solid white;
}

.tablecontainer
{
    margin: 0;
    padding: 0;
    text-align: center;
}

.collectioninfotable{
    display: inline-flex;
    width: 27em;
    height: 5em;
    margin: 1em;
}

.collectioninfotableitem{
    width: 9em;
    
    border: 1px solid rgb(194, 194, 194);
    margin: 0;
    display: inline-block;
}

.collectioninfotableitem.leftmostitem
{
    border-radius: 5px 0 0 5px;
}

.collectioninfotableitem.rightmostitem
{
    border-radius: 0 5px 5px 0;
}

h1,h6, h4, h7{
    text-align: center;
    display: block;
}

.collectioninfotableitem h4{
    margin: 0.5em;
}

.collectioninfotableitem h7{
    margin-top: 0;
    margin-bottom: 1em;
}

.collectioncategorybar
{
    display: flex;
    justify-content: space-evenly;
}

.eventtypediv,.chainsdiv
{
    display: block;
}
.itemsdiv
{
    display:flex;
    justify-content: space-between;
}
.searchbynameinput
{
    width:50vw;
    height:3em;
}

.itemsselect
{
    width:15vw;
    height:3em;
}

.sortbyinput
{
    width:15vw;
    height:3em;
}

.categorybardiv
{
    margin: 0;
    padding: 0.7em;
    font-weight: bold;
}

.categorybarselected
{
    border-bottom: 3px solid rgb(1, 119, 255);
}

.watchbutton
{
    width:6em;
}
</style>