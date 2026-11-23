import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/**
 * Subtle 3D tilt that follows the pointer (mouse only).
 * Touch devices and reduced-motion users get a static card.
 */
export default function TiltCard({ children, className = '', max = 6, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 200, damping: 22 })
  const sy = useSpring(my, { stiffness: 200, damping: 22 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])

  const Comp = motion[as]

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <Comp
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      {...rest}
    >
      {children}
      {!reduce && (
        <motion.span
          className="tilt__glare"
          aria-hidden="true"
          style={{ '--gx': glareX, '--gy': glareY }}
        />
      )}
    </Comp>
  )
}
