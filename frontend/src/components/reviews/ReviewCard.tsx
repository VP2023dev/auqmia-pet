import { Star } from 'lucide-react'
import type { Review } from '@/types/review'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-soft transition-colors duration-300 hover:border-primary/40 sm:rounded-3xl sm:p-6">
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={`Foto de ${review.name}`}
            className="h-12 w-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
            {review.name.charAt(0)}
          </span>
        )}
        <div>
          <h3 className="font-semibold text-ink">{review.name}</h3>
          <p className="text-xs text-muted">Tutor de {review.petName}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1 text-secondary" aria-label={`${review.rating} de 5 estrelas`}>
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">“{review.comment}”</p>
    </article>
  )
}
