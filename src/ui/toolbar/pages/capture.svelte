<script lang="ts">
    import List, {
        Item,
        Graphic,
        Text,
        PrimaryText,
        SecondaryText,
    } from '@smui/list';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button'
    import PAGE from "./index";

    export let page;
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    nav {
        padding: 20px;
        display: flex;
        flex-direction: row;
        margin-bottom: -15px;
    }
</style>

<nav>
    <IconButton class="material-icons" on:click={()=>page = PAGE.MAIN}>
        arrow_back_ios_new
    </IconButton>
    <h1 style="margin:6px 10px;">Capture</h1>
</nav>
<main>
    <List twoLine>
        <Item>
            <Graphic class="material-icons">screenshot</Graphic>
            <Text>
                <PrimaryText>Capture</PrimaryText>
                <SecondaryText>Capture current screen.</SecondaryText>
            </Text>
        </Item>
        <Item>
            <Graphic class="material-icons">receipt_long</Graphic>
            <Text>
                <PrimaryText>Scroll Capture</PrimaryText>
                <SecondaryText>Capture current screen to end.</SecondaryText>
            </Text>
        </Item>
        <Item>
            <Graphic class="material-icons">camera</Graphic>
            <Text>
                <PrimaryText>Record</PrimaryText>
                <SecondaryText>Record video.</SecondaryText>
            </Text>
        </Item>
    </List>
</main>
