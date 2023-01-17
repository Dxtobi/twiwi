<script>
    import Clipboard from "svelte-clipboard";
    export let text
  </script>
  
  <Clipboard
    text={text}
    let:copy
    on:copy={() => {
      console.log('Has Copied');
      window.alert('copied')
    }}>
    <button on:click={copy}  class="copy-btn">Copy</button>
  </Clipboard>