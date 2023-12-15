<script>
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import ArtCard from './ArtCard.svelte';
    import Asset from './RentAsset.svelte';
    import Explore from './Explore.svelte';
    import Create from './Create.svelte';
    import {MetamaskAccounts, MetamaskConnected,SessionData} from './Session.js';
    //import {web3,defaultEvmStores} from 'svelte-web3'
    import { onMount } from 'svelte';
    import { tick } from 'svelte';
    import {getIPFSURL} from './Util'
    import {axios, modalslot, modaltoggle, modalprop, backtrace, web3} from './Singleton';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import Modal from './Modal.svelte';
    let component = this;
    let representingartdata = {asset:{}, token:{}}; //= {icon: "https://picsum.photos/100",src:"https://picsum.photos/500", title:"TestAsset1", description:"placeholder",author:{name:"TestAccount1"}};
    let trendingartdata = []; //= [{src:"https://picsum.photos/501", title:"TestAsset2", description:"placeholder",author:{name:"TestAccount2"}},{src:"https://picsum.photos/502", title:"TestAsset3", description:"placeholder",author:{name:"TestAccount3"}},{src:"https://picsum.photos/503", title:"TestAsset4", description:"placeholder",author:{name:"TestAccount4"}}];
    let trdatadiv,collectionname;
    let trace = () =>{
        let contenttag = document.getElementsByTagName('content')[0];
        contenttag.replaceWith(conponent);
    }

    
    history.back = ()=>{
        $backtrace.pop()();
    }

    function OnExploreButton()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Explore({target: contenttag, hydrate: true});
        $backtrace.push(trace);
    }

    function OnCreateButton()
    {
        if(!$SessionData)
        {
            alert("Please, Sign in");
            return;
        }
        let contenttag = document.getElementsByTagName('content')[0];
        new Create({target: contenttag, hydrate: true});
    }

    function OnRepresentingArtDataClicked()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Asset({target: contenttag, hydrate: true, props:{assetid: {id: representingartdata.asset.id, index:representingartdata.token.id}}});
    }

    async function Wrapper()
    {
        
        
        if(window.ethereum){
            //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //$MetamaskAccounts = accounts
            web3.set(new Web3(window.ethereum));
            window.ethereum.on('accountsChanged',async function (naccounts) {
                $MetamaskAccounts = naccounts;
                /*
                if(accounts[0] == undefined || accounts[0] == null)
                {
                    $session = undefined;
                }
                else
                {
                    $session = {
                        ethaddress: window.ethereum.selectedAddress,
                        name: window.ethereum.selectedAddress.substring(0,7),
                        balance: await $web3.eth.getBalance(window.ethereum.selectedAddress)
                    }
                }*/
            });
            /*
            if(window.ethereum.selectedAddress)
            {
                
                $session = {
                    ethaddress: window.ethereum.selectedAddress,
                    name: window.ethereum.selectedAddress.substring(0,7),
                    balance: 0
                }
            }
            */
        }
        
        representingartdata = (await $axios.get("/assets/getrandomassets/1")).data[0];
        trendingartdata = (await $axios.get("/assets/getrandomassets/3")).data;
        RegenerateArtCards();
        //new CollectionNamePresenter({target: collectionname, hydrate: true, props:{collectionid:{id: representingartdata.collectionid}}})
    }

    function RegenerateArtCards()
    {
        for(let child of trdatadiv.children)
        {
            child.remove();
        }
        for(let item of trendingartdata)
        {
            let ele = document.createElement("div");
            ele.style.display = "inline";
            ele.style.height = "28em";
            ele.style.maxHeight = "32em";
            trdatadiv.appendChild(ele);
            new ArtCard({target:ele, hydrate: true, props: {artid: {id: item.asset.id, index:item.token.id}}});
        }
    }

    onMount(Wrapper)
</script>
<body>
<Header/>
<content>
<div class="maindiv">
    <div class="mainpagestatementdiv">
        <div>
            <h1 class="mainpagestatement nomargin">Discover, collect, and sell</h1>
            <h1 class="nomargin">extraordinary NFTs</h1>
            <br>
            <h5 style="font-weight:normal" class="mainpagesubstatement normargin">OpenLand is the world's first and</h5>
            <h5 style="font-weight:normal" class="nomargin">largest NFT marketplace</h5>
            <br>
            <button style="background-color:rgb(1, 119, 255)" on:click={OnExploreButton}>Explore</button>
            <button style="background-color:white; color:rgb(1, 119, 255)" on:click={OnCreateButton}>Create</button>
        </div>
        {#if representingartdata}
        <div class="artcarddiv">
            <a style="color:inherit" on:click|stopPropagation|preventDefault={OnRepresentingArtDataClicked}>
                <img class="artcardimg nomargin" src={getIPFSURL(representingartdata.asset.ipfshash)} alt/>
                <br/>
                <div class="artcardinnerdiv">
                    <img class="artcardicon" src={getIPFSURL(representingartdata.asset.ipfshash)}/>
                    <div class="artcarddescdiv">
                        <h6 class="nomargin">{representingartdata.asset.name}</h6>
                        <!--<h7 class="nomargin"><a href>{representingartdata.author.name}</a></h7>-->
                        <CollectionNamePresenter collectionid={{id: representingartdata.asset.collectionid}}></CollectionNamePresenter>
                        <!--<span bind:this={collectionname}></span>-->
                    </div>
                </div>
            </a>
        </div>
        {/if}
    </div>


    <h4 class="textcenter">Notable Drops</h4>
    <div bind:this={trdatadiv}>
        {#each trendingartdata as data}
            <!--<ArtCard artid={{id:data.id}}/>-->
        {/each}
    </div>

    <h4 class="textcenter">What is NFT?</h4>
    <!--<video src="https://youtu.be/Oz9zw7-_vhM"><track kind="captions"/></video>-->
    <iframe width="960" height="640" src="https://www.youtube.com/embed/Oz9zw7-_vhM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
</content>
<Footer/>
<Modal bind:modalslot={$modalslot} bind:showModal={$modaltoggle} bind:slotprop={$modalprop}></Modal>
</body>

<style>
content
{
    padding-top:6em ;
    display: block;
    /*margin-left:5vw;
    margin-right:5vw;*/
    margin-bottom:4em;
}
.maindiv
{
    width: 60vw;
    position: relative;
    left: 20vw;
    display:flex;
    flex-direction: column;
    align-items: center;
}
button
{
    width: 9em;
    height:3em;
    border-radius: 0.5em;
    border: 1px solid rgb(1, 119, 255);
    font-size: large;
}
.mainpagestatementdiv
{
    justify-content: space-between;
}

.artcarddiv
{
  display: inline-block;
  width: 30em;
  height: 28em;
  border-radius: 1em;
  box-shadow: 5px 5px 5px 5px gray;
  overflow: hidden;
  margin: 0.5em;
}

.artcardimg
{
  display: inline;
  width: 100%;
  height: 82%;
}

.artcardfooter
{
    display:flex;
    justify-content: space-between;
}

.artcardinnerdiv
{
    display:inline-flex;
    align-items: center;
}

.artcardicon
{
    width: 2em;
    height: 2em;
    border-radius: 2em;
    margin: 1em;
}

.artcarddescdiv
{
    width: 100%;
}


</style>