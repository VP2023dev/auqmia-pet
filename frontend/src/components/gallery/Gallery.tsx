import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import type { GalleryItem } from '@/types/gallery'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

interface GalleryProps {
  items: GalleryItem[]
}

export function Gallery({ items }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  return (
    <>
      <Stagger className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item, index) => (
          <StaggerItem
            key={item.id}
            className={index === 0 ? 'col-span-2 md:row-span-2' : undefined}
          >
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="group relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl"
              aria-label={`Abrir imagem: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full min-h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:min-h-40 md:min-h-48"
              />
              <span className="absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-night/80 to-transparent px-4 py-4 text-left text-sm font-medium text-white md:block">
                <span className="inline-block translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.label}
                </span>
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.label}>
        {selected ? (
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[70vh] w-full rounded-2xl object-cover"
          />
        ) : null}
      </Modal>
    </>
  )
}
