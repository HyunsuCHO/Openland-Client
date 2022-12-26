<script>
import {signInMetamask } from "./Session";
</script>


<div>
    <button color="primary" large :disabled="buttonDisabled" on:click="{signInMetamask}">
    <img src="metamask.png" class="metamask-logo" />
    <span>Login with Metamask</span>
    </button>
</div>

<style>
    img
    {
        display: inline;
        margin:0;
        width: 16px;
        height: 16px;
    }
</style>