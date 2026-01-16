/**
 * Card Component
 * Basis-Komponente für Content-Boxen
 */

import React from 'react'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline'
  hoverable?: boolean
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hoverable = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card card--${variant} ${hoverable ? 'card--hoverable' : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// ===== CARD SUBCOMPONENTS =====

export const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card__header ${className || ''}`} {...props}>
    {children}
  </div>
)

export const CardBody = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card__body ${className || ''}`} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card__footer ${className || ''}`} {...props}>
    {children}
  </div>
)

export const CardImage = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={src} alt={alt} className={`card__image ${className || ''}`} {...props} />
)
