import React from 'react';

interface ImamCrestLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const ImamCrestLogo: React.FC<ImamCrestLogoProps> = ({
  className = '',
  size = 64,
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <filter id="crestGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Heraldic Shield Outline with Split Dual-Color Border */}
        {/* Base Inner Shield */}
        <path
          d="M 120 18 Q 185 18 198 82 Q 198 175 120 226 Q 42 175 42 82 Q 55 18 120 18 Z"
          fill="url(#shieldGrad)"
          stroke="#CBD5E1"
          strokeWidth="2"
        />

        {/* Top-Left Border: Royal Blue (#0062B1) */}
        <path
          d="M 120 16 Q 52 16 40 82 Q 40 140 75 185"
          fill="none"
          stroke="#0062B1"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Top-Right Border: Crimson Red (#E30613) */}
        <path
          d="M 120 16 Q 188 16 200 82 Q 200 140 165 185"
          fill="none"
          stroke="#E30613"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Bottom-Left Border: Crimson Red (#E30613) */}
        <path
          d="M 75 185 Q 120 228 120 228"
          fill="none"
          stroke="#E30613"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Bottom-Right Border: Royal Blue (#0062B1) */}
        <path
          d="M 165 185 Q 120 228 120 228"
          fill="none"
          stroke="#0062B1"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Crest Crown: Black Mortarboard Cap resting on Crimson Book */}
        <g transform="translate(120, 36) scale(0.9)">
          {/* Mortarboard Diamond */}
          <polygon points="0,-16 26,-7 0,2 -26,-7" fill="#0A0F1D" />
          {/* Cap Skull cap */}
          <path d="M -12,-5 L -12,4 Q 0,11 12,4 L 12,-5 Z" fill="#1E293B" />
          {/* Cap Tassel */}
          <path d="M 0,-7 Q 16,-4 20,6" fill="none" stroke="#D97706" strokeWidth="2" />
          <circle cx="20" cy="8" r="2.5" fill="#D97706" />

          {/* Crimson Red Book */}
          <path
            d="M -22,7 Q 0,4 22,7 L 20,13 Q 0,9 -20,13 Z"
            fill="#E30613"
          />
          <path
            d="M -18,10 Q 0,7 18,10"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </g>

        {/* Motto: "Trust in Quality Education" in Crimson Red */}
        <text
          x="120"
          y="63"
          textAnchor="middle"
          fill="#E30613"
          fontSize="7.5"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.4"
        >
          TRUST IN QUALITY EDUCATION
        </text>

        {/* Flanking Human Figures (Left & Right) */}
        {/* Left Flanking Swoosh Figure (Blue/Red) */}
        <circle cx="56" cy="86" r="4.5" fill="#E30613" />
        <path
          d="M 56 94 Q 48 115 57 145"
          fill="none"
          stroke="#0062B1"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Right Flanking Swoosh Figure (Blue/Red) */}
        <circle cx="184" cy="86" r="4.5" fill="#E30613" />
        <path
          d="M 184 94 Q 192 115 183 145"
          fill="none"
          stroke="#0062B1"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Center 2x2 Quadrant Grid */}
        <g transform="translate(75, 78)">
          {/* Top-Left Quadrant: Crimson Red Square with Graduation Cap */}
          <rect x="0" y="0" width="43" height="43" rx="4" fill="#E30613" />
          <g transform="translate(21.5, 21.5) scale(0.65)">
            <polygon points="0,-14 20,-5 0,4 -20,-5" fill="#FFFFFF" />
            <path d="M -10,-3 L -10,6 Q 0,11 10,6 L 10,-3 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M 0,-5 L 16,3" stroke="#F8FAFC" strokeWidth="1.8" />
          </g>

          {/* Top-Right Quadrant: Royal Blue Square with Caduceus Staff */}
          <rect x="47" y="0" width="43" height="43" rx="4" fill="#0062B1" />
          <g transform="translate(68.5, 21.5) scale(0.7)">
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="-16" r="2.5" fill="#FFFFFF" />
            {/* Wing details */}
            <path d="M -10,-13 Q -2,-17 0,-14 Q 2,-17 10,-13" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            {/* Intertwined Serpents */}
            <path
              d="M -7,-8 Q 0,-5 7,-2 Q 0,2 -7,5 Q 0,9 7,12"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Bottom-Left Quadrant: Royal Blue Square with Clinical Stethoscope */}
          <rect x="0" y="47" width="43" height="43" rx="4" fill="#0062B1" />
          <g transform="translate(21.5, 68.5) scale(0.7)">
            {/* Stethoscope binaural & bell */}
            <path
              d="M -8,-14 L -8,-7 Q -8,3 0,5 Q 8,3 8,-7 L 8,-14"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M 0,5 L 0,10 Q 0,15 6,15 L 7,15"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="9" cy="15" r="3.5" fill="#FFFFFF" />
            <circle cx="-8" cy="-14" r="1.5" fill="#FFFFFF" />
            <circle cx="8" cy="-14" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Bottom-Right Quadrant: Crimson Red Square with Erlenmeyer Flask */}
          <rect x="47" y="47" width="43" height="43" rx="4" fill="#E30613" />
          <g transform="translate(68.5, 68.5) scale(0.7)">
            {/* Erlenmeyer Flask */}
            <path
              d="M -3,-14 L 3,-14 L 3,-6 L 12,12 Q 13,15 9,15 L -9,15 Q -13,15 -12,12 L -3,-6 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Fluid level */}
            <path
              d="M -8,8 Q 0,6 8,8 L 10,13 L -10,13 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
            <circle cx="-1" cy="2" r="1" fill="#FFFFFF" />
            <circle cx="2" cy="-1" r="1.2" fill="#FFFFFF" />
          </g>
        </g>

        {/* Bottom Curved Ribbon Banner: Royal Blue (#0062B1) */}
        <g transform="translate(120, 208)">
          <path
            d="M -102,-6 Q 0,-14 102,-6 L 108,18 Q 0,12 -108,18 Z"
            fill="#0062B1"
            filter="url(#crestGlow)"
          />
          <path
            d="M -102,-6 Q 0,-14 102,-6 L 108,18 Q 0,12 -108,18 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Banner Main Title */}
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            letterSpacing="1"
          >
            IMAM INSTITUTE
          </text>

          {/* Banner Subtitle */}
          <text
            x="0"
            y="12.5"
            textAnchor="middle"
            fill="#F8FAFC"
            fontSize="4.4"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.3"
          >
            OF NURSING & ALLIED HEALTH SCIENCES & PARAMEDICAL
          </text>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-tight text-imam-navy text-base leading-tight uppercase font-sans">
            Imam Institute
          </span>
          <span className="text-[11px] font-semibold text-imam-blue leading-tight uppercase tracking-wider">
            Nursing & Allied Health Sciences
          </span>
          <span className="text-[9.5px] font-medium text-slate-500 leading-tight">
            Affiliated: Imam Medical Center
          </span>
        </div>
      )}
    </div>
  );
};
