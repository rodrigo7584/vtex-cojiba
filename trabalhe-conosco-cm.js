document.getElementById('input-file-cv-cm').addEventListener('change', function () {
  var fileName = this.value.split('\\').pop()
  document.getElementById('label-file-cv-cm').innerHTML =
    fileName !== '' ? fileName : 'Selecionar Arquivo'
})

// FUNCTION TO SEND EMAIL
function initForm() {
  const form = document.querySelector('.form-curriculo-cm')
  if (form.length) {
    form.addEventListener('submit', event => {
      event.preventDefault()

      const formData = new FormData(form)
      const labelMessage = form.querySelector('.submit-result-cv')
      fetch('https://formsubmit.co/ajax/cojiba03@cojiba.com.br', {
        //SUBSTITUTE YOUR EMAIL
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        body: new URLSearchParams(formData).toString()
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            form.reset()
            labelMessage.innerHTML = 'Seu currículo foi enviado com sucesso.' //MESSAGE THAT WILL APPEAR WHEN YOU SENT THE EMAIL SUCCESSFULLY
            labelMessage.classList.add('success')
            setTimeout(() => {
              labelMessage.innerHTML = ''
              labelMessage.classList.remove('success')
            }, 5000)
          } else {
            labelMessage.innerHTML =
              'Algo deu errado, envie um email direto para cojiba03@cojiba.com.br' //MESSAGE THAT WILL APPEAR WHEN YOU SENT THE EMAIL AND HAD SOME PROBLEM
            labelMessage.classList.add('error')
            setTimeout(() => {
              labelMessage.innerHTML = ''
              labelMessage.classList.remove('error')
            }, 5000)
          }
        })
        .catch(error => {
          console.error(error)
          labelMessage.innerHTML = 'Entre em contato com o suporte ti@cojiba.com.br' //MESSAGE THAT WILL APPEAR WHEN YOU SENT THE EMAIL AND HAD SOME PROBLEM
          labelMessage.classList.add('error')
          setTimeout(() => {
            labelMessage.innerHTML = ''
            labelMessage.classList.remove('error')
          }, 5000)
        })
    })
  }
}
initForm()
