const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Check = ({ className = 'h-[18px] w-[18px]' }) => (
  <svg viewBox="0 0 24 24" strokeWidth="2.5" className={className} {...base}><path d="M20 6L9 17l-5-5" /></svg>
)

const paths = {
  alert: <><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></>,
  check: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></>,
  phone: <><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
}

export const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" className="h-5 w-5" {...base}>{paths[name]}</svg>
)
