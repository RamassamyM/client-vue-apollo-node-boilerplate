import Swal from 'sweetalert2'

const Alert = Swal.mixin({
  // footer: '<a href>Why do I have this issue?</a>',
  // imageUrl: 'https://unsplash.it/400/200',
  // imageWidth: 400,
  // imageHeight: 200,
  // imageAlt: 'Custom image',
  // html:
  //   'You can use <b>bold text</b>, ' +
  //   '<a href="//sweetalert2.github.io">links</a> ' +
  //   'and other HTML tags',
  showCancelButton: true,
  // showCloseButton: true,
  // focusConfirm: false,
  showLoaderOnConfirm: true,
  confirmButtonText: 'Confirm',
  // confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText: 'Cancel',
  // cancelButtonAriaLabel: 'Thumbs down',
  // position: 'top-end',
  // timer: 1500,
})

export default Alert

// usage : see also doc : https://sweetalert2.github.io/#examples
// Alert.fire({
//   icon: 'success',
//   title: 'Signed in successfully',
//   text: 'Something went wrong!',
// })
