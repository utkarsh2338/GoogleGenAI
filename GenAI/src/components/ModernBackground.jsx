export function ModernBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-400/20" />
      
      {/* Animated floating circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-indigo-400/25 to-blue-300/25 rounded-full blur-2xl animate-pulse delay-500" />
      
      {/* Geometric path elements */}
      <div className="absolute inset-0">
        {/* Career path lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Curved path representing career journey */}
          <path
            d="M50,600 Q300,400 600,350 T1150,200"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
          />
          
          {/* Milestone circles */}
          <circle cx="50" cy="600" r="8" fill="#60A5FA" opacity="0.7" />
          <circle cx="300" cy="450" r="10" fill="#A78BFA" opacity="0.6" />
          <circle cx="600" cy="350" r="12" fill="#F472B6" opacity="0.5" />
          <circle cx="900" cy="280" r="10" fill="#34D399" opacity="0.6" />
          <circle cx="1150" cy="200" r="8" fill="#FBBF24" opacity="0.7" />
        </svg>
      </div>
      
      {/* Modern grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-8 h-full w-full p-8">
          {Array.from({ length: 84 }, (_, i) => (
            <div
              key={i}
              className="border border-white/20 rounded-lg"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'fadeInScale 3s ease-in-out infinite alternate'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating career icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Abstract career symbols */}
        <div className="absolute top-1/5 left-1/5 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-xl rotate-12 animate-bounce delay-300" />
        <div className="absolute top-2/3 left-3/4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-300/20 rounded-full animate-bounce delay-700" />
        <div className="absolute bottom-1/3 left-1/6 w-20 h-8 bg-gradient-to-r from-indigo-400/20 to-blue-300/20 rounded-full rotate-45 animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/5 w-14 h-14 bg-gradient-to-br from-emerald-400/20 to-teal-300/20 rounded-lg -rotate-12 animate-bounce delay-500" />
      </div>
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}