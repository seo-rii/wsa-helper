<script lang="ts">
    import IconButton, {Icon} from '@smui/icon-button'
    import Tooltip, {Wrapper} from '@smui/tooltip'
    import {Action} from "../../electron/actions"
    import '../common/preload'

    let alwaysOnTop = false

    $: {
        window.electron.toolbar.toolbarAction(Action.ALWAYSONTOP, alwaysOnTop)
    }
</script>

<style lang="scss">
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 20px;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="main">
    <Wrapper>
        <IconButton class="material-icons-outlined" bind:pressed={alwaysOnTop} toggle>
            <Icon class="material-icons" on>push_pin</Icon>
            <Icon class="material-icons-outlined">push_pin</Icon>
        </IconButton>
        <Tooltip>Always on Top</Tooltip>
    </Wrapper>
    <Wrapper>
        <div class="row">
            <IconButton class="material-icons" on:click={()=>window.electron.toolbar.toolbarAction(Action.SCREENSHOT)}>
                screenshot
            </IconButton>
            <Icon class="material-icons">arrow_right</Icon>
        </div>
        <Tooltip>Take Screenshot</Tooltip>
    </Wrapper>
    <Wrapper>
        <IconButton class="material-icons" on:click={()=>window.electron.toolbar.toolbarAction(Action.APKINSTALL)}>
            install_mobile
        </IconButton>
        <Tooltip>Install APK</Tooltip>
    </Wrapper>
</div>

