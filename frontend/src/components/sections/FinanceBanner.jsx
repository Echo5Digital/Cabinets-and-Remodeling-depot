'use client'

const ACORN_URL = 'https://www.acornfinance.com/pre-qualify/?d=7NU1B&utm_medium=web_pre_qual_banner'
const ACORN_ALT = 'Acorn Finance apply and get affordable payment options from multiple lenders'

export function FinanceBannerHorizontal({ className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <a href={ACORN_URL} target="_blank" rel="noopener noreferrer">
        <img
          style={{ margin: 10, padding: 1, border: '1px solid #e5e5e5', borderRadius: 5, maxWidth: '100%', height: 'auto' }}
          src="https://fs.acornfinance.com/banners/acorn-finance-banner-easy-payment-options-horizontal-medium.png"
          alt={ACORN_ALT}
        />
      </a>
    </div>
  )
}

export function FinanceBannerVertical({ className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <a href={ACORN_URL} target="_blank" rel="noopener noreferrer">
        <img
          style={{ margin: 10, padding: 1, border: '1px solid #e5e5e5', borderRadius: 5, maxWidth: '100%', height: 'auto' }}
          src="https://fs.acornfinance.com/banners/acorn-finance-banner-easy-payment-options-vertical-medium.png"
          alt={ACORN_ALT}
        />
      </a>
    </div>
  )
}
