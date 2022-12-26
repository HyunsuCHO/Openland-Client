<script>
    export let contents=[],action=()=>{}, name="Testaaaaaa"

    function OnMouseEnter()
    {
        this.getElementsByClassName("downmenu")[0].style.display = "block"
    }

    function OnMouseLeave()
    {
        this.getElementsByClassName("downmenu")[0].style.display = "none"
    }
</script>

<div class="upmenu" on:mouseenter={contents.length > 0 ? OnMouseEnter : undefined} on:mouseleave={contents.length > 0 ? OnMouseLeave  : undefined}>
    <div class="namediv" on:click={action}>{name}</div>
    {#if contents.length > 0}
        <div class="downmenu">
            {#each contents as content, i}
                {#if content.name}
                    <div class="downmenucontent {i == contents.length - 1 ? "contentlast" :""}" on:click={content.action}>
                        {content.name}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
.downmenu{
    display: none;
}
.downmenucontent{
    display: flow;
    padding-top: 1em;
    padding-bottom: 1em;
    font-weight: bold;
    border-bottom: 1px solid rgb(185, 185, 185);
}

.contentlast{
    border-bottom-right-radius: 1em;
    border-bottom-left-radius: 1em;
}


div {
    display: flex;
    margin: 0;
    min-width: 4em;
    width: 6vw;
    height: 2em;
    overflow-wrap: break-word;
    align-items: flex-start;
    background-color: #ffffff;
    flex-direction: column;
    position: relative;
}
.upmenu{
    display: block;
}
.namediv
{
    font-weight: bold;
}
</style>