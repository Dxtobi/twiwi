<script>
    

    import ResponceBox from "../../components/responceBox.svelte";
    import { loading } from "$lib/loading";

    import {mainUrl} from '$lib/mainurl';
    const url = `${$mainUrl}/write_about`;
    ///const url = 'http://localhost:5000/write_about'
    //let twi = '';
    let newTwi = ''
    let aim='', platform='Instagram';

    async function getData(e) {
        // Make the API Call here
       if(aim === '' || platform === ''){
         console.log('empty')
        return
       }
$loading = true
     fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({aim, platform})
       })
       .then(response => response.json())
        .then(json => {
            $loading = false
            return newTwi = json
        });

     
    }

    const clearNew =()=>{
        return newTwi = ''
    }

    //navigator.clipboard.writeText(newTwi)
</script>


<div>

    <div class="disribeing">Ad Writer<img alt="" class="twiter-logo" src="/twitter-round.svg"/></div>
    <div>
         <span style="color: #5ea7ff; font-weight: bold;">Ad Writer:</span>
         Writes straight forward Ads. 
    </div>
    <div class="select-div">
        <div>Select Platform</div>
        <select class="select" bind:value={platform}>
             <option value="Facebook">Facebook</option>
             <option value="Instagram">Instagram</option>
             <option value="Twitter">Twitter</option>
             <option value="Instagram">Linkedin</option>
             <option value="Twitter">YouTube</option>
             <option value="All social media and none social media">All</option>
        </select>

    </div>

    <div class="text-area-twit-cont">
        <textarea class="input-tweet" placeholder="What dose yor product do" type="text" bind:value={aim} />
    </div>
	<button class="enter-btn" on:click={getData}>Generate</button>

    {#if newTwi != ''}
        <ResponceBox {clearNew} {newTwi}/>
    {/if}
</div>

