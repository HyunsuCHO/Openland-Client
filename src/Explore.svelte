<script>
    export let currentcategory = "Trending";
    import {axios} from "./Singleton"
    import CollectionCard from './CollectionCard.svelte'
    import {onMount} from 'svelte'
    let index = 0, y;
    let datas = [{

        img:"https://picsum.photos/501",
        thumbnail:"https://picsum.photos/200",
        title:"TestCollection1",
        author:{name:"TestUser1"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/502",
        thumbnail:"https://picsum.photos/201",
        title:"TestCollection2",
        author:{name:"TestUser2"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/503",
        thumbnail:"https://picsum.photos/202",
        title:"TestCollection3",
        author:{name:"TestUser3"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/504",
        thumbnail:"https://picsum.photos/203",
        title:"TestCollection4",
        author:{name:"TestUser4"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/505",
        thumbnail:"https://picsum.photos/204",
        title:"TestCollection5",
        author:{name:"TestUser5"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/506",
        thumbnail:"https://picsum.photos/205",
        title:"TestCollection6",
        author:{name:"TestUser6"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/507",
        thumbnail:"https://picsum.photos/206",
        title:"TestCollection7",
        author:{name:"TestUser7"},
        description:"This is TestCollection"
    },
    {
        img:"https://picsum.photos/508",
        thumbnail:"https://picsum.photos/207",
        title:"TestCollection8",
        author:{name:"TestUser8"},
        description:"This is TestCollection"
    }
];
    const genres = ['Trending', 'Top','Cartoon','Modern','Classic']

    function OnSelectCategory()
    {
        currentcategory = this.value;
    }

    async function getData()
    {
        let params = {offset:index}
        
        let result = await $axios.get("/collections/getrandom/20",{params});
        datas = [...datas,...result.data];
    }

    onMount(getData);

    $: if(index == 0 || y / (window.screen.height * index) > 1)
    {
        getData();
        index++;
    }
</script>
<svelte:window bind:scrollY={y}/>
<div class="explorediv">
    <h2>Explore Collections</h2>
    <!--
    <div class="genrebardiv">
    {#each genres as genre,i}
        <button class="genrebutton" id="{genre == currentcategory ? "genreselected" : ""}" value="{genre}" on:click={OnSelectCategory}>{genre}</button>
    {/each}
    </div>-->
    <div class="collectionsdiv">
    {#each datas as data}
        <!--
            <div class="collectiondiv">
                <img class="collectionimg" src={data.img}/>
                <img class="collectionauthorimg" src={data.thumbnail}>
                <div class="collectiondescriptiondiv">
                    <h6 class="nomargin">{data.title}</h6>
                    <h7 class="decriptionauthor">by <a>{data.author.name}</a></h7>
                    <p>{data.description}</p>
                </div>
            </div>
        -->
        <CollectionCard _collectiondata={data}></CollectionCard>
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
</style>