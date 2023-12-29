<script>
    import Collapse from "./Collapse.svelte";
    import LineGraph from "./LineGraph.svelte";
    import {axios, modalslot, modalprop, modaltoggle} from "./Singleton";
    import {getIPFSURL, getFileURL} from './Util';
    import CollectionNamePresenter from "./CollectionNamePresenter.svelte";
    import UsernamePresenter from "./UsernamePresenter.svelte";
    import {onMount} from 'svelte';
    import {
        SessionData,
        MetamaskAccounts,
        consentToSponsor,
        mintNFTEach,
        withdrawFundRaised,
        consentToEarlyBirdSponsor
    } from './Session'
    import Profile from "./Profile.svelte";
    import BidMenu from "./BidMenu.svelte";
    import TokenSelector from "./TokenSelector.svelte";
    import {AssetCache, CollectionCache} from "./Cache"
    import {web3, getContract} from "./Singleton"
    import {marketaddress} from "./Setting.js"
    import ArtCard from "./ArtCard.svelte";
    import AssetNamePresenter from "./AssetNamePresenter.svelte";
    import Sidebar from "./Sidebar.svelte";
    import AssetImagePresenter from "./AssetImagePresenter.svelte";
    import {getFundingInfo} from "./Session";
    export let assetid={id:1, index:1};

    var page = 'Overview';
    let usernamespan, listdata=[], offerdata=[], collectiondata={};
    let progressValue = 50;
    var consentNum = 1;
    // Add dependencies

    let assets = [
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 1",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 1.",
            "displayfooter": true,
            "artid": 1,
            "ipfshash": "https://picsum.photos/920",
            "favorites": 20
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 2",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 2.",
            "displayfooter": true,
            "artid": 2,
            "ipfshash": "https://picsum.photos/797",
            "favorites": 51
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 3",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 3.",
            "displayfooter": true,
            "artid": 3,
            "ipfshash": "https://picsum.photos/910",
            "favorites": 36
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 4",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 4.",
            "displayfooter": true,
            "artid": 4,
            "ipfshash": "https://picsum.photos/501",
            "favorites": 8
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 5",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 5.",
            "displayfooter": true,
            "artid": 5,
            "ipfshash": "https://picsum.photos/269",
            "favorites": 28
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 6",
            "creator": "SWEAT",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 6.",
            "displayfooter": true,
            "artid": 6,
            "ipfshash": "https://picsum.photos/429",
            "favorites": 30
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 7",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 7.",
            "displayfooter": true,
            "artid": 7,
            "ipfshash": "https://picsum.photos/728",
            "favorites": 45
        },
        {
            "collectionid": 1,
            "name": "Kiwi Flex Artwork 8",
            "creator": "FLOX",
            "description": "This is a captivating piece of art related to Kiwi Flex, showcasing unique aesthetics and creative expression 8.",
            "displayfooter": true,
            "artid": 8,
            "ipfshash": "https://picsum.photos/526",
            "favorites": 47
        }
    ]

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

    let activitydata= [

            {
                "name": "Alice.eth",
                "img": "https://picsum.photos/322",
                "type": 4,
                "assetid": 1,
                "tokenindex": 1,
                "cost": 1.0,
                "from": "0xFromAddress001",
                "to": "0xToAddress001",
                "timestamp": "2023-09-01T12:00:00"
            },
            {
                "name": "Bob.eth",
                "img": "https://picsum.photos/939",
                "type": 0,
                "assetid": 2,
                "tokenindex": 2,
                "cost": 7.08,
                "from": "0xFromAddress002",
                "to": "0xToAddress002",
                "timestamp": "2023-09-02T12:00:00"
            },
            {
                "name": "Charlie.eth",
                "img": "https://picsum.photos/21",
                "type": 3,
                "assetid": 3,
                "tokenindex": 3,
                "cost": 3.57,
                "from": "0xFromAddress003",
                "to": "0xToAddress003",
                "timestamp": "2023-09-03T12:00:00"
            },
            {
                "name": "David.eth",
                "img": "https://picsum.photos/534",
                "type": 1,
                "assetid": 4,
                "tokenindex": 4,
                "cost": 3.14,
                "from": "0xFromAddress004",
                "to": "0xToAddress004",
                "timestamp": "2023-09-04T12:00:00"
            },
            {
                "name": "Emma.eth",
                "img": "https://picsum.photos/604",
                "type": 2,
                "assetid": 5,
                "tokenindex": 5,
                "cost": 8.97,
                "from": "0xFromAddress005",
                "to": "0xToAddress005",
                "timestamp": "2023-09-05T12:00:00"
            },
            {
                "name": "Frank.eth",
                "img": "https://picsum.photos/79",
                "type": 2,
                "assetid": 6,
                "tokenindex": 6,
                "cost": 7.02,
                "from": "0xFromAddress006",
                "to": "0xToAddress006",
                "timestamp": "2023-09-06T12:00:00"
            },
            {
                "name": "Grace.eth",
                "img": "https://picsum.photos/895",
                "type": 3,
                "assetid": 7,
                "tokenindex": 7,
                "cost": 1.59,
                "from": "0xFromAddress007",
                "to": "0xToAddress007",
                "timestamp": "2023-09-07T12:00:00"
            },
            {
                "name": "Hannah.eth",
                "img": "https://picsum.photos/804",
                "type": 3,
                "assetid": 8,
                "tokenindex": 8,
                "cost": 9.71,
                "from": "0xFromAddress008",
                "to": "0xToAddress008",
                "timestamp": "2023-09-08T12:00:00"
            }
        ]



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

    // requiredConsents: mintingInfo[0],
    // maxMintsPerAddress: mintingInfo[1],
    // mintPrice: web3.utils.fromWei(mintingInfo[2], 'ether'),
    // earlyBirdMintPrice: web3.utils.fromWei(mintingInfo[3], 'ether'),
    // mintingDeadline: new Date(mintingInfo[4] * 1000).toLocaleString(),
    // consentDeadline: new Date(mintingInfo[5] * 1000).toLocaleString(),
    // earlyBirdConsentStartTime: new Date(mintingInfo[6] * 1000).toLocaleString(),
    // earlyBirdConsentEndTime: new Date(mintingInfo[7] * 1000).toLocaleString(),
    // totalConsents: mintingInfo[8],
    // mintAtOnce: mintingInfo[9],
    // mintEach: mintingInfo[10]

    var consentPercent = 1;
    let fundingInfo, curPrice;
    let fundStatus = 'Not Open';
    // let mintingDeadline, consentDeadline,
    //     earlyBirdConsentStartTime, earlyBirdConsentEndTime, consentPrice, earlyBirdConsentPrice;

    async function getAllFundingInfo(){
        fundingInfo = await getFundingInfo();
        consentPercent = (fundingInfo.totalConsents / fundingInfo.requiredConsents) * 10;

        curPrice = determineCurrentPrice(fundingInfo.earlyBirdConsentStartTime, fundingInfo.earlyBirdConsentEndTime,
            fundingInfo.consentDeadline, fundingInfo.mintingStartTime);
        if(curPrice === -1){
            curPrice = fundingInfo.consentPrice;
        }


    }

    function determineCurrentPrice(earlyBirdConsentStartTime, earlyBirdConsentEndTime, consentDeadline, mintingStartTime) {
        const now = new Date(); // 현재 시간

        // early bird 기간이면 earlyBirdConsentPrice 반환
        if (now >= earlyBirdConsentStartTime && now <= earlyBirdConsentEndTime) {
            fundStatus = 'Allowlist Stage'
            return fundingInfo.earlyBirdConsentPrice;
        }
        // consent 기간이후이고 minting 기간 전이면 consentPrice 반환
        else if (now > earlyBirdConsentEndTime && now <= consentDeadline) {
            fundStatus = 'Public Stage'
            return fundingInfo.consentPrice;
        }
        // consent 기간이후이고 minting 기간 전이면 consentPrice 반환
        else if ( now > consentDeadline && now < mintingStartTime) {
            fundStatus = 'Fund Ended & Minting in Preparation'
            return -1;
        }
        else{
            fundStatus = 'Minting Stage'
            return 0;
        }
        // 위 조건에 맞지 않으면 null 반환 (혹은 기본 가격 또는 에러 메시지를 반환할 수 있음)
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

    const crumbs=[{ title: 'Overview', href: '/' }, { title: 'Items' },{ title: 'Offers' },{ title: 'Activity' }]
    function toggleDrops(index) {
        page = crumbs[index].title;
    }

    function increaseRentDuration() {
        consentNum += 1;
    }

    // 렌트 기간을 감소시키는 함수
    function decreaseRentDuration() {
        if (consentNum > 1) {
            consentNum -= 1;
        }
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
    // ---

    $: isEarlyBirdPeriod = fundStatus === 'Allowlist Stage';
    $: isPublicStage = fundStatus === 'Public Stage';
    $: isMintingStage = fundStatus === 'Minting Stage';

    getAllFundingInfo();
    onMount(OnAssetIdChange);





</script>

<div class="section-cover" style="background-image: url({assetdata.assetimg});">
<!--    <img style="width: 100%;" alt=""/>-->
    <div class="cover-title">
        <img class="cover-title-image" src={"https://picsum.photos/922"}/>
        <h6 style="margin-top: 0">Kiwi Flex by FLOX x SWEAT</h6>
    </div>

</div>
<div style="margin-left: 5rem;">
    <h7 style="text-align: left">
        The AEYER Collection is a modern odyssey into the art and allure of vision
        <br/>
        Items 313 · Created Aug 2023 · Creator earnings 5% · Chain Ethereum
    </h7>
    <nav aria-label="breadcrumb">
        <ol>
            {#each crumbs as crumb, index}
                {#if crumb.title === page }
                    <li><a class='clumb-clicked' on:click={() => page = crumbs[index].title}>{crumb.title}</a></li>
                {:else}
                    <li><a on:click={() => page = crumbs[index].title}>{crumb.title}</a></li>
                {/if}
            {/each}
        </ol>
    </nav>
</div>
{#if page === 'Overview' }
<div class="section_mint">
<div class="assetdiv" style="height:fit-content">
    <div class="assetinnerdiv" >
        <div class="leftsidediv">
            <div class="imgcontainer">
                <img class="assetimg" src={assetdata.assetimg}/>
            </div>
            <div class="imglayout">
                <img class="assetimg" src={"https://picsum.photos/920"}/>
                <img class="assetimg" src={"https://picsum.photos/921"}/>
                <img class="assetimg" src={"https://picsum.photos/922"}/>
            </div>
        </div>
    </div>
    <div>
        <div class="assetinnerdiv" >
            <h7 style="text-align: left; margin-top: 0">{consentPercent}%  funded</h7>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: {consentPercent}%;">
                </div>
            </div>

            <br/>
            <div class="hodiv">
                <div class="innerhodiv">
                    <h7>{fundStatus}</h7>
                    <br/>
                    <h6 class="nomargin">{curPrice} eth</h6>
                    <br/>
                    <span style=" font-size: 0.75rem"> * 펀딩 스케쥴에 따라 가격이 바귈 수 있습니다. </span>
                    <br/> <br/>

                    <!--{#if $SessionData && assetdata.creator == $SessionData.id}-->
                    <div style="display: flex; margin-bottom : 4px">
                        {#if isEarlyBirdPeriod}
                            <button class="makebidbutton" on:click={() => consentToEarlyBirdSponsor(consentNum)}>Early Bird Fund</button>
                            <div class="rent-duration-selector">
                                <button class="numManButton" on:click={decreaseRentDuration}>-</button>
                                <input type="number" class="quantity-input" min="1" bind:value={consentNum} />
                                <button class="numManButton" on:click={increaseRentDuration}>+</button>
                            </div>
                        {:else if isPublicStage}
                            <button class="makebidbutton" on:click={() => consentToSponsor(consentNum)}>Fund</button>
                            <div class="rent-duration-selector">
                                <button class="numManButton" on:click={decreaseRentDuration}>-</button>
                                <input type="number" class="quantity-input" min="1" bind:value={consentNum} />
                                <button class="numManButton" on:click={increaseRentDuration}>+</button>
                            </div>
                            <button class="makebidbutton" on:click={() => (consentNum)}>Fund</button>
                        {:else if isMintingStage}
                            {#if consentPercent < 100}
                                <button class="makebidbutton" on:click={() => withdrawFundRaised}>Withdraw</button>
                            {:else}
                                <button class="makebidbutton" on:click={() => mintNFTEach}>Mint</button>
                            {/if}
                        {/if}
                    </div>
                </div>
            </div>
            <div class="innerhodiv" style="margin-left: 0">
                <h6 style="margin-top: 2rem">Mint schedule</h6>
                <br/>
                <h7 style="margin-top: 1rem;line-height: 2.5rem; white-space: pre-line; text-align: left">
                    Allowlist Stage
                    <span style="color: #666666;">{(fundingInfo?.earlyBirdConsentStartTime).toLocaleString()} - {(fundingInfo?.earlyBirdConsentEndTime).toLocaleString()}</span>
                    <br/>
                    <span style="font-weight: 300; color: #CCCCCC;">{fundingInfo?.earlyBirdConsentPrice} ETH</span></h7>
                <br/>
                <h7 style="margin-top: 1rem;line-height: 2.5rem; white-space: pre-line; text-align: left">
                    Public Stage
                    <span style=" color: #666666;">{(fundingInfo?.earlyBirdConsentEndTime).toLocaleString()} - {(fundingInfo?.consentDeadline).toLocaleString()}</span>
                    <br/>
                    <span style="font-weight: 300; color: #CCCCCC;">{fundingInfo?.consentPrice} ETH</span></h7>
                <br/>
                <h7 style="margin-top: 1rem;line-height: 2.5rem; white-space: pre-line; text-align: left">
                    Minting Stage
                    <span style=" color: #666666;">{(fundingInfo?.mintingStartTime).toLocaleString()}</span>
                </h7>
            </div>

        </div>
    </div>
</div>
</div>
<div style="display: flex; flex-direction: column">
    <div style="width: 100vw; height: 40vh; overflow: hidden;">
        <img style="width: 100%" src={"https://picsum.photos/921"}/>
    </div>
    <div class="section_description" style="flex-wrap: wrap; justify-content: space-between;">
        <div class="column is-2 description" style="padding-bottom: 15px">
            <h5>Description</h5>
            <br/>
            <span class = "n6">"Kiwi Flex" marks the first digital collaboration between FLOX and SWEATS, two of New Zealand’s most celebrated international artists. As an artistic duo, they've embarked on a global journey, merging their distinct styles through site-specific murals that creatively reflect the local flora, fauna, and cultures they encounter around the world. Now, for the first time ever, they venture into web3. With “Kiwi Flex,” FLOX and SWEATS fuse their artistic voices into a harmonious collection steeped in street art and inspired by the rich tapestry of life on Earth, bringing the very best of New Zealand’s dynamic artistic landscape to OpenSea.</span>
        </div>
        <div class = "column is-2 ">
        <iframe style="min-width: 550px; min-height:30vh; text-align: right" src="https://www.youtube.com/embed/hGrIgIfCxP0?si=gRNRR_fAprjEbTfZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        </div>
</div>
<div style="width: 100vw; height: 50vh; overflow: hidden;">
    <img style="width: 100%" src={"https://picsum.photos/924"}/>
</div>

<div style="text-align: center; justify-content: center;" class="section_description">
    <div class="description" style="padding-bottom: 15px">
        <h5>Description</h5>
        <br/>
        <span class = "n6">"Kiwi Flex" marks the first digital collaboration between FLOX and SWEATS, two of New Zealand’s most celebrated international artists. As an artistic duo, they've embarked on a global journey, merging their distinct styles through site-specific murals that creatively reflect the local flora, fauna, and cultures they encounter around the world. Now, for the first time ever, they venture into web3. With “Kiwi Flex,” FLOX and SWEATS fuse their artistic voices into a harmonious collection steeped in street art and inspired by the rich tapestry of life on Earth, bringing the very best of New Zealand’s dynamic artistic landscape to OpenSea.</span>
    </div>
</div>
<div style="width: 100vw; height: 40vh; overflow: hidden;">
    <img style="width: 100%" src={assetdata.assetimg}/>
</div>
<div style="text-align: left; justify-content: left;" class="section_description">
    <div class="column is-2 description" style="padding-bottom: 15px">
        <h5>FAQ</h5>
    </div>
    <div class="column is-2" style="gap: 25px;    display: flex;
    flex-direction: column;">
        <div style="box-shadow: 0 0 8px 5px #eeeeee; border-radius :0.7rem; padding: 15px 20px ">
            <h7 style ="vertical-align: top;margin-top: 0">Where's the hotspot for all the answers?</h7>
            <br/>
            <span style="font-size: 0.75rem; white-space : pre-line; display: block"> Dive into our Discord!
                Drop those burning questions and join our vibrant crew.
                Catch you on the inside! 🚀🎨🤖.
        </span>
        </div>
        <div style="box-shadow: 0 0 8px 5px #eeeeee; border-radius :0.7rem; padding: 15px 20px ">
            <h7 style ="vertical-align: top;margin-top: 0">Where's the hotspot for all the answers?</h7>
            <br/>
            <span style="font-size: 0.75rem; white-space : pre-line; display: block"> Dive into our Discord!
                Drop those burning questions and join our vibrant crew.
                Catch you on the inside! 🚀🎨🤖.
        </span>
        </div>
        <div style="box-shadow: 0 0 8px 5px #eeeeee; border-radius :0.7rem; padding: 15px 20px ">
            <h7 style ="vertical-align: top;margin-top: 0">Where's the hotspot for all the answers?</h7>
            <br/>
            <span style="font-size: 0.75rem; white-space : pre-line; display: block"> Dive into our Discord!
                Drop those burning questions and join our vibrant crew.
                Catch you on the inside! 🚀🎨🤖.
        </span>
        </div>
    </div>
</div>

{:else if page === 'Items'}
    <div class="section_content">
    {#each assets as asset}
        <ArtCard artdata={asset}></ArtCard>
    {/each}
    </div>

{:else if page === 'Offers'}
    <div class="section_content">
    <table>
        <thead>
        <th style="width: 70%">Offer price</th>
        <th style="width: 15rem;">Total volume</th>
        <th style="width: 15rem">Total offers</th>
        <th style="width: 15rem">Bidders</th>
        </thead>
        <tbody>
            <tr>
                <td><div style="border-radius: 1rem;margin: 1rem 0;padding: 0 1rem;background-color: #DDDDFF"> 0.002 ETH</div></td>
                <td> 0.0025 ETH</td>
                <td> 1</td>
                <td><img class="ethereum" src="ethereum.ico"/> 1</td>
            </tr>
        </tbody>
    </table>
    </div>

{:else if page === 'Activity'}
    <div class="section_content">
    <div class="itemsdiv">

        <div>
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

            <div class="assetcards">
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
                                <tr>
                                    <td>{ActivityType(asset.type)}</td>
                                    <td class="activitiyitem">
                                        <div class="itemimg">
                                            <img style="height: 20px;width: 20px" src={asset.img}/>
                                        </div>
                                        <div>
                                            <!--<CollectionNamePresenter collectionid={{id:asset.collectionid}}></CollectionNamePresenter>
                                            <br>-->
                                            {asset.name}</div>
                                    </td>
                                    <td><img class="ethereum" src="ethereum.ico"/>{(asset.cost*(0.2)).toFixed(2)}eth</td>
                                    <!--<td>1</td>-->
                                    <td>{asset.from}</td>
                                    <td>{asset.to}</td>
                                    <td>{asset.timestamp}</td>
                                </tr>
                        {/each}

                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</div>
{/if}




<style>

.numManButton {
    background-color: rgb(120, 120, 255);
    border: none;
    color: white;
    padding: 10px;
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    outline: none;
}

.numManButton:active {
    background-color: #8888AA;
}

.quantity-input {
    text-align: center;
    margin: 0 10px;
    width: 50px;
    border: 0;
    border-radius: 4px;
    padding: 5px;
}
.makebidbutton
{
    height: 3em;
    width: 10em;
}

.section_description {
    display: flex;
    margin: 7rem 5rem;
    min-height: 10vh;
}

.n6 {
    font-size: 0.75em;
    line-height: 1.1;
}

.section_mint{
    /*width: 88em;*/
    margin-left: 5rem;
}

.description {
    max-width: 550px;
    min-width: 380px;
}

.column.is-2.description{
    max-width: 550px;
    min-width: 380px;
}

.column.is-2  {
    width: 50%;
    height: inherit;
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
    /*justify-content: space-evenly;*/
    gap: 10rem;
    position: relative;
    width: inherit;
    margin: 2em 0 10em;
}

.assetdiv > div{
    width: 29em;
}

.assetinnerdiv
{
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    width:100%;
    height:80vh;
}

.hodiv
{
    box-shadow: 0 0 8px 5px #eeeeee;
    border-radius :0.7rem;
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

.imglayout{
    margin-top: 8px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.assetimg
{
    width: 100%;
    height: 100%;
    margin-bottom: initial;
}

h1,h2,h3,h5,h6, h4, h7{
    text-align: center;
    display: inline-block;
}

h5{
    margin-top: 0;
}

.imgcontainer
{
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    /*border: 1px solid #AAAAAA;*/
    border-radius: 0.1rem;
    overflow: hidden;
    height:fit-content;
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

.progress-bar-container {
    width: 100%;
    background-color: #dddddd;
    border-radius: 5rem;
}

.progress-bar {
    height: 20px;
    background-image: linear-gradient(90deg,#8888FF,rgb(120, 120, 255));
    width: 0%;
    border-radius: 5rem;
    text-align: center;
    color: white;
    transition: width 0.5s ease;
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

.assetinnerdiv{
    height: fit-content;
}

nav[aria-label="breadcrumb"] ol {
    list-style: none;
    padding: 0;
    display : flex;
}

nav[aria-label="breadcrumb"] li {
    margin-right: 50px;
    font-weight: 600;
    font-size: 0.75em;
    /*min-width: 100px;*/
}

nav[aria-label="breadcrumb"] li::after {
    /*content: '| ';*/
    /*margin-left: 30px;*/
}

nav[aria-label="breadcrumb"] li:last-child::after {
    content: '';
}

.clumb-clicked{
    background-color: #f1f1f1;
    color : #1c1010!important;
    padding : 1rem 2rem;
    border-radius: 0.4rem;
}

.section_content{
    margin: 0 5rem;
}
.section-cover{
    position: relative;
    width: 100vw;
    height: 35vh;
    overflow: hidden;
    background-size: cover;
}

.cover-title{
    margin-left: 5rem;
    color: white;
    margin-bottom: 15px;
    bottom: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.cover-title-image{
    width: 75px;
    height: 75px;
    align-content: center;
    margin-bottom: 0;
}

img {
    border-radius :0.7rem;
}

a {
    color: #555555;
}
</style>