'use client'

/**
 * Visual preview renderers for all 9 section types.
 * CRITICAL: Shows ALL content — no line-clamp or text truncation anywhere.
 * Heights expand freely to show every item and every word.
 */

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'text-amber-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroPreview({ section }) {
  return (
    <div
      className="relative overflow-hidden min-h-[160px] bg-slate-900 flex flex-col justify-center p-6"
      style={
        section.backgroundImage
          ? {
              backgroundImage: `url(${section.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {section.backgroundImage && (
        <div className="absolute inset-0 bg-black/55" />
      )}
      <div className="relative space-y-2">
        <h2 className="text-white text-xl font-bold leading-snug">
          {section.title || <span className="opacity-40 italic">No title set</span>}
        </h2>
        {section.subtitle && (
          <p className="text-white/80 text-sm whitespace-pre-wrap">{section.subtitle}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {section.ctaText && (
            <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded">
              {section.ctaText}
            </span>
          )}
          {section.secondaryCtaText && (
            <span className="px-3 py-1.5 border border-white/60 text-white text-xs font-semibold rounded">
              {section.secondaryCtaText}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Text ──────────────────────────────────────────────────────────────────────

function TextPreview({ section }) {
  const hasContent = section.heading || section.body || section.image
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-card">
      {section.heading && (
        <h3 className="font-semibold text-base text-foreground">{section.heading}</h3>
      )}
      {section.body && (
        <div
          className="text-sm text-muted-foreground [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1"
          dangerouslySetInnerHTML={{ __html: section.body }}
        />
      )}
      {section.image && (
        <img
          src={section.image}
          alt="Section image"
          className="w-full rounded-md object-cover"
        />
      )}
      {!hasContent && (
        <p className="text-sm text-muted-foreground italic">Empty text section</p>
      )}
    </div>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/30">
      {section.heading && (
        <h3 className="font-semibold text-base">{section.heading}</h3>
      )}
      {section.subheading && (
        <p className="text-sm text-muted-foreground">{section.subheading}</p>
      )}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex gap-2 items-start p-2.5 bg-white dark:bg-slate-800 rounded border"
            >
              <div className="w-7 h-7 rounded bg-primary/10 flex-shrink-0 flex items-center justify-center text-[10px] text-primary font-bold uppercase">
                {item.icon ? item.icon.slice(0, 2) : '✦'}
              </div>
              <div>
                <p className="text-xs font-semibold">{item.title || '(no title)'}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No feature items yet</p>
      )}
    </div>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FAQPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-card">
      {section.heading && (
        <h3 className="font-semibold text-base">{section.heading}</h3>
      )}
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="border rounded p-3 space-y-1">
              <p className="text-xs font-semibold text-foreground">
                {item.question || '(no question)'}
              </p>
              {item.answer && (
                <p className="text-xs text-muted-foreground whitespace-pre-wrap">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No FAQ items yet</p>
      )}
    </div>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTAPreview({ section }) {
  const hasBg = !!section.backgroundImage
  return (
    <div
      className="relative overflow-hidden"
      style={
        hasBg
          ? {
              backgroundImage: `url(${section.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      <div className={`p-6 text-center ${hasBg ? 'bg-black/55' : 'bg-slate-800'}`}>
        {section.heading && (
          <h3 className="font-bold text-lg text-white">{section.heading}</h3>
        )}
        {section.subheading && (
          <p className="text-sm text-white/80 mt-1 whitespace-pre-wrap">{section.subheading}</p>
        )}
        {section.buttonText && (
          <span className="inline-block mt-3 px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded">
            {section.buttonText}
          </span>
        )}
        {!section.heading && !section.subheading && !section.buttonText && (
          <p className="text-sm text-white/50 italic">Empty CTA section</p>
        )}
      </div>
    </div>
  )
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function StatsPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 space-y-3 bg-primary/5">
      {section.heading && (
        <h3 className="font-semibold text-base text-center">{section.heading}</h3>
      )}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="text-center p-3 bg-white dark:bg-slate-800 rounded border"
            >
              <p className="text-xl font-bold text-primary">{item.value || '—'}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.label || ''}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic text-center">No stats yet</p>
      )}
    </div>
  )
}

// ── Services ──────────────────────────────────────────────────────────────────

function ServicesPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-card">
      {section.heading && (
        <h3 className="font-semibold text-base">{section.heading}</h3>
      )}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item, i) => (
            <div key={i} className="border rounded overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title || 'Service'}
                  className="w-full h-24 object-cover"
                />
              )}
              <div className="p-2.5 space-y-1">
                <p className="text-xs font-semibold">{item.title || '(no title)'}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
                {item.link && (
                  <p className="text-xs text-primary">{item.link}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No service items yet</p>
      )}
    </div>
  )
}

// ── Process ───────────────────────────────────────────────────────────────────

function ProcessPreview({ section }) {
  const steps = section.steps || []
  return (
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/30">
      {section.heading && (
        <h3 className="font-semibold text-base">{section.heading}</h3>
      )}
      {steps.length > 0 ? (
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {step.step || i + 1}
              </div>
              <div>
                <p className="text-xs font-semibold">{step.title || '(no title)'}</p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No steps yet</p>
      )}
    </div>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function TestimonialsPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/30">
      {section.heading && (
        <h3 className="font-semibold text-base">{section.heading}</h3>
      )}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 border rounded p-3 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold">{item.name || '(no name)'}</p>
                  {item.location && (
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  )}
                </div>
                <StarRating rating={item.rating} />
              </div>
              {item.text && (
                <p className="text-xs text-foreground/80 italic">"{item.text}"</p>
              )}
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt={item.name || 'Reviewer'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No testimonials yet</p>
      )}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function SectionPreview({ section }) {
  switch (section?.type) {
    case 'hero':         return <HeroPreview section={section} />
    case 'text':         return <TextPreview section={section} />
    case 'features':     return <FeaturesPreview section={section} />
    case 'faq':          return <FAQPreview section={section} />
    case 'cta':          return <CTAPreview section={section} />
    case 'stats':        return <StatsPreview section={section} />
    case 'services':     return <ServicesPreview section={section} />
    case 'process':      return <ProcessPreview section={section} />
    case 'testimonials': return <TestimonialsPreview section={section} />
    default:
      return (
        <div className="p-4 text-sm text-muted-foreground italic">
          Unknown section type: {section?.type}
        </div>
      )
  }
}
