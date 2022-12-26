<script>
    //TODO: 카테고리별 정렬
    export let rankingdata = [
        {
            collection: "TestCollection",
            collectionicon: "https://picsum.photos/200",
            volume: 887.2,
            _24h:"+40.23",
            _7d:"+10.87",
            floorprice:4.2,
            owners:"30.8K",
            items:"102.9K"
        },
        {
            collection: "TestCollection2",
            collectionicon: "https://picsum.photos/201",
            volume: 158.3,
            _24h:"-21.53",
            _7d:"-3.42",
            floorprice:1.2,
            owners:"15.3K",
            items:"30.3K"
        },
        {
            collection: "TestCollection3",
            collectionicon: "https://picsum.photos/202",
            volume: 15.6,
            _24h:"+5.32",
            _7d:"+0.4",
            floorprice:0.7,
            owners:"5.7K",
            items:"3.9K"
        },
        {
            collection: "TestCollection4",
            collectionicon: "https://picsum.photos/203",
            volume: 305.7,
            _24h:"-8.21",
            _7d:"+1.65",
            floorprice:2.6,
            owners:"20.7K",
            items:"56.9K"
        },
        {
            collection: "TestCollection5",
            collectionicon: "https://picsum.photos/204",
            volume: 15.6,
            _24h:"+5.32",
            _7d:"+0.4",
            floorprice:0.7,
            owners:"5.7K",
            items:"3.9K"
        },
        {
            collection: "TestCollection6",
            collectionicon: "https://picsum.photos/205",
            volume: 887.2,
            _24h:"+40.23",
            _7d:"+10.87",
            floorprice:4.2,
            owners:"30.8K",
            items:"102.9K"
        },
        {
            collection: "TestCollection7",
            collectionicon: "https://picsum.photos/206",
            volume: 158.3,
            _24h:"-21.53",
            _7d:"-3.42",
            floorprice:1.2,
            owners:"15.3K",
            items:"30.3K"
        },
        {
            collection: "TestCollection8",
            collectionicon: "https://picsum.photos/207",
            volume: 305.7,
            _24h:"-8.21",
            _7d:"+1.65",
            floorprice:2.6,
            owners:"20.7K",
            items:"56.9K"
        },
        {
            collection: "TestCollection9",
            collectionicon: "https://picsum.photos/208",
            volume: 15.6,
            _24h:"+5.32",
            _7d:"+0.4",
            floorprice:0.7,
            owners:"5.7K",
            items:"3.9K"
        },
        {
            collection: "TestCollection10",
            collectionicon: "https://picsum.photos/209",
            volume: 158.3,
            _24h:"-21.53",
            _7d:"-3.42",
            floorprice:1.2,
            owners:"15.3K",
            items:"30.3K"
        },
    ];
    
    const durations = ["24h","7d","30d","all"];
    const categories = ["New", "Art", "Collectibles"]
    const chains = ["Ethereum"]
</script>

<div class="rankingdiv">
    <h1>Top NFTs</h1>
    <h6>The top NFTs on OpenSea, ranked by volume, floor price and other statistics.</h6>
    <div class="searchdiv">
    <select class="searchbar duration">
        {#each durations as duration}
            <option value={duration}>{duration}</option>
        {/each}
    </select>
    <select class="searchbar category">
        {#each categories as category}
            <option value={category}>{category}</option>
        {/each}
    </select>
    <select class="searchbar chain">
        {#each chains as chain}
            <option value={chain}>{chain}</option>
        {/each}
    </select>
    </div>
                <table>
                    <thead>
                        <th>Collection</th>
                        <th>Volume</th>
                        <th>24h %</th>
                        <th>7d %</th>
                        <th>Floor Price</th>
                        <th>Owners</th>
                        <th>Items</th>
                    </thead>
                    <tbody>
                        {#each rankingdata as ranking, i}
                            <tr>
                                <td><div class="collectiontddiv">{i + 1}<img class="collectionicon" src="{ranking.collectionicon}"/>{ranking.collection}</div></td>
                                <td>{ranking.volume}<img class="ethereum" src="ethereum.ico"/></td>
                                <td style="{ranking._24h > 0 ? "color:green" : "color:red"}">{ranking._24h}%</td>
                                <td style="{ranking._7h > 0 ? "color:green" : "color:red"}">{ranking._7d}%</td>
                                <td>{ranking.floorprice}<img class="ethereum" src="ethereum.ico"/></td>
                                <td>{ranking.owners}</td>
                                <td>{ranking.items}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
</div>

<style>
h1,h6
{
    text-align:center;
}
.searchdiv
{
    text-align:center;
}

.rankingdiv
{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    width: 60vw;
    position: relative;
    left: 20vw;
}
.searchbar
{
    width: 15em;
    height: 3em;
    font-size: medium;
    font-weight: bold;
}
.collectionicon
{
    width: 3em;
    height: 3em;
    border-radius: 3em;
    margin:0;
    margin-left: 1em;
    margin-right: 1em;
}
.collectiontddiv
{
    display: flex;
    align-items: center;
    font-weight: bold;
}
tr
{
    border-top: 2px solid;
    border-color:#CCCCCC;
}
</style>