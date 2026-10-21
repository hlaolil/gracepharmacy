// Mortar-and-pestle "Rx" mark, redrawn from the Grace Pharmacy flyer logo.
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#1F5A6E" />
      <line x1="22" y1="24" x2="35" y2="9" stroke="#8FD0F2" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M9 19h30v2.2c0 7.6-5.8 13.6-13.2 14.3V37h4.7v3.2H17.5V37h4.7v-1.5C14.8 34.8 9 28.8 9 21.2z" fill="#F2F8FC" />
      <text x="24" y="31.2" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="700" fontSize="11" fill="#1F5A6E">Rx</text>
    </svg>
  )
}
