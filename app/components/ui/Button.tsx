import { styled } from '@/styled-system/jsx'
import { MouseEventHandler } from 'react'

export const Button = ({
  onClick,
  children,
}: { onClick: MouseEventHandler; children: React.ReactNode }) => {
  return (
    <styled.button
      border={'solid 1px #ccc'}
      borderRadius={'4px'}
      p={'4px'}
      onClick={onClick}
    >
      {children}
    </styled.button>
  )
}
