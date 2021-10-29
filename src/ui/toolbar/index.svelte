<script lang="ts">
    import {Action} from "../../electron/actions"
    import '../common/preload'
    import PAGE from './pages'

    import Main from './pages/main.svelte'
    import Capture from './pages/capture.svelte'
    import Setting from './pages/setting.svelte'

    const PageAnimation = {
        ENTER: 'ENTER',
        EXIT: 'EXIT',
        NONE: 'NONE'
    }

    let alwaysOnTop = false, width = 100, page: PAGE = PAGE.MAIN, pageAnim = PageAnimation.NONE

    $: {
        switch (page) {
            case PAGE.MAIN:
                width = 100
                pageAnim = PageAnimation.EXIT
                break
            case PAGE.CAPTURE:
                width = 300
                pageAnim = PageAnimation.ENTER
                break
            case PAGE.OPENSETTING:
                width = 300
                pageAnim = PageAnimation.ENTER
                break
        }
    }

    $: {
        window.electron.toolbar.toolbarAction(Action.ALWAYSONTOP, alwaysOnTop)
        window.electron.toolbar.setToolbarWidth(width)
    }
</script>

<style lang="scss">
  .fadeIn {
    animation: fadeIn 0.2s cubic-bezier(0, .75, .25, 1) forwards;
  }

  .fadeOut {
    animation: fadeOut 0.2s cubic-bezier(0, .75, .25, 1) forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      margin-left: 30px;
    }
    100% {
      opacity: 1;
      margin-left: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 0;
      margin-left: -30px;
    }
    100% {
      opacity: 1;
      margin-left: 0;
    }
  }
</style>

<main class:fadeIn={pageAnim===PageAnimation.ENTER} class:fadeOut={pageAnim===PageAnimation.EXIT}>
    {#if page === PAGE.MAIN}
        <Main bind:alwaysOnTop bind:page/>
    {:else if page === PAGE.CAPTURE}
        <Capture bind:page/>
    {:else if page === PAGE.OPENSETTING}
        <Setting bind:page/>
    {/if}
</main>
