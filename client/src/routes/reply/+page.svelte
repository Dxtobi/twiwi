<script>
    import ResponceBox from "../../components/responceBox.svelte";
    import {loading} from '$lib/loading';
    
    import {mainUrl} from '$lib/mainurl';
    const url = `${$mainUrl}/reduce_to_twit`;
 
    let twi = '';
    let newTwi = ''

    async function getData(e) {
        // Make the API Call here
       if(twi === '' || twi === null|| twi === undefined){
         console.log('empty')
        return
       }
       $loading = true
     fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({prompt:twi})
       })
       .then(response => response.json())
        .then(json => {
            $loading = false
            return newTwi = json
        });

     
    }

    const clearNew =()=>{
        return newTwi = ''
    };
</script>


<div>

    <div class="disribeing"> Sarcastic <img alt="" class="twiter-logo" src="/twitter-round.svg"/></div>
    <div>
        Generate  sarcastic Reply from a text .
         <span style="color: #5ea7ff; font-weight: bold;">#TwitToImage.</span>
    </div>
	<div class="text-area-twit-cont">
        <textarea class="input-tweet" placeholder="place your text here" type="text" bind:value={twi} />
    </div>
	<button class="enter-btn" on:click={getData}>Generate</button>

    {#if newTwi != ''}
        <ResponceBox {clearNew} {newTwi}/>
    {/if}
</div>

