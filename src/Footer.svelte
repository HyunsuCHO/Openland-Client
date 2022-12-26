<script>
    import Explore from "./Explore.svelte";
    import Profile from "./Profile.svelte";
    import Rankings from "./Rankings.svelte";
    import Activity from "./Activity.svelte";
    import Watchlist from "./Watchlist.svelte";
    import MyCollection from "./MyCollection.svelte";
    import {SessionData} from "./Session"

    function OnMarketplaceButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Explore({target: contenttag, hydrate: true})//.$set({currentcategory: this.getAttribute('value')});
        document.documentElement.scrollTop = 0;
    }

    function OnProfileButtonClick()
    {
        if(!$SessionData)
        {
            alert("Please, Sign in");
            return;
        }
        let contenttag = document.getElementsByTagName('content')[0];
        new Profile({target: contenttag, hydrate: true});
        document.documentElement.scrollTop = 0;
    }

    function OnRankingsButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Rankings({target: contenttag, hydrate: true});
        document.documentElement.scrollTop = 0;
    }

    function OnActivityButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Activity({target: contenttag, hydrate: true});
        document.documentElement.scrollTop = 0;
    }

    function OnWatchlistButtonClick()
    {
        if(!$SessionData)
        {
            alert("Please, Sign in");
            return;
        }
        let contenttag = document.getElementsByTagName('content')[0];
        new Watchlist({target: contenttag, hydrate: true});
        document.documentElement.scrollTop = 0;
    }

    function OnMyCollectionButtonClick()
    {
        if(!$SessionData)
        {
            alert("Please, Sign in");
            return;
        }
        let contenttag = document.getElementsByTagName('content')[0];
        new MyCollection({target: contenttag, hydrate: true});
        document.documentElement.scrollTop = 0;
    }
</script>

<footer>
    <div class="footerdescriptiondiv">
    </div>
    <div class="footermenudiv">
        <div class="categories">
            <h6>Marketplace</h6>
            <a value="Trending" on:click={OnMarketplaceButtonClick}>Explore</a>
        </div>
        <div class="categories">
            <h6>My Account</h6>
            <a on:click={OnProfileButtonClick}>Profile</a>
            <a on:click={OnWatchlistButtonClick}>Watchlist</a>
            <a on:click={OnMyCollectionButtonClick}>My Collections</a>
        </div>
        <div class="categories">
            <h6>Stats</h6>
            <a on:click={OnActivityButtonClick}>Activity</a>
        </div>
    </div>
</footer>

<style>
footer
{
    display:flex;
    background-color: rgb(66, 154, 255);
    height: 20em;
    color: white;
}
.footerdescriptiondiv
{
    width: 30vw;
}
.footermenudiv
{
    width: 70vw;
    display:flex;
    justify-content: space-around;
}
.categories
{
    display:flex;
    flex-direction: column;
    border-left: 1px solid rgb(221, 250, 255);
    margin-top: 2em;
    padding-left: 2em;
    height: 15em;
}
a
{
    color: white;
}
</style>