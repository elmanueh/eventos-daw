export function showMessageError(message) {
  const element = document.getElementById('errorMessage')
  element.innerHTML = message
  element.classList.remove('d-none')
}

export function hideMessageError() {
  const element = document.getElementById('errorMessage');
  element.innerHTML = '';
  element.classList.add('d-none');
}