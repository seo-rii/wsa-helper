<script lang="ts">
    import LinearProgress from '@smui/linear-progress';
    import '../common/preload'
    import {onMount} from "svelte";
    import {tweened} from "svelte/motion";

    const progress = tweened(0, {
        duration: 1000,
    })

    let message = "Connecting to ADB..."

    onMount(() => {
        $progress = 0.1
        window.electron.apkInstall.onMessage((event, stage) => {
            if (stage === 1) {
                message = 'Installing APK...'
                $progress = 0.6
            }
            if (stage === 2) {
                message = 'Success!'
                $progress = 1
            }
        })
    })
</script>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 40px);
    padding: 20px;
  }
</style>

<main>
    <h2 style="margin:0 0 20px;">{message}</h2>
    <LinearProgress progress={$progress}/>
</main>

