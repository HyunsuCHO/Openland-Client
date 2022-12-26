<script>
    import {axios} from "./Singleton"
    export let address;
    let currentImageData = undefined;
    let name, password, email, nickname;


    async function OnSubmitButtonClick() {
        const formData = new FormData()
        formData.append('attachment', currentImageData);
        formData.append('username', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('nickname', nickname);
        formData.append('address', address);

        
        let result = await $axios({
            method: 'post',
            url: '/users/register',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if(result.data == "Success")
        {
            alert("Registered");
            window.location.href = "/";
            window.location.reload();
        }
        else
        {
            alert(result.data);
        }

        //await $axios.post('/users/register', formData);
    }

    const onChangeImg = async (e) => {
        e.preventDefault();
        if(e.target.files){
            currentImageData = e.target.files[0];
        }
    }
</script>

<div class="registeruserdiv">
    <h3>Register User</h3>
    <input name="address" style="display: none" bind:value={address}>
    <label for="name">UserName: </label>
    <input name="name" bind:value={name}/>
    <label for="password">Password: </label>
    <input name="password" type="password" bind:value={password}/>
    <label for="nickname">Nickname: </label>
    <input name="nickname" bind:value={nickname}/>
    <label for="email">Email: </label>
    <input name="email" type="email" bind:value={email}/>
    <label for="attachment">Profile Picture: </label>
    <input type="file" name="attachment" on:change={onChangeImg}/>
    <button type="submit" on:click={OnSubmitButtonClick}>Submit</button>
</div>