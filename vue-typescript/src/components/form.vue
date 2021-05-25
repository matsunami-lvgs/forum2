<template>
  <form method="post" action="" id="Postingform">
    <input type="text" name="postwriter">
    <br>
    <textarea name="postbody" placeholder="コメント内容"></textarea>
    <br>
    <button type="submit">投稿する</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PostingForm',
})
</script>

<style>
#Postingform{

}
</style>