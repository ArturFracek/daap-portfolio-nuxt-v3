export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const rootElement =
    document.querySelector<HTMLElement>('[data-scroll-container]') ??
    document.querySelector<HTMLElement>('main') ??
    null

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2, root: rootElement }
  )

  const observe = () => {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
      observer.observe(el)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe)
  } else {
    observe()
  }
})
