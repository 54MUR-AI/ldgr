import { useEffect, useState } from 'react'

interface Ember {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  color: string
  depthLayer: number
}

export default function FloatingEmbers() {
  const [embers, setEmbers] = useState<Ember[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const emberCount = isMobile ? 12 : 25
    const newEmbers: Ember[] = []
    
    for (let i = 0; i < emberCount; i++) {
      const size = 3 + Math.random() * 7
      const duration = 12 + (size / 10) * 20 + Math.random() * 8
      const changeRate = Math.random()
      
      const colorIntensity = Math.min(changeRate / 1.5, 1)
      const red = 230
      const green = Math.floor(57 + (colorIntensity * 198))
      const blue = Math.floor(70 + (colorIntensity * 185))
      const color = `rgb(${red}, ${green}, ${blue})`
      
      const depthRoll = Math.random()
      const depthLayer = depthRoll < 0.3 ? 0 : depthRoll < 0.8 ? 1 : 2
      
      newEmbers.push({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * duration,
        duration: duration,
        size: size,
        color: color,
        depthLayer: depthLayer
      })
    }
    
    setEmbers(newEmbers)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {embers.map((ember) => {
        const depthOpacity = ember.depthLayer === 2 ? 1.0 : ember.depthLayer === 1 ? 0.85 : 0.7
        const depthScale = ember.depthLayer === 2 ? 1.0 : ember.depthLayer === 1 ? 0.9 : 0.8
        
        return (
          <div
            key={ember.id}
            className="absolute animate-float"
            style={{
              left: `${ember.left}%`,
              bottom: '0px',
              zIndex: ember.depthLayer,
              animation: `float ${ember.duration}s linear ${ember.delay}s infinite`,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${ember.size * depthScale}px`,
                height: `${ember.size * depthScale}px`,
                backgroundColor: ember.color,
                opacity: depthOpacity * 0.8,
                boxShadow: `0 0 ${ember.size * 3}px ${ember.color}`,
              }}
            />
          </div>
        )
      })}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) translateX(${Math.random() * 100 - 50}px) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) translateX(0) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
