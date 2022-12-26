<script>
    import DropdownMenu from './DropdownMenu.svelte'
    import ProfileItems from './ProfileItems.svelte'
    import {getFileURL} from './Util';
    import {SessionData} from './Session'
    import {axios} from './Singleton'
    export let profiledata = {}, accountid, mode = 0;

    async function OnAccountIdChange()
    {
        let result = await $axios.get("/users/getprofiledata/"+accountid);  
        profiledata = result.data;
    }

    async function OnCollectedClick()
    {
        mode = 0;
    }

    async function OnFavoritedClick()
    {
        mode = 1;
    }

    $: if(accountid)
    {
            OnAccountIdChange();
    }
    else
    {
            accountid = $SessionData.id;
            OnAccountIdChange();
            //profiledata = $SessionData;
    }
</script>
<div class="profilediv">
    <div class="bannercontainer">
        <img class="profilebannerimg" src={getFileURL(profiledata.picture)} alt/>
    </div>
    <img class="profileiconimg" src={getFileURL(profiledata.picture)} alt/>
    <div class="profileinnerdiv">
        <h1>{profiledata.nickname}</h1>
        {#if profiledata.balance}
            <button>Ethereum {profiledata.balance}</button>
        {/if}
        <h6>Joined {profiledata.createdat}</h6>
        <div class="profilecategorybar">
            <a on:click={OnCollectedClick}><span>Collected {profiledata.collected}</span></a>
            <!--<span><DropdownMenu contents={createdcontentdm} name="Created▽"/></span>-->
            <a on:click={OnFavoritedClick}><span>Favorited {profiledata.favoritedcount}</span></a>
            <!--<span>Hidden {profiledata.hiddencount}</span>
            <span>Activity</span>
            <span><DropdownMenu contents={offerscontentdm} name="Offers▽"/></span>
            <span><DropdownMenu contents={listingscontentdm} name="Listings▽"/></span>-->
        </div>
        <innercontent>
            <ProfileItems userid={accountid} mode={mode}></ProfileItems>
        </innercontent>
    </div>
</div>
<style>
.profilediv
{
    text-align: center;
}

.profileinnerdiv
{
    text-align: center;
    position: relative;
    top: -5em;
}

.bannercontainer
{
  display: block;
  width: 100vw;
  height:13em;
  overflow: hidden;
  margin: 0;
}

.profilebannerimg
{
  display: block;
  width: 100vw;
  height: 50vh;
}

.profileiconimg
{
    display: inline;
    width: 6em;
    height: 6em;
    text-align: center;
    position: relative;
    top: -50px;
    margin:0;
    border-radius:100em;
}

.profilecategorybar
{
    display: flex;
    justify-content: space-around;
}
</style>