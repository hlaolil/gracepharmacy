// Placeholder Healing Hub mark: a white medical cross with a small leaf, on green.
// Swap for the pharmacy's own logo artwork when it is available.
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#1E5B4A" />
      <rect x="19" y="10" width="10" height="28" rx="2.5" fill="#F3F8F5" />
      <rect x="10" y="19" width="28" height="10" rx="2.5" fill="#F3F8F5" />
      <path d="M31 17c0-5 3.5-8.5 8.5-8.5 0 5-3.5 8.5-8.5 8.5z" fill="#9FDDB9" />
    </svg>
  )
}
