export interface CopyFeedback {
  email: boolean
  phone: boolean
}

export const useContactInfoActions = () => {
  const copyFeedback = ref<CopyFeedback>({
    email: false,
    phone: false
  })

  const isClipboardSupported = computed(
    () => import.meta.client && Boolean(navigator.clipboard?.writeText)
  )

  const contactData = {
    email: 'kontakt@daap.pro',
    phone: '+48 512 526 397',
    phoneRaw: '+48512526397'
  }

  const copyText = async (value: string, key: keyof CopyFeedback) => {
    if (!isClipboardSupported.value) return false

    try {
      await navigator.clipboard.writeText(value)
      copyFeedback.value[key] = true
      setTimeout(() => {
        copyFeedback.value[key] = false
      }, 1800)
      return true
    } catch {
      return false
    }
  }

  const copyEmail = () => copyText(contactData.email, 'email')
  const copyPhone = () => copyText(contactData.phone, 'phone')

  return {
    contactData,
    copyFeedback: readonly(copyFeedback),
    isClipboardSupported,
    copyEmail,
    copyPhone
  }
}
