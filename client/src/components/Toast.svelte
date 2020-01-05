<script>
  import { fly, fade } from 'svelte/transition';
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'

  let visible = false;
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']; 
  let color = colors[4];

  function displayToast() {
    visible = true;
    setTimeout(() => {
      visible=false;
    }, 4000)
  }

  displayToast();

</script>

{#if visible}
  <div class="p-3 mb-3" style="position: absolute; top: 0; right: 0; z-index: 10;" in:fly="{{ x: 200, duration: 4000 }}" out:fade>
    <Toast class="mr-1">
      <ToastHeader>
        Error
      </ToastHeader>
      <ToastBody class='bg-{color}'>
        <div class='d-flex align-items-center text-white'>
          <i class="fas fa-calculator fa-2x mr-2"></i>
          <p>Error ocurred while saving invoice! Please try again.</p>
        </div>
      </ToastBody>
    </Toast>
  </div>
{/if}