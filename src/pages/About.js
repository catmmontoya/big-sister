import React from 'react'

export default function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <span className="ml-2.5">ABOUT</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4'
        )}
      >
        <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
          Bri Gawkoski is an artist from Colorado. She has been behind a camera
          for fifteen years, working in both film and digital photography.
        </p>
        <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
          Her current work is minimalist, collage art which attempts a
          lighthearted approach to heavy topics such as failed relationships,
          mental illness, women's rights, and more.
        </p>
        <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
          Bri creates both analog and digital collages sourced from vintage
          magazines.
        </p>
      </p>
      {/* {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-gray-400 hover:text-orange-700 active:text-orange-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )} */}
    </section>
  )
}
