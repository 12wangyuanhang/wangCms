<script lang="tsx">
    export default {
        setup() {
            return (props:any, { slots }:any) => (
                <>
                    <div>{slots.dropdown?.()}</div>
                </>
            );
        }
    }
</script>

<style>

</style>