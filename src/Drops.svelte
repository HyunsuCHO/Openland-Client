<script>
    import DropsCard from "./DropsCard.svelte";

    export let currentcategory = "Trending";
    import {axios} from "./Singleton"
    import CollectionCard from './CollectionCard.svelte'
    import {onMount} from 'svelte'
    import {getIPFSURL} from "./Util";
    import CollectionNamePresenter from "./CollectionNamePresenter.svelte";
    import Asset from "./RentAsset.svelte";
    let index = 0, y;
    let data = 'present'; // 'past' 또는 'present'
    let presentDrops = [
        {
            id : 1,
            thumbnail:"https://picsum.photos/501",
        profileimg:"https://picsum.photos/200",
        title:"TestFunding1",
        author:{name:"TestCreator1"},
            creator : "Test1",
        price : "0.095ETH"
    },
    {
        id : 2,
        thumbnail:"https://picsum.photos/502",
        profileimg:"https://picsum.photos/201",
        title:"TestFunding2",
        author:{name:"TestCreator2"},
        price : "0.086ETH"
    },
    {
        id : 3,
        thumbnail:"https://picsum.photos/503",
        profileimg:"https://picsum.photos/202",
        title:"TestFunding3",
        author:{name:"TestCreator3"},
        price : "0.125ETH"
    },
    {
        id : 4,
        thumbnail:"https://picsum.photos/504",
        profileimg:"https://picsum.photos/203",
        title:"TestFunding4",
        author:{name:"TestCreator4"},
        price : "0.123ETH"
    },
];
    let pastDrops = [  {
        id : 5,
        img:"https://picsum.photos/506",
        profileimg:"https://picsum.photos/204",
        title:"TestPastFunding5",
        author:{name:"TestCreator5"},
        price : "0.4564ETH"
    },
        {
            id : 6,
            thumbnail:"https://picsum.photos/506",
            profileimg:"https://picsum.photos/205",
            title:"TestPastFunding6",
            author:{name:"TestCreator6"},
            price : "0.095ETH"
        },
        {
            id : 7,
            thumbnail:"https://picsum.photos/507",
            profileimg:"https://picsum.photos/206",
            title:"TestPastFunding7",
            author:{name:"TestCreator7"},
            price : "0.34TH"
        },
        {
            id : 8,
            thumbnail:"https://picsum.photos/508",
            profileimg:"https://picsum.photos/207",
            title:"TestFunding8",
            author:{name:"TestCreator8"},
            price : "0.765ETH"
        }]
    let representingartdata = {asset:{}, token:{}}; //= {icon: "https://picsum.photos/100",src:"https://picsum.photos/500", title:"TestAsset1", description:"placeholder",author:{name:"TestAccount1"}};
    const genres = ['Trending', 'Top','Cartoon','Modern','Classic'];
    function OnSelectCategory()
    {
        currentcategory = this.value;
    }

    async function getData()
    {
        let params = {offset:index}

        let result = await $axios.get("/collections/getrandom/20",{params});
        presentDrops = [...presentDrops,...result.data];
    }

    function toggleDrops() {
        data = (data === 'past' ? 'present' : 'past');
    }
    const crumbs=[{ title: 'now', href: '/' }, { title: 'past' }]

    // ---

    $: displayedDrops = data === 'past' ? pastDrops : presentDrops;

    // TODO : 원래 아래 부분 있어야함
    // onMount(getData);
    //
    // $: if(index == 0 || y / (window.screen.height * index) > 1)
    // {
    //     getData();
    //     index++;
    // }

</script>
<svelte:window bind:scrollY={y}/>
<div class="explorediv">
    <h2>Drops</h2>
    <br/>

    <nav aria-label="breadcrumb">
        <ol>
            {#each crumbs as crumb, index}
                <li>
                    <!--{data}-->
                    <!--{JSON.stringify(displayedDrops[0])}-->
                    {#if index < crumbs.length }
                        <a on:click={toggleDrops}>{crumb.title}</a>
                    {:else}
                        {crumb.title}
                    {/if}
                </li>
            {/each}
        </ol>
    </nav>
    <!--
    <div class="genrebardiv">
    {#each genres as genre,i}
        <button class="genrebutton" id="{genre == currentcategory ? "genreselected" : ""}" value="{genre}" on:click={OnSelectCategory}>{genre}</button>
    {/each}
    </div>-->
    <div class="collectionsdiv">

    {#each displayedDrops as cdata (cdata.id)}
        <DropsCard  _dropsdata ={cdata}></DropsCard>
    {/each}
    </div>
</div>

<style>
.collectionsdiv
{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.collectiondiv
{
    display: inline-block;
    height: 20em;
    width: 23em;
    border: 1px solid #EEEEEE;
    border-radius: 1em;
    margin: 1em;
    overflow: hidden;
}

.collectionimg
{
  display: block;
  width: 23em;
  height: 50%;
}

.collectionauthorimg
{
    display: inline;
    width: 3em;
    height: 3em;
    text-align: center;
    position: relative;
    top: -2.9em;
    margin:0;
    border-radius:2em;
    border: 2px solid white;
}

.explorediv
{
    width: 95vw;
    text-align:center;
    position: relative;
    left:2.5vw;
}

.collectiondescriptiondiv
{
    position: relative;
    top: -3.1em;
}

#genreselected
{
    border-bottom: 3px solid rgb(1, 119, 255);
}

.genrebutton
{
    margin: 0;
    padding: 0.7em;
    font-weight: bold;
    background-color: white;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    color: #111111;
    font-size: large;
}

.genrebutton:hover
{
    background-color: white;
    color: #111111;
}

.genrebutton:focus
{
    background-color: white;
    color: #111111;
}

.genrebardiv
{
    display: flex;
    justify-content: space-evenly;
}
.decriptionauthor
{
    margin-top:0.5em;
    margin-bottom:2em;
}

nav[aria-label="breadcrumb"] ol {
    list-style: none;
    padding: 0;
}

nav[aria-label="breadcrumb"] li {
    display: inline;
    margin-right: 5px;
}

nav[aria-label="breadcrumb"] li::after {
    content: '| ';
    margin-left: 5px;
}

nav[aria-label="breadcrumb"] li:last-child::after {
    content: '';
}

</style>