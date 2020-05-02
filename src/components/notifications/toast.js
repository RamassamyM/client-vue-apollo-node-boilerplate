import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  // timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default Toast

// usage : see also doc : https://sweetalert2.github.io/#examples
// Toast.fire({
//   icon: 'success',
//   title: 'Signed in successfully'
// })
