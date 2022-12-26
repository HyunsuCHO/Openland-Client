<script>
    import Sidebar from './Sidebar.svelte'
    import Collapse from './Collapse.svelte'
    import ArtCard from './ArtCard.svelte'
    import {SessionData} from './Session'
    import {axios} from './Singleton'
    import {getFileURL} from './Util'
    import {onMount} from 'svelte'
    export let assets = [

    ], userid, mode = 0;

    async function getAssetData()
    {
        if(!userid)
            return;
        let url = '/assets/getprofileassetdata';
        let params = {}
        if(userid)
            params.userid = userid;
        let result = await $axios.get(url, {params});
        assets = result.data;
    }

    async function getFavoriteData()
    {
        let params = {}
        if(userid)
            params.userid = userid;
        let result = await $axios.get("/assets/getfavoritesbyuserid",{params});
        let temp = []
        for(var i of result.data)
        {
            temp.push({
                id: i.assetid,
                index : 1
            })
        }
        assets = temp;
    }

    async function Onload()
    {
        if(mode == 0)
            await getAssetData();

        else if(mode == 1) // Favorite
        {
            await getFavoriteData();
        }
    }

    $: if(userid != undefined && mode != undefined)
    {
        Onload();
    }

    onMount(Onload);
</script>

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
                <button>Ethereum</button>
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
            {#each assets as asset}
                <ArtCard artid={asset}></ArtCard>
            {/each}
        </div>
    </div>
</div>

<style>
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
</style>
