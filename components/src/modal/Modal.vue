<script setup>
import {ref} from "vue";
import Button from "../Button.vue"

const dialogEl = ref(null);

const open = () => dialogEl.value.showModal();
const close = () => dialogEl.value.close();

defineExpose({
  open,
  close,
})

</script>

<template>
  <dialog class="backdrop:bg-slate-100/10 backdrop:backdrop-blur border border-slate-200 rounded-lg" ref="dialogEl">
    <div class="px-8 py-4 border-b border-slate-200 bg-slate-50">
      BLABLABLA
<!--      <div class=""-->
    </div>


    <div class="px-8 py-4">
      conubia possit tortor maiorum venenatis deterruisset viris interdum comprehensam posidonium varius consectetuer
      ridens sociosqu aptent commodo orci ipsum dis saperet ceteros ceteros solum adipisci movet instructior omittam
      sapientem urna antiopam mus aenean posuere dicta pharetra theophrastus viverra causae necessitatibus cu postea
      partiendo nulla iisque fabulas dignissim brute ultrices molestiae odio honestatis invidunt senectus fastidii adhuc
      oratio mucius delectus tellus eirmod purus omittam nunc aliquam saperet curae penatibus vivamus erat perpetua est
      quaeque scripserit voluptaria dolores sollicitudin pertinax cum mattis saperet menandri mucius viderer vis neque
      conclusionemque perpetua voluptatibus mediocritatem ea mazim impetus sea facilisis semper reprimique quas
      fringilla habeo porttitor pertinax nam natoque interpretaris convallis morbi petentium auctor quidam reformidans
    </div>
    <div class="px-8 py-4 border-t border-slate-200 flex gap-4 justify-end bg-slate-50">
      <Button text="Delete" color="danger" size="sm" />
      <Button text="Abort" color="secondary" size="sm" />
    </div>
  </dialog>
</template>

<style scoped>

</style>