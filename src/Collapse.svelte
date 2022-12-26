<script>
  export let buttonname = "", active = true;
  let collapse;
  function OnClickCollapsible(){
    this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
        this.childNodes[1].innerText = "▼"
      } else {
        content.style.display = "block";
        this.childNodes[1].innerText = "▲"
      }
  }

  function OnLoad()
  {
    if(active){
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      content.style.display = "block";
      this.childNodes[1].innerText = "▲"
    }
  }
</script>

<div class="collapse" bind:this={collapse}>
  <button type="button" class="collapsible" on:load={OnLoad} on:click={OnClickCollapsible}>{buttonname}<span class="collapsebuttonspan" style="float:right;text-align:right;">▼</span></button>
  <div class="collapsecontent">
    <slot></slot>
  </div>
</div>
<style>
  /* Style the button that is used to open and close the collapsible content */
.collapse
{
  margin:0;
  margin-top:1em;
  border-radius: 3px;
  border: 1px solid #AAAAAA;
  width: 100%;
}

.collapsible {
  background-color: #fafafa;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.collapsible:focus:enabled, .collapsible:hover:enabled, .collapsible:focus:enabled, .collapsible:hover:enabled, input[type="submit"]:focus:enabled, input[type="submit"]:hover:enabled, input[type="reset"]:focus:enabled, input[type="reset"]:hover:enabled, input[type="button"]:focus:enabled, input[type="button"]:hover:enabled {
    /*background-color: #982c61;*/
    border: 1px solid rgb(1, 119, 255);
    background-color: rgb(0, 81, 173);
    /*border-color: #402c98;*/
    color: #f9f9f9;
    outline: 0; 
    border-radius: 3px;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .collapsible:hover {
  background-color: #ccc;
}

/* Style the collapsible content. Note: hidden by default */
.collapsecontent {
  display: none;
  overflow: hidden;
  background-color: #fafafa;
  margin: 0;
}
</style>