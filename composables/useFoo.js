import { useState } from '#app'

export function useA () {
  return 'a'
}

function useB () {
  return 'b'
}

function _useC () {
  return 'c'
}

export const useD = () => {
  return 'damage'
}

export { useB, _useC as useC }

export default function () {
  return useState('foo', () => 'bar')
}
