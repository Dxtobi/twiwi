<script>
    

    import {loading} from '$lib/loading';

    import {mainUrl} from '$lib/mainurl';
    const url = `${$mainUrl}/give_image`;
    console.log(url)

    let twi = '';
    let newTwi = '';

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
            console.log(json)
            $loading = false
            return newTwi = json
        });

     
    }



function handleDownload(url) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                let a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'image.jpg';
                a.click();
            })
            .catch(error => console.error(error));
    }''

    const clearNew =()=>{
        return newTwi = ''
    };
</script>


<div>

    <div class="disribeing">Twit to image<img alt="" class="twiter-logo" src="/twitter-round.svg"/></div>
    <div>
        Lets turn your twit into an image.
         <span style="color: #5ea7ff; font-weight: bold;">#TwitToImage.</span>
    </div>
	<div class="text-area-twit-cont">
        <textarea class="input-tweet" placeholder="place your text here" type="text" bind:value={twi} />
    </div>
	<button class="enter-btn" on:click={getData}>Generate</button>

    {#if newTwi != ''}
        <div class="new-twit">
            <button class="cancel-btn" on:click={clearNew}>X</button>
            <div class="a-div-twit">
                <img alt="" class="twiter-logo" src="/twitter-round.svg"/>
                <img class="twi-main-img" alt='' src={newTwi}/>
                <button class="copy-btn" on:click={() => handleDownload(newTwi)}>Download</button>
            </div>
        </div>
    {/if}
</div>

