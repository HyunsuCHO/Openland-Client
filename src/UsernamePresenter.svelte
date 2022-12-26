<script>
    export let userid = {id:1}, userdata={};
    import {axios} from "./Singleton"
    import { onMount } from 'svelte';
    import { observe } from 'svelte-observable';
    import Profile from "./Profile.svelte";
    import {UserCache} from "./Cache"
    async function OnUserIdChange()
    {
        if(!userid.id) return;
        if($UserCache[userid.id])
            userdata = $UserCache[userid.id];
        else{
            let result = await $axios.get("/users/user/"+userid.id);
            if(result.data)
                $UserCache[userid.id] = result.data
            userdata = result.data
        }
    }
    onMount(OnUserIdChange);

    function OnClick()
    {
        let contenttag = document.getElementsByTagName('content')[0];
        new Profile({target: contenttag, hydrate: true, props:{accountid: userid.id}});
    }

    $: if (userid !== '') {
        OnUserIdChange();
    }; 
</script>

<a on:click={OnClick}>{userdata.nickname}</a>
