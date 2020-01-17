
<script>
  import { fly, fade } from 'svelte/transition';
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'

  let visible = false;
  let color;
  let title; 
  let message = 'test';

  export const show = (type, timeout, header, text) => {
    color = type;
    title = header;
    message = text;
    visible = true;
    setTimeout(() => {
      visible=false;
    }, timeout)
  }

  export function showSticky(color, title, message) {
    color = color;
    title = title;
    message = message;
    visible = true;
  }

</script>

{#if visible}
  <div class="p-3 mb-3" style="position: absolute; top: 0; right: 0; z-index: 10;" in:fly="{{ x: 200, duration: 2000 }}" out:fade>
    <Toast class="mr-1">
      <ToastHeader>
        {title}
      </ToastHeader>
      <ToastBody class='bg-{color}'>
        <div class='d-flex align-items-center text-white'>
          <i class="fas fa-check fa-2x mr-2"></i>
          <p>{message}</p>
        </div>
      </ToastBody>
    </Toast>
  </div>
{/if}