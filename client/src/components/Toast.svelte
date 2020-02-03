<script context="module">
  import { fly, fade } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap';

 const toastStore = writable({
   visible: false
  });

  export const toast = (color, timeout, header, message) => {
    toastStore.set({
      color,
      header,
      message,
      visible: true
    });
    setTimeout(() => {
      toastStore.set({visible: false})
    }, timeout)
  }

  export function stickyToast(color, header, message) {
    toastStore.set({
      color,
      header,
      message,
      visible: true
    });
  }

  const close = () => toastStore.set({visible: false})
</script>

{#if $toastStore.visible}
  <div class="p-3 mb-3" 
    style="position: absolute; top: 0; right: 0; z-index: 10;" 
    in:fly="{{ x: 200, duration: 500 }}" 
    out:fade
    on:click="{close}">
    <Toast class="mr-1">
      <ToastHeader>
        {$toastStore.header}
      </ToastHeader>
      <ToastBody class='bg-{$toastStore.color}'>
        <div class='d-flex align-items-center text-white'>
          <i class="fas fa-check fa-2x mr-2"></i>
          <p>{$toastStore.message}</p>
        </div>
      </ToastBody>
    </Toast>
  </div>
{/if}


