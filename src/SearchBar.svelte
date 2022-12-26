<script>
    export let content="", placeholder="", keydownevent;

    async function OnKeyDown(e)
    {
        if(keydownevent) keydownevent(e);
    }
</script>

<input class="searchbarinput nomargin" type="text" on:keydown={OnKeyDown} bind:value={content} placeholder={placeholder}/>

<style>
.searchbarinput
{
    border-radius: 0.5em;
    width: 40vw;
    height: 3em;
    display: flex;
    border: 1px solid rgb(224, 224, 224);
    background-color: rgb(255, 255, 255);
    font-size: medium;
}
</style>