<script>
    function OnClickToggleButton()
    {
        if(this.parentElement.children[1].style.display == "none")
        {
            this.parentElement.children[1].style.display = "block";
            this.innerText = "◀"
        }
        else
        {
            this.parentElement.children[1].style.display = "none";
            this.innerText = "▶"
        }
    }
</script>

<div class="leftsidebar">
    <button class="leftsidebartogglebutton" on:click={OnClickToggleButton}>▶</button>
    <div class="leftsidemenu">
        <slot>
        </slot>
    </div>
</div>

<style>
.leftsidebar
{
    float: left;
    padding: 0px;
}

.leftsidemenu
{
    width: 10vw;
    height: 100vh;
    float: left;
    border: 1px rgba(128, 48, 64,0.5) solid;
    border-image: linear-gradient(170deg ,#8a5353, #5a0000, #1c1010) 1;
}

.leftsidebartogglebutton
{
    position: inherit;
    top:40vh;
    width: 3em;
    height:4em;
}
</style>
