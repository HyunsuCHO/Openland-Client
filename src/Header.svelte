<script>
    import { onMount } from 'svelte';
    import {MetamaskConnected, MetamaskAccounts, SessionData} from './Session.js';
    import {axios} from './Singleton'
    import DropdownMenu from './DropdownMenu.svelte'
    import SearchBar from './SearchBar.svelte'
    import Asset from './RentAsset.svelte';
    import Create from './Create.svelte';
    import Rankings from './Rankings.svelte';
    import Collection from'./Collection.svelte';
    import {web3, defaultEvmStores} from 'svelte-web3'
    import Activity from './Activity.svelte'
    import Watchlist from './Watchlist.svelte'
    import Profile from './Profile.svelte';
    import MyCollection from './MyCollection.svelte';
    import Explore from './Explore.svelte';
    import Search from './Search.svelte';
    import MetamaskLoginButton from './MetamaskLoginButton.svelte';
    import {getFileURL} from './Util'
    import Drops from "./Drops.svelte";
    import Rent from "./Rent.svelte";
    let searchstring = "";

    onMount(()=>{
    window.onunhandledrejection = function(error) {
        alert(error.reason);
    }
    });
    let signinid, signinpassword;

    function OnDropsButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Drops({target: contenttag, hydrate: true});
    }

    function OnRentButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Rent({target: contenttag, hydrate: true});
    }

    function OnExploreButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Explore({target: contenttag, hydrate: true});
    }

    function OnCreateButtonClick()
    {
        if(!$SessionData)
        {
            alert("Please, Sign in");
            return;
        }
        let contenttag = document.getElementsByTagName('content')[0];
        new Create({target: contenttag, hydrate: true});
    }

    function OnActivityButtonClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Activity({target: contenttag, hydrate: true});
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
    }

    function OnEnterKeyDown(e)
    {
        if(e.keyCode == 13)
        {
            let contenttag = document.getElementsByTagName('content')[0];
            new Search({target: contenttag, hydrate: true, props:{searchstring: searchstring}});
        }
    }

    async function OnLoginButtonClick()
    {
        let formdata = new FormData();
        formdata.append("id", signinid);
        formdata.append("password", signinpassword);

        let result = await $axios.post('/users/signin', {id: signinid, password:signinpassword});

        if(result.data=="Success")
        {
            window.location.reload();
        }
        else
        {
            alert(result.data);
        }
    }

    async function OnLogoutButtonClick()
    {
        if(!$SessionData)
        {
            alert("Please, Sign in");
            return;
        }
        let result = await $axios.post('/users/logout');
        window.location.reload();
        $SessionData = undefined;
    }
</script>

<header>
    <div class="leftflex nomargin">
    <img src="로고URL" alt/>
    <div><a class="sitename" href="/">Openland</a></div>
    </div>
    <div class="headersearchbar nomargin"><SearchBar keydownevent={OnEnterKeyDown} bind:content={searchstring} placeholder="Search items, collections, and accounts"></SearchBar></div>
    <div class="rightflex nomargin">
        <DropdownMenu name="Explore" action={OnExploreButtonClick} contents={[]}></DropdownMenu>
        <DropdownMenu name="Funding" action={OnDropsButtonClick} contents={[]}></DropdownMenu>
        <DropdownMenu name="Rent" action={OnRentButtonClick} contents={[]}></DropdownMenu>
        <DropdownMenu name="Activities" action={OnActivityButtonClick} contents={[/*{name:"Rankings", action:OnRankingsButtonClick}, {name:"Activity", action:OnActivityButtonClick}*/]}></DropdownMenu>
        <DropdownMenu name="Create" contents={[]} action={OnCreateButtonClick}></DropdownMenu>
        <DropdownMenu name="Account" contents={[{name:"Profile", action:OnProfileButtonClick}, {name: "Watchlist", action:OnWatchlistButtonClick}, {name: "My Collections", action:OnMyCollectionButtonClick}]}></DropdownMenu>
        <div>
        {#if $SessionData}
            <pre class="nomargin profilepre">Welcome, {$SessionData.nickname} <img class="profileimg" src={getFileURL($SessionData.picture)}/> <img class="ethereum" src="ethereum.ico"/>{$SessionData.balance}</pre>
            <button on:click={OnLogoutButtonClick}>Logout</button>
        {:else}
            {#if window.ethereum}
                <MetamaskLoginButton></MetamaskLoginButton>
            {:else}
                <a href="https://metamask.io/">Please install Metamask</a>
            {/if}
            Or
            <div class="logindiv">
                <input id="hi" placeholder="ID" class="headerinput" bind:value={signinid}/>
                <input id="hi" placeholder="Password" class="headerinput" type="password" bind:value={signinpassword}/>
                <br>
                <button on:click={OnLoginButtonClick}>Sign in</button>
            </div>
            {/if}
        </div>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-around;
        min-height: 4em;
        align-items: center;
        font-size: medium;
        box-shadow: 0px 0px 10px 0px grey;
        position: fixed;
        top: 0;
        /* width: 100% */
        left: 0;
        right: 0;
        background-color: white;
        z-index: 10;
    }

    #hi
    {
        width: 10em;
    }

    .rightflex.nomargin{
        display: flex;
        align-items: center;
    }

    .leftflex.nomargin{
        display: flex;
        align-items: center;
    }

    .rightflex.nomargin  *{
        width: max-content;
        align-items: center;
    }

    .headersearchbar {
        display: flex;
        align-items: center;
        width: 25vw;
        background-color: rgb(253, 246, 236);
        border-color:rgb(184, 178, 170);
    }

    .profileimg
    {
        display:inline-block;
        width: 2em;
        height: 2em;
        text-align: center;
        border-radius:1em;
        border: 2px solid white;
        margin: 0;
        overflow: hidden;
    }

    .profilepre
    {
        display:inline-flex
    }

    .logindiv
    {
        display:inline;
    }

    .sitename
    {
        font-weight: bolder;
        font-size:xx-large;
    }
</style>