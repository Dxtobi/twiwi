<script>
    import ResponceBox from "../../components/responceBox.svelte";
    import {loading} from '$lib/loading';


    import {mainUrl} from '$lib/mainurl';
    const url = `${$mainUrl}/reduce_to_twit`;

    //const url = 'http://localhost:5000/reduce_to_twit'
    let twi = '';
    let newTwi = ''

    async function getData(e) {
        // Make the API Call here
       if(twi === '' || twi === null|| twi === undefined){
         console.log('empty')
        return
       }
$loading=true
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
    }

    
</script>


<div>

    <div class="disribeing">Summarize To A Single Twit<img alt="" class="twiter-logo" src="/twitter-round.svg"/></div>
    <div>
        Our app turns long texts into concise, 140-character messages for easy sharing on social media.
         <span style="color: #5ea7ff; font-weight: bold;">#Twitter #concise #sharing #reducedToTwit.</span>
    </div>
	<div class="text-area-twit-cont">
        <textarea class="input-tweet" placeholder="place your text here" type="text" bind:value={twi} />
    </div>
	<button class="enter-btn" on:click={getData}>Generate</button>

    {#if newTwi != ''}
        <ResponceBox {clearNew} {newTwi}/>
    {/if}
</div>

