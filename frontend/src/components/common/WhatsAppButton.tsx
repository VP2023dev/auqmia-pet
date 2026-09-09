import { MessageCircle } from 'lucide-react'
import { contactConfig } from '@/config/contact'
import { openWhatsApp } from '@/services/whatsapp'

export function WhatsAppButton() {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp()}
      className="pulse-ring fixed right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-3.5 text-sm font-semibold text-white shadow-card sm:right-6 sm:h-14 sm:px-4"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      aria-label={`Falar com a AUqMIA Pet no WhatsApp ${contactConfig.phoneDisplay}`}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp</span>
    </button>
  )
}
