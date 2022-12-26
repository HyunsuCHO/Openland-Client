<script>
    import Sidebar from './Sidebar.svelte'
    import Collapse from './Collapse.svelte'
    import {axios} from './Singleton';
    import UsernamePresenter from './UsernamePresenter.svelte';
    import CollectionNamePresenter from './CollectionNamePresenter.svelte';
    import AssetNamePresenter from './AssetNamePresenter.svelte';
    import AssetImagePresenter from './AssetImagePresenter.svelte'
    import {onMount} from 'svelte'
    let y;
    let index = 0;
    let searchtype = undefined;
    export let activities = []/*[
        {
            type:"Offer",
            item:"TestAsset",
            price: 6.5,
            quantity: 1,
            from: "0x12D25GE84HGA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset2",
            price: 3.2,
            quantity: 1,
            from: "0x64TH5NJ95HUQ",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset3",
            price: 1.7,
            quantity: 1,
            from: "0x5GE2TH5NJ95H",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset4",
            price: 0.8,
            quantity: 1,
            from: "0x5GETH5EH5NJA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset5",
            price: 2.9,
            quantity: 1,
            from: "0xGETH5G95HHGA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset6",
            price: 14.0,
            quantity: 1,
            from: "0x1212D2E85G95",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset",
            price: 6.2,
            quantity: 1,
            from: "0x15G95G212DGA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset",
            price: 6.5,
            quantity: 1,
            from: "0x12D25GE84HGA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset",
            price: 6.5,
            quantity: 1,
            from: "0x12D25GE84HGA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset",
            price: 6.5,
            quantity: 1,
            from: "0x12D25GE84HGA",
            to:"---",
            time:"1 minutes"
        },
        {
            type:"Offer",
            item:"TestAsset",
            price: 6.5,
            quantity: 1,
            from: "0x12D25GE84HGA",
            to:"---",
            time:"1 minutes"
        },
    ];*/

    let addresscache = {}

    let tbodytarget;
    async function LoadDatas()
    {
        let params = {offset:index};
        if(searchtype)
        {
            params.type = searchtype;
        }
        let result = (await $axios.get("/activities/getactivities", {params})).data;
        for(var i in result)
        {
            if(!addresscache[result[i].from]){
                let aresult = await $axios.get('/metamasks/metamask/'+result[i].from);
                if(aresult.data)
                    addresscache[result[i].from] = aresult.data.userid;
            }
            result[i].from = addresscache[result[i].from];

            if(!addresscache[result[i].to]){
                let aresult = await $axios.get('/metamasks/metamask/'+result[i].to);
                if(aresult.data)
                    addresscache[result[i].to] = aresult.data.userid;
            }
            result[i].to = addresscache[result[i].to];
        }
        activities = [...activities, ...result];
        //activities.push(...result);

        /*
        for(var ac of activities)
        {
            let tr = document.createElement("tr");
            tbodytarget.appendChild(tr);

            let type = document.createElement("td");
            type.innerText = ActivityType(ac.type);
            tr.appendChild(type);

            let item = document.createElement("td");
            tr.appendChild(item);
            item.className="activityitem"

            let imgdiv = document.createElement("div");
            imgdiv.className="itemimg";
            item.appendChild(imgdiv);

            //let img = document.createElement("img");
            //item.appendChild(img);
            new AssetImagePresenter({target: imgdiv, hydrate: true, props:{assetid:{id: ac.assetid}}});

            let assetname = document.createElement("div");
            item.appendChild(assetname);
            new AssetNamePresenter({target: assetname, hydrate: true, props:{assetid:{id: ac.assetid}}});

            let ether = document.createElement("td");
            ether.innerHTML = "<img class=\"ethereum\" src=\"ethereum.ico\"/>"+ac.cost;
            tr.appendChild(ether);

            let quantity = document.createElement("td");
            quantity.innerText = 1;
            tr.appendChild(quantity);

            let from = document.createElement("td");
            if(!addresscache[ac.from]){
                result = await $axios.get('/metamasks/metamask/'+ac.from);
                if(result.data)
                    addresscache[ac.from] = result.data;
            }
            let temp = document.createElement("span");
            from.appendChild(temp);
            if(addresscache[ac.from])
                new UsernamePresenter({target: temp, hydrate: true, props:{userid:{id: addresscache[ac.from].userid}}});
            else
                from.innerHTML = ac.from;
            tr.appendChild(from);

            let to = document.createElement("td");
            if(!addresscache[ac.to])
            {
                result = await $axios.get('/metamasks/metamask/'+ac.to);
                if(result.data)
                    addresscache[ac.to] = result.data;
            }
            temp = document.createElement("span");
            to.appendChild(temp);
            if(addresscache[ac.to])
                new UsernamePresenter({target:temp, hydrate: true, props:{userid:{id: addresscache[ac.to].userid}}});
            else
              to.innerHTML = ac.to;
            tr.appendChild(to);

            let timestamp = document.createElement("td");
            timestamp.innerHTML = ac.timestamp;
            tr.appendChild(timestamp);
        }*/
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
    //onMount(LoadDatas);

    function OnSearchTypeButtonClick()
    {
        if(searchtype == this.value)
        {
            searchtype = undefined;
        }
        else
        {
            searchtype = this.value;
        }
        index = 0;
        activities = [];
    }

    
    $: if(index == 0 || y/(window.screen.height * index) > 0.95)
    {
        LoadDatas();
        ++index;
    }
    
</script>
<svelte:window bind:scrollY={y}/>
<div class="activitydiv">
    <Sidebar>
        <Collapse buttonname="EventType">
            <div class="eventtypediv">
                <button value=0 on:click={OnSearchTypeButtonClick}>Mints</button><br/>
                <button value=1 on:click={OnSearchTypeButtonClick}>Listings</button><br/>
                <button value=3 on:click={OnSearchTypeButtonClick}>Sales</button><br/>
                <button value=2 on:click={OnSearchTypeButtonClick}>Offers</button><br/>
                <button value=4 on:click={OnSearchTypeButtonClick}>Transfers</button>
            </div>
        </Collapse>
        <!--<Collapse buttonname="Collections"></Collapse>
        <Collapse buttonname="Chains">
            <div class="chainsdiv">
                <button><img class="ethereum" src="ethereum.ico"/>Ethereum</button>
            </div>
        </Collapse>-->
    </Sidebar>
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
                    <tbody bind:this={tbodytarget}>
                        
                        {#each activities as asset}
                            {#if asset.id}
                                <tr class="tr">
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
                                    <td><UsernamePresenter userid={{id:asset.from}}/></td>
                                    <td><UsernamePresenter userid={{id:asset.to}}/></td>
                                    <td>{asset.timestamp}</td>
                                </tr>
                            {/if}
                        {/each}
                        
                    </tbody>
                </table>
</div>

<style>
.eventtypediv,.chainsdiv
{
    display: block;
}
.activitydiv
{
    display:flex;
}

.activitiyitem
{
    display: flex;
    align-items: center;
}

.itemimg
{
    width:3em;
    height:3em;
    border-radius:1em;
    display: flex;
    align-items: center;
}

td
{
    height: 2em;
}
</style>
