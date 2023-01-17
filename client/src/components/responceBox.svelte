
<script>
    import CopyBtn from "./copyBtn.svelte";


    export let clearNew
    export let newTwi
</script>

<div class="new-twit">
    <button class="cancel-btn" on:click={clearNew}>X</button>
    <div class="a-div-twit">
        <img alt="" class="twiter-logo" src="/twitter-round.svg"/>
        <div class="twi-main">{newTwi}</div>
        <CopyBtn text={newTwi}/>
    </div>
</div>