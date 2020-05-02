<template>
  <div :id="id">
    <v-snackbar
      v-model="displayNotif"
      :bottom="notify === 'bottom'"
      :color="color"
      :left="notifx === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="notifx === 'right'"
      :timeout="timeout"
      :top="notify === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        icon
        large
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>

// Install it in layout vue html :
// <notif-bar :color="notifColor" :text="notifText" :displayNotif="displayNotif" :notifx="notifx" :notify="notify" :mode="notifMode" @close="displayNotif = false"/>
// Add Script in mounted :
// EventBus.$on("displayNotifBar", ({ color, text, x, y, mode }) => {
//   self.notifColor = color || 'success'
//   self.notifText = text || 'This is a notification!'
//   self.displayNotif = true
//   self.notifx = x || ''
//   self.notify = y || ''
//   self.notifMode = mode || ''
// })
// Launch it in any component :
// EventBus.$emit('displayNotifBar', { text: message, color: 'blue', x:'right', y:'top', mode: '' })

export default {
  name: "",
  props: {
    id: {
      type: String,
      default: "notifBar"
    },
    color: {
      type: String,
      default: 'info'
    },
    mode: {
      type: String,
      default: 'vertical',
    },
    timeout: {
      type: Number,
      default: 6000
    },
    notifx: {
      type: String,
      default: ''
    },
    notify: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'This is a notification !',
    },
    displayNotif: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
