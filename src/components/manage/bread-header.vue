<template>
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem v-for="(p,i) in path" :key="i">{{p}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
    export default {
        props: {
            curLocate: {type: String},
            path: {type: Array, default: []}
        },
        name: "bread-header"
    }
</script>

<style scoped>

</style>