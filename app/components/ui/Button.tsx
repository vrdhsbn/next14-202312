import { styled } from '@/styled-system/jsx'
import { MouseEventHandler } from 'react'

export const Button = ({
  onClick,
  disabled,
  children,
}: {
  onClick: MouseEventHandler
  disabled?: boolean
  children: React.ReactNode
}) => {
  return (
    <styled.button
      border={'solid 1px #ccc'}
      borderRadius={'4px'}
      p={'6px 16px'}
      cursor={'pointer'}
      _disabled={{
        color: '#333',
        bg: '#ccc',
        cursor: 'not-allowed',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </styled.button>
  )
}
