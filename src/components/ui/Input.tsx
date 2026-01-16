/**
 * Input Component
 * Form Input mit Labels und Error-Handling
 */

import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const id = props.id || `input-${Math.random()}`

    return (
      <div className="input__wrapper">
        {label && (
          <label htmlFor={id} className="input__label">
            {label}
            {props.required && <span className="input__required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`input ${error ? 'input--error' : ''} ${className || ''}`}
          {...props}
        />
        {error && <span className="input__error">{error}</span>}
        {helperText && !error && <span className="input__hint">{helperText}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ===== TEXTAREA =====

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const id = props.id || `textarea-${Math.random()}`

    return (
      <div className="input__wrapper">
        {label && (
          <label htmlFor={id} className="input__label">
            {label}
            {props.required && <span className="input__required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`input input--textarea ${error ? 'input--error' : ''} ${className || ''}`}
          {...props}
        />
        {error && <span className="input__error">{error}</span>}
        {helperText && !error && <span className="input__hint">{helperText}</span>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

// ===== SELECT =====

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, ...props }, ref) => {
    const id = props.id || `select-${Math.random()}`

    return (
      <div className="input__wrapper">
        {label && (
          <label htmlFor={id} className="input__label">
            {label}
            {props.required && <span className="input__required">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`input input--select ${error ? 'input--error' : ''} ${className || ''}`}
          {...props}
        >
          <option value="">Wählen Sie eine Option...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="input__error">{error}</span>}
        {helperText && !error && <span className="input__hint">{helperText}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'
