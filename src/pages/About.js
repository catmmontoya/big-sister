import React from 'react'
import TinyWaveFormIcon from '@/components/Layout'

export default function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-orange-200', 'fill-red-300']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">ABOUT</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4'
        )}
      >
        Big Sister is Bri&apos;s brain child she has been trying to develop for
        years. Through the support of Patreon, she is excited to create her own
        series of zines centered around sibling relationships and other aspects
        of the family system. Along with Big Sister, zine topics will include
        depression, anxiety, vulnerability, faith, and more.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-gray-400 hover:text-orange-700 active:text-orange-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
