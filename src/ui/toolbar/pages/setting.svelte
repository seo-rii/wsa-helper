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
    <h1 style="margin:6px 10px;">Setting</h1>
</nav>
<main>
    <List twoLine>
        <Item>
            <Graphic class="material-icons">settings</Graphic>
            <Text>
                <PrimaryText>helper setting</PrimaryText>
                <SecondaryText>Open WSA-Helper Setting.</SecondaryText>
            </Text>
        </Item>
        <Item on:click={()=>{
            window.electron.toolbar.openWSASetting()
            page=PAGE.MAIN
        }}>
            <Graphic class="material-icons">app_settings_alt</Graphic>
            <Text>
                <PrimaryText>WSA Setting</PrimaryText>
                <SecondaryText>Open WSA Setting.</SecondaryText>
            </Text>
        </Item>
    </List>
</main>
