<script>
    import Collapse from "./Collapse.svelte";
    import LineGraph from "./LineGraph.svelte";
    import {axios, modalslot, modalprop, modaltoggle} from "./Singleton";
    import {getIPFSURL, getFileURL} from './Util';
    import CollectionNamePresenter from "./CollectionNamePresenter.svelte";
    import UsernamePresenter from "./UsernamePresenter.svelte";
    import {onMount} from 'svelte';
    import {SessionData, MetamaskAccounts} from './Session'
    import Profile from "./Profile.svelte";
    import BidMenu from "./BidMenu.svelte";
    import TokenSelector from "./TokenSelector.svelte";
    import {AssetCache, CollectionCache} from "./Cache"
    import {web3, getContract} from "./Singleton"
    import {marketaddress} from "./Setting.js"
    export let assetid={id:1, index:1};

    let usernamespan, listdata=[], offerdata=[], collectiondata={};
    // Add dependencies
    
    export let assetdata ={
        title:"TestAsset",
        author: {name: "TestAccount"},
        owner: {name: "OwnerAccount"},
        twitterlink: "https://twitter.com",
        currentstate: "",
        description: "This is test asset.",
        assetimg: "https://picsum.photos/1000",
        collection: "TestCollection",
        highestprice: 0.775,
        favorites: 87,
        listings:[{price: 10, usd: 100, expiration:"2 month", from:"TestAccount2"}],
        offers:[{price: 5, usd: 50, floor:30, expiration:"3 month", from:"TestAccount3"}, {price: 10, usd: 100, floor:40, expiration:"4 month", from:"TestAccount4"}],
        pricehistory:{
            labels:["2022-04-17","2022-04-18","2022-04-19","2022-04-20","2022-04-21"],
            datasets:[
                {
                    values:[10,7,5,3,2]
                }
            ]
        },
        properties:
            [
                {
                    type: "TestType1",
                    value: "TestProperty1",
                    percent: 100,
                },
                {
                    type: "TestType2",
                    value: "TestProperty2",
                    percent: 100,
                },
                {
                    type: "TestType3",
                    value: "TestProperty3",
                    percent: 100,
                },
                {
                    type: "TestType4",
                    value: "TestProperty4",
                    percent: 100,
                },
                {
                    type: "TestType5",
                    value: "TestProperty5",
                    percent: 100,
                },
                {
                    type: "TestType6",
                    value: "TestProperty6",
                    percent: 100,
                }
                ,{
                    type: "TestType7",
                    value: "TestProperty7",
                    percent: 100,
                }
            ]
    };

    export let tokendata = {

    }

    function OnMakeBidButtonClick()
    {
        $modaltoggle = true;
        $modalprop = {assetid: assetid.id};
        $modalslot = BidMenu;
    }

    async function OnListAcceptButtonClick()
    {
        let id =this.getAttribute("value");
        let cost =this.getAttribute("cost");
        let contract = getContract(assetdata.address);
        let result = await contract.methods.acceptListing(id, $marketaddress).send({from:window.ethereum.selectedAddress, gas:6721975, value: cost + 500000});
        //let result = await $axios.post("/activities/acceptlist",{activityid: id, address: $MetamaskAccounts ? $MetamaskAccounts[0] : undefined,});
        alert("Used gas:" + result.gasUsed);
    }

    async function getTokenData()
    {
        let result = await $axios.get("/assets/assetoken/"+assetid.id+"/"+assetid.index);
        tokendata = result.data;
    }

    async function OnOfferAcceptButtonClick()
    {
        let id =this.getAttribute("value");
        let to =this.getAttribute("to");
        $modaltoggle = true;
        $modalprop = {assetid: assetid.id, activityid: id, to: to, assetaddress:assetdata.address};
        $modalslot = TokenSelector;
    }

    async function OnFavoriteButtonClick()
    {
        let result = await $axios.get("/assets/createfavorite/"+assetid.id);
        /*if(result.data!="Success")
            alert(result.data);*/
        let content = document.getElementsByTagName("content")[0];
        new Profile({target:content, hydrate: true, props:{mode:1}})
    }

    async function getOffers()
    {
        let result = await $axios({url:"/activities/getofferact", params:{assetid: assetid.id, offset:0}});
        offerdata = result.data;

        let max = 0
        for(let o of offerdata)
        {
            if(o.cost > max)
            {
                max = o.cost
            }
        }
        assetdata.highestprice = max;
    }

    async function getLists()
    {
        let result = await $axios.get("/activities/getlistact",{offset:0, assetid: assetid.id});
        listdata = result.data;
    }

    async function OnAssetIdChange()
    {
        if(!assetid.id) return;
        if(!assetid.index) assetid.index = 1;
        if($AssetCache[assetid.id])
            assetdata = $AssetCache[assetid.id];
        else
        {
            let result = await $axios.get("/assets/asset/"+assetid.id);
            if(result.data)
                $AssetCache[assetid.id] = result.data
            assetdata = result.data;
        }

        if($CollectionCache[assetdata.collectionid])
            collectiondata = $CollectionCache[assetdata.collectionid];
        else
        {
            let result = await $axios.get("/collections/collection/"+assetdata.collectionid);
            if(result.data)
                $CollectionCache[assetdata.collectionid] = result.data;
            collectiondata = result.data;
        }

        let targets = document.getElementsByClassName("replacewithcollection");
        for(let ori of targets)
        {
            new CollectionNamePresenter({target: ori, hydrate: true, props:{collectionid:{id:assetdata.collectionid}}})
        }

        targets = document.getElementsByClassName("replacewithcreator");
        for(let ori of targets)
        {
            new UsernamePresenter({target: ori, hydrate: true, props:{userid:{id:assetdata.creator}}})
        }

        //let offeractivities = await $axios.get("/activities/getactivitiesfromasset", {assetid: assetid.id});

        listdata = (await $axios({url:"/activities/getlistact", params:{assetid: assetid.id, offset:0}})).data;

        //offerdata = (await $axios({url:"/activities/getofferact", params:{assetid: assetid.id, offset:0}})).data;
        getOffers();
        getTokenData();
    }
    onMount(OnAssetIdChange);
</script>
<div class="assetdiv">
    <div class="leftsidediv">
        <div class="imgcontainer">
            <div class="imgdiv">
                <span><img class="ethereum" src="ethereum.ico"/></span>
                <button on:click={OnFavoriteButtonClick}>🤍</button>
            </div>
<!--            TODO : getIPFSURL(assetdata.ipfshash) 로 바꾸기-->
            <img class="assetimg" src={assetdata.assetimg}/>
        </div>
        <!--
        <Collapse buttonname="Properties">
        <div class="propertiesdiv">
            
            {#each assetdata.properties as property}
                <div class="propertydiv">
                    <span class="propertytype">{property.type}</span>
                    <br/>
                    <span class="propertyvalue">{property.value}</span>
                    <br/>
                    <span class="propertypercent">{property.percent}% have this trait</span>
                </div>
            {/each}
            
        </div>
        </Collapse>
    -->
        <Collapse buttonname="Rent Holder Benefit History">
            <table>
                <thead>
                <th>Price</th>
                <!--<th>USD Price</th>
                <th>Expiration</th>-->
                <th>From</th>
                <th>Action</th>
                </thead>
                <tbody>

                {#each listdata as listitem}
                    <tr>
                        <td><img class="ethereum" src="ethereum.ico"/>{listitem.cost}</td>
                        <!--<td>${listitem.cost}</td>-->
                        <!--<td>{listitem.due}</td>-->
                        <td>{listitem.from}</td>
                        <td><button on:click={OnListAcceptButtonClick} value={listitem.tokenindex} cost={listitem.cost}>Accept</button></td>
                    </tr>
                {/each}

                </tbody>
            </table>
        </Collapse>
        <Collapse buttonname="Trade status of other works in this collection">
            <table>
                <thead>
                <th>Price</th>
                <!--<th>USD Price</th>
                <th>Expiration</th>-->
                <th>From</th>
                <th>Action</th>
                </thead>
                <tbody>

                {#each listdata as listitem}
                    <tr>
                        <td><img class="ethereum" src="ethereum.ico"/>{listitem.cost}</td>
                        <!--<td>${listitem.cost}</td>-->
                        <!--<td>{listitem.due}</td>-->
                        <td>{listitem.from}</td>
                        <td><button on:click={OnListAcceptButtonClick} value={listitem.tokenindex} cost={listitem.cost}>Accept</button></td>
                    </tr>
                {/each}

                </tbody>
            </table>
        </Collapse>
<!--        <Collapse buttonname="Offers">-->
<!--            <table>-->
<!--                <thead>-->
<!--                <th>Price</th>-->
<!--                &lt;!&ndash;<th>USD Price</th>-->
<!--                <th>Floor Difference</th>-->
<!--                <th>Expiration</th>&ndash;&gt;-->
<!--                <th>From</th>-->
<!--                <th>Action</th>-->
<!--                </thead>-->
<!--                <tbody>-->

<!--                {#each offerdata as offer}-->
<!--                    <tr>-->
<!--                        <td><img class="ethereum" src="ethereum.ico"/>{offer.cost}</td>-->
<!--                        &lt;!&ndash;<td>${listitem.cost}</td>&ndash;&gt;-->
<!--                        &lt;!&ndash;<td>{offer.floor}% below</td>&ndash;&gt;-->
<!--                        &lt;!&ndash;<td>{offer.due}</td>&ndash;&gt;-->
<!--                        <td>{offer.to}</td>-->
<!--                        <td><button on:click={OnOfferAcceptButtonClick} value={offer.id} to={offer.to}>Accept</button></td>-->
<!--                    </tr>-->
<!--                {/each}-->

<!--                </tbody>-->
<!--            </table>-->
<!--        </Collapse>-->
        <!--<Collapse buttonname="Details"></Collapse>-->
    </div>
    <div>
        <div class="assetinnerdiv">
            <div class="innerhodiv">
                <h6 class="nobold"><a class="replacewithcollection">{assetdata.collection}</a></h6>
                <br/>
                <h3 class="nomargin">{assetdata.name}</h3>
                <br/>
            </div>

            <div class="innerhodiv">
                <h7>Owner</h7>
                <span>  <UsernamePresenter userid={{id:tokendata.ownerid}}></UsernamePresenter></span><!--<span>Favorites:{assetdata.favorites}</span>-->
                <br/>
                <h7>Description</h7>
                <span>{assetdata.description}</span>
                <br/>
                <h7>Code</h7>
                <span>A0056-0044</span>
                <br/>
                <h7>Collection Info</h7>
                <br/>
                <span>A collection of 9,630 Riftwalkers, questing with their Minions to save or dominate the universe.</span>
                <br/>
                <h7>Key Benefits</h7>
                <br/>
                <span>- VIP tickets to the holders' monthly networking party</span>
                <span>- Invitation to a private high-end art transaction information sharing chat room for holders</span>
                <span>- Ticket to participate in Sotheby's auction once a month</span>
                <br/>
                <br/>
            </div>
            <!--<p style="text-align:center;">❤ {assetdata.favorites} favorites</p>-->
            <div class="hodiv">
                <div class="innerhodiv">
                    <h7>Market Price</h7>
                    <br/>
                    <h6 class="nomargin" style="color: #888888"><img class="bigethereum" src="ethereum.ico"/>{assetdata.highestprice}</h6>
                    <br />
                    <span style="color: #888888; font-size: 0.75rem"> * You cannot purchase this work because it is not for sale. This is the average price of the collection of this work.</span>
                    <br/>
                    <br/>
                    <h7>Rental Price</h7>
                    <br/>
                    <h6 class="nomargin"><img class="bigethereum" src="ethereum.ico"/>{assetdata.highestprice} / 3 months</h6>
                    <br/>
                    <span style=" font-size: 0.75rem"> * 3 months rental is standard.</span>
                    <br/> <br/>

                    <!--{#if $SessionData && assetdata.creator == $SessionData.id}-->
                    <button class="makebidbutton" on:click={OnMakeBidButtonClick}>Rent it</button>
                </div>
            </div>
<!--            <br/>-->
<!--            <span>{assetdata.currentstate}</span>-->
<!--            <br/>-->
            <!--
            <Collapse buttonname="Price History">
                <LineGraph data={assetdata.pricehistory}/>
            </Collapse>
            -->
        </div>
    </div>
</div>

<style>
.makebidbutton
{
    height: 3em;
    width: 10em;
}

.imgdiv
{
    display: inline-flex;
    justify-content: space-between;
    margin: 0;
}

.imgdiv > span
{
    margin-left: 0.5em;
    margin-right: 0.5em;
    margin-top:0.3em;
    margin-bottom:0.3em;
}

.assetdiv
{
    display: flex;
    justify-content: space-evenly;
    margin:0;
    margin-top:2em;
    width: 88vw;
    position: relative;
    margin-bottom:10em;
}

.assetdiv > div{
    width: 29em;
}

.assetinnerdiv
{
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    width:35em;
    height:80vh;
}

.hodiv
{
    border: 1px solid #AAAAAA;
    border-radius:0.1rem;
    width: 100%;
    margin: 0;
}

.innerhodiv
{
    margin: 1em;
}

.hodiv h7
{
    margin: 0;
}

.assetimg
{
    width: 100%;
    height: 100%;
}

h1,h2,h3,h5,h6, h4, h7{
    text-align: center;
    display: inline-block;
}

.imgcontainer
{
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    border: 1px solid #AAAAAA;
    border-radius: 0.1rem;
    overflow: hidden;
    height:30em;
    width:100%;
}

.assetownerdiv
{
    display: inline-flex;
    justify-content: space-around;
    margin: 0;    
}

div
{
    margin : 0;
}

button
{
    width: 9em;
    height:2.5em;
    border-radius: 0.1em;
    border: 1px solid rgb(120, 120, 255);
    background-color:rgb(120, 120, 255);
    font-size: large;
}

.descriptiondiv
{
    margin: 0.5em;
}

th
{
    font-weight: normal;
    font-size:medium;
}

.propertiesdiv
{
    display: flex;
    margin:0.5em;
    flex-wrap: wrap;
}

.propertydiv
{
    margin:0.2em;
    background-color: #DDDDFF;
    border: 1px solid #8888FF;
    border-radius: 0.3em;
    text-align:center;
    width:8em;
}

.propertytype
{
    font-size:small;
    color: #6666FF;
    font-weight:bold;
}

.propertyvalue
{
    font-size:smaller;
    font-weight:bold;
}

.propertypercent
{
    font-size:small;
}
</style>