<template>
    <div>
        <h1>VUE3项目中引入 Editor.md</h1>

        <EditorMarkdown :modelValue="this.msg" ref = "child"/>
        
    </div>
</template>

<script>
import EditorMarkdown from '../../components/EditorMarkdown.vue';

export default {
    components: {
        EditorMarkdown
    },
    data() {
        return{
            statics: {},
            msg:""
        }
    },
    methods:{
        md_save() {
            this.$refs.child.get_html();
        },

    }
}
</script>

<style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
</style>