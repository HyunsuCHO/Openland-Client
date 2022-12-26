<script>
    let  fileinput
	export let needimgtag = true, imgdata = "", viewerdata = "";

	const onFileSelected =(e)=>{
        if(e.target.files[0]==undefined)
            return;
        imgdata = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(imgdata);
        reader.onload = e => {
            viewerdata = e.target.result;
        };
    }
</script>
{#if needimgtag}
<img class="uploadedimage" src={viewerdata} alt style="display:{viewerdata !== "" ? "flex" : "none"}">
{/if}
<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
<style>
	.upload{
		display:flex;
	    height:50px;
		width:50px;
		cursor:pointer;
	}
	.uploadedimage{
        max-width: 500px;
        max-height: 400px;
        border-radius: 1em;
        border: 1px solid gray;
	}
</style>