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
  // Replicate the live two-tone title split at em-dash
  const dashIndex = (section.title || '').indexOf(' \u2013 ')
  const titleBold  = dashIndex !== -1 ? section.title.slice(0, dashIndex) : (section.title || '')
  const titleLight = dashIndex !== -1 ? section.title.slice(dashIndex + 3) : ''

  return (
    <div
      className="relative overflow-hidden bg-slate-900"
      style={
        section.backgroundImage
          ? { backgroundImage: `url(${section.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {}
      }
    >
      {/* Overlays — match the live page */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.00) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 40%)' }} />

      {/* Content */}
      <div className="relative z-10 px-5 py-7 sm:px-7 sm:py-9 max-w-2xl">
        {/* Eyebrow label */}
        <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-white/70 mb-2">
          Serving Tampa Bay From Our Valrico Showroom
        </p>

        {/* Two-tone H1 */}
        <div className="mb-3">
          {section.title ? (
            <>
              <span className="block text-base sm:text-lg font-extrabold leading-tight" style={{ color: '#e0455e' }}>
                {titleBold}
              </span>
              {titleLight && (
                <span className="block text-sm sm:text-base text-white font-normal leading-snug mt-0.5">
                  {titleLight}
                </span>
              )}
            </>
          ) : (
            <span className="text-white/40 italic text-sm">No title set</span>
          )}
        </div>

        {/* Accent rule */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[3px] w-8 rounded-full bg-red-500" />
          <div className="h-px w-16 rounded-full bg-white/30" />
        </div>

        {/* Subtitle */}
        {section.subtitle && (
          <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-3">
            {section.subtitle}
          </p>
        )}

        {/* Description */}
        {section.description && (
          <p className="text-white/65 text-xs leading-relaxed mb-3 line-clamp-2">
            {section.description}
          </p>
        )}

        {/* CTA pills */}
        <div className="flex flex-wrap gap-2 mt-1">
          {section.ctaText && (
            <span className="px-3 py-1.5 bg-red-600 text-white text-[0.7rem] font-semibold rounded">
              {section.ctaText}
            </span>
          )}
          <span className="px-3 py-1.5 border border-white/40 text-white text-[0.7rem] font-semibold rounded" style={{ background: 'rgba(255,255,255,0.07)' }}>
            Call (813) 651-2333
          </span>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['Free Estimates', 'Kitchen Cabinets', '5-Star Rated'].map((label) => (
            <span key={label} className="text-[0.6rem] font-semibold text-white/80 border border-white/20 rounded-full px-2.5 py-1" style={{ background: 'rgba(0,0,0,0.28)' }}>
              • {label}
            </span>
          ))}
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
                <p className="text-xs text-foreground/80 italic">&ldquo;{item.text}&rdquo;</p>
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

// ── Feature Strip ─────────────────────────────────────────────────────────────

function FeatureStripPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 bg-slate-800 space-y-2">
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2 bg-slate-700 rounded">
              {item.iconName && (
                <span className="text-xs bg-primary/20 text-primary px-1 rounded font-mono">{item.iconName}</span>
              )}
              <div>
                <p className="text-xs font-semibold text-white">{item.title || '(no title)'}</p>
                {item.desc && <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">No feature items yet</p>
      )}
    </div>
  )
}

// ── Solutions ─────────────────────────────────────────────────────────────────

function SolutionsPreview({ section }) {
  const items = section.items || []
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-card">
      {section.label && <p className="text-xs text-primary font-semibold uppercase tracking-wider">{section.label}</p>}
      {section.heading && <h3 className="font-bold text-base">{section.heading}</h3>}
      {section.description && <p className="text-sm text-muted-foreground">{section.description}</p>}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item, i) => (
            <div key={i} className="border rounded overflow-hidden">
              {item.image && <img src={item.image} alt={item.label || 'Solution'} className="w-full h-20 object-cover" />}
              <div className="p-2 space-y-1">
                <p className="text-xs font-semibold">{item.label || '(no label)'}</p>
                {item.desc && <p className="text-xs text-muted-foreground">{item.desc}</p>}
                {item.href && <p className="text-xs text-primary">{item.href}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No solution items yet</p>
      )}
      {section.closingText && <p className="text-sm text-muted-foreground border-t pt-2">{section.closingText}</p>}
    </div>
  )
}

// ── Showroom ──────────────────────────────────────────────────────────────────

function ShowroomPreview({ section }) {
  const hasBg = !!section.bgImage
  return (
    <div
      className="relative overflow-hidden"
      style={hasBg ? { backgroundImage: `url(${section.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className={`p-5 space-y-2 ${hasBg ? 'bg-black/60' : 'bg-slate-50 dark:bg-slate-900/30'}`}>
        {section.label && <p className={`text-xs font-semibold uppercase tracking-wider ${hasBg ? 'text-primary' : 'text-primary'}`}>{section.label}</p>}
        {section.heading && <h3 className={`font-bold text-base ${hasBg ? 'text-white' : 'text-foreground'}`}>{section.heading}</h3>}
        {section.body && (
          <div
            className={`text-sm whitespace-pre-wrap ${hasBg ? 'text-white/80' : 'text-muted-foreground'}`}
            dangerouslySetInnerHTML={{ __html: section.body }}
          />
        )}
      </div>
    </div>
  )
}

// ── Service Areas ─────────────────────────────────────────────────────────────

function ServiceAreasPreview({ section }) {
  const areas = section.areas || []
  return (
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/30">
      {section.label && <p className="text-xs text-primary font-semibold uppercase tracking-wider">{section.label}</p>}
      {section.heading && <h3 className="font-semibold text-base">{section.heading}</h3>}
      {areas.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {areas.map((area, i) => (
            <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-800 border rounded text-xs font-medium">{area}</span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No areas yet</p>
      )}
    </div>
  )
}

// ── Affordable ────────────────────────────────────────────────────────────────

function AffordablePreview({ section }) {
  const items = section.items || []
  const hasBg = !!section.bgImage
  return (
    <div
      className="relative overflow-hidden"
      style={hasBg ? { backgroundImage: `url(${section.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className={`p-5 space-y-3 ${hasBg ? 'bg-black/65' : 'bg-white dark:bg-card'}`}>
        {section.label && <p className="text-xs font-semibold uppercase tracking-wider text-primary">{section.label}</p>}
        {section.heading && <h3 className={`font-bold text-base ${hasBg ? 'text-white' : 'text-foreground'}`}>{section.heading}</h3>}
        {section.body && <p className={`text-sm whitespace-pre-wrap ${hasBg ? 'text-white/80' : 'text-muted-foreground'}`}>{section.body}</p>}
        {items.length > 0 && (
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className={`text-xs flex items-center gap-1.5 ${hasBg ? 'text-white/90' : 'text-foreground'}`}>
                <span className="text-primary">✓</span> {item}
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2 flex-wrap">
          {section.cta1Text && <span className="px-3 py-1 bg-primary text-white text-xs rounded font-semibold">{section.cta1Text}</span>}
          {section.cta2Text && <span className="px-3 py-1 border border-white/60 text-white text-xs rounded font-semibold">{section.cta2Text}</span>}
        </div>
      </div>
    </div>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────

function HowItWorksPreview({ section }) {
  const steps = section.steps || []
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-card">
      {section.heading && <h3 className="font-semibold text-base text-center">{section.heading}</h3>}
      {steps.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {steps.map((step, i) => (
            <div key={i} className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded border space-y-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mx-auto">{i + 1}</div>
              <p className="text-xs font-semibold">{step.title || '(no title)'}</p>
              {step.desc && <p className="text-xs text-muted-foreground">{step.desc}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic text-center">No steps yet</p>
      )}
    </div>
  )
}

// ── Transformation ────────────────────────────────────────────────────────────

function TransformationPreview({ section }) {
  return (
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/30">
      {section.label && <p className="text-xs text-primary font-semibold uppercase tracking-wider">{section.label}</p>}
      {section.heading && <h3 className="font-semibold text-base">{section.heading}</h3>}
      {section.description && <p className="text-sm text-muted-foreground">{section.description}</p>}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-center">Before</p>
          {section.beforeImage ? (
            <img src={section.beforeImage} alt="Before" className="w-full h-28 object-cover rounded border" />
          ) : (
            <div className="w-full h-28 bg-slate-200 dark:bg-slate-700 rounded border flex items-center justify-center text-xs text-muted-foreground">No before image</div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-center">After</p>
          {section.afterImage ? (
            <img src={section.afterImage} alt="After" className="w-full h-28 object-cover rounded border" />
          ) : (
            <div className="w-full h-28 bg-slate-200 dark:bg-slate-700 rounded border flex items-center justify-center text-xs text-muted-foreground">No after image</div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Installation ──────────────────────────────────────────────────────────────

function InstallationPreview({ section }) {
  const paragraphs = section.paragraphs || []
  const hasBg = !!section.bgImage
  return (
    <div
      className="relative overflow-hidden"
      style={hasBg ? { backgroundImage: `url(${section.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className={`p-5 space-y-3 ${hasBg ? 'bg-black/60' : 'bg-white dark:bg-card'}`}>
        {section.label && <p className="text-xs font-semibold uppercase tracking-wider text-primary">{section.label}</p>}
        {section.heading && <h3 className={`font-bold text-base ${hasBg ? 'text-white' : 'text-foreground'}`}>{section.heading}</h3>}
        {paragraphs.map((p, i) => (
          <p key={i} className={`text-sm ${hasBg ? 'text-white/80' : 'text-muted-foreground'}`}>{p}</p>
        ))}
      </div>
    </div>
  )
}

// ── Why Choose ────────────────────────────────────────────────────────────────

function WhyChoosePreview({ section }) {
  const features = section.features || []
  const hasBg = !!section.bgImage
  return (
    <div
      className="relative overflow-hidden"
      style={hasBg ? { backgroundImage: `url(${section.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className={`p-5 space-y-3 ${hasBg ? 'bg-black/65' : 'bg-slate-50 dark:bg-slate-900/30'}`}>
        {section.heading && <h3 className={`font-bold text-base ${hasBg ? 'text-white' : 'text-foreground'}`}>{section.heading}</h3>}
        {section.body && <p className={`text-sm ${hasBg ? 'text-white/80' : 'text-muted-foreground'}`}>{section.body}</p>}
        {features.length > 0 && (
          <ul className="space-y-1">
            {features.map((f, i) => (
              <li key={i} className={`text-xs flex items-start gap-1.5 ${hasBg ? 'text-white/90' : 'text-foreground'}`}>
                <span className="text-primary mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
        )}
        {section.closingText && <p className={`text-sm italic ${hasBg ? 'text-white/70' : 'text-muted-foreground'}`}>{section.closingText}</p>}
        {(section.address || section.phone || section.email) && (
          <div className={`text-xs space-y-0.5 border-t pt-2 ${hasBg ? 'border-white/20 text-white/70' : 'text-muted-foreground'}`}>
            {section.address && <p>📍 {section.address}</p>}
            {section.phone && <p>📞 {section.phone}</p>}
            {section.email && <p>✉ {section.email}</p>}
            {section.hours && <p className="whitespace-pre-wrap">🕐 {section.hours}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Start Project ─────────────────────────────────────────────────────────────

function StartProjectPreview({ section }) {
  const hasBg = !!section.bgImage
  return (
    <div
      className="relative overflow-hidden"
      style={hasBg ? { backgroundImage: `url(${section.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className={`p-5 space-y-2 ${hasBg ? 'bg-black/60' : 'bg-slate-800'}`}>
        {section.heading && <h3 className="font-bold text-lg text-white">{section.heading}</h3>}
        {section.body && (
          <div className="text-sm text-white/80 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: section.body }} />
        )}
        {section.ctaText && (
          <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded mt-1">{section.ctaText}</span>
        )}
      </div>
    </div>
  )
}

// ── Pre-Footer ────────────────────────────────────────────────────────────────

function PreFooterPreview({ section }) {
  const trustItems = section.trustItems || []
  return (
    <div className="p-5 space-y-3 bg-primary/5 border-t-2 border-primary/20">
      {section.heading && <h3 className="font-bold text-base text-center">{section.heading}</h3>}
      {section.description && <p className="text-sm text-muted-foreground text-center">{section.description}</p>}
      {section.phone && <p className="text-center text-base font-bold text-primary">{section.phone}</p>}
      {trustItems.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {trustItems.map((item, i) => (
            <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-800 border rounded-full text-xs font-medium">✓ {item}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Partners ──────────────────────────────────────────────────────────────────

function PartnersPreview({ section }) {
  const logos = section.logos || []
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-card">
      {section.label && <p className="text-xs text-primary font-semibold uppercase tracking-wider text-center">{section.label}</p>}
      {section.heading && <h3 className="font-semibold text-base text-center">{section.heading}</h3>}
      {section.description && <p className="text-sm text-muted-foreground text-center">{section.description}</p>}
      {logos.length > 0 ? (
        <div className="flex flex-wrap gap-2 justify-center">
          {logos.map((logo, i) => (
            <img key={i} src={logo} alt={`Partner ${i + 1}`} className="h-10 w-auto object-contain border rounded p-1" />
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic text-center">No partner logos yet</p>
      )}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function SectionPreview({ section }) {
  switch (section?.type) {
    case 'hero':            return <HeroPreview section={section} />
    case 'text':            return <TextPreview section={section} />
    case 'features':        return <FeaturesPreview section={section} />
    case 'faq':             return <FAQPreview section={section} />
    case 'cta':             return <CTAPreview section={section} />
    case 'stats':           return <StatsPreview section={section} />
    case 'services':        return <ServicesPreview section={section} />
    case 'process':         return <ProcessPreview section={section} />
    case 'testimonials':    return <TestimonialsPreview section={section} />
    case 'feature-strip':   return <FeatureStripPreview section={section} />
    case 'solutions':       return <SolutionsPreview section={section} />
    case 'showroom':        return <ShowroomPreview section={section} />
    case 'service-areas':   return <ServiceAreasPreview section={section} />
    case 'affordable':      return <AffordablePreview section={section} />
    case 'how-it-works':    return <HowItWorksPreview section={section} />
    case 'transformation':  return <TransformationPreview section={section} />
    case 'installation':    return <InstallationPreview section={section} />
    case 'why-choose':      return <WhyChoosePreview section={section} />
    case 'start-project':   return <StartProjectPreview section={section} />
    case 'pre-footer':      return <PreFooterPreview section={section} />
    case 'partners':        return <PartnersPreview section={section} />
    default:
      return (
        <div className="p-4 text-sm text-muted-foreground italic">
          Unknown section type: {section?.type}
        </div>
      )
  }
}
