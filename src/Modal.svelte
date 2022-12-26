<script>
    import {clickOutside} from './clickOutside.js'
    export let modalslot = undefined;
    export let showModal = true;
    export let isPromo = true;
    export let slotprop = {};
    function OnClickOutside()
    {
        showModal = false;
    }
</script>

{#if showModal}
<div class="backdrop" class:promo={isPromo}>
    <div class="modal" use:clickOutside on:click_outside={OnClickOutside}>
        <slot>
            <svelte:component this={modalslot} {...slotprop}></svelte:component>
        </slot>
    </div>
</div>
{/if}


<style>
.backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
}

.modal {
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
    margin: 10% auto;
    text-align: center;
    background: white;
}

.promo .modal {
    /*background: crimson;
    color: white;*/
}
</style>