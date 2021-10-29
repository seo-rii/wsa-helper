<script lang="ts">
    import {Action} from "../../../electron/actions"
    import IconButton, {Icon} from '@smui/icon-button'
    import Tooltip, {Wrapper} from '@smui/tooltip'
    import PAGE from './'
    import '../../common/preload'

    export let alwaysOnTop, page, width = 0, minWidth = 0
    $:{
        if (!minWidth || width < minWidth) {
            minWidth = width
        }
    }
</script>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 20px;
    width: calc(var(--width) - 40px);

    & > * {
      margin: 5px;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .detail {
    cursor: pointer;
    width: 0;

    & > :global(*) {
      margin-top: 3px;
      margin-left: -5px;
    }
  }
</style>

<svelte:window bind:innerWidth={width}/>

<main style="--width:{width}px;">
    <Wrapper>
        <IconButton class="material-icons-outlined" bind:pressed={alwaysOnTop} toggle>
            <Icon class="material-icons" on>push_pin</Icon>
            <Icon class="material-icons-outlined">push_pin</Icon>
        </IconButton>
        <Tooltip>Always on Top</Tooltip>
    </Wrapper>
    <Wrapper>
        <div class="row">
            <span/>
            <IconButton class="material-icons" on:click={()=>window.electron.toolbar.toolbarAction(Action.SCREENSHOT)}>
                screenshot
            </IconButton>
            <div class="detail">
                <Icon class="material-icons" on:click={()=>page=PAGE.CAPTURE}>arrow_forward_ios_new</Icon>
            </div>
        </div>
        <Tooltip>Take Screenshot</Tooltip>
    </Wrapper>
    <Wrapper>
        <IconButton class="material-icons" on:click={()=>window.electron.toolbar.toolbarAction(Action.APKINSTALL)}>
            install_mobile
        </IconButton>
        <Tooltip>Install APK</Tooltip>
    </Wrapper>
</main>
