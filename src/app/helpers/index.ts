export const fadeOutLoading = async () => {
  const loader = document.getElementById('app-loading')
  if (!loader) {
    return
  }
  loader.style.transition = 'opacity 0.3s ease'
  loader.style.opacity = '0'
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      loader.remove()
      resolve()
    }, 300)
  })
}

export const setErrorPage = () => {
  const loader = document.getElementById('app-loading')
  if (!loader) {
    return
  }
  loader.innerHTML = `
    <div style="text-align: center;">
      <h2>Ошибка загрузки</h2>
      <a onclick="location.reload()" style="cursor: pointer;">Обновить</a>
    </div>
  `
}
