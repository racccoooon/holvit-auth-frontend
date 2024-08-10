<script setup>
import {onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  key: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  canMark: {
    type: Boolean,
    required: false,
    default: true,
  },
  canSort: {
    type: Boolean,
    required: false,
    default: true,
  }
})


onMounted(() => {
  getCurrentInstance().parent.registerColumn({...props})
})


</script>