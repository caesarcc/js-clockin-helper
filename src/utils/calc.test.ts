import { describe, expect, it } from 'vitest'
import { calculateExit } from './calc'

describe('calculateExit', () => {
  it('calculates exit correctly for example', () => {
    const res = calculateExit({ entrada: '09:00', saidaAlmoco: '12:00', retornoAlmoco: '13:00', cargaDiaria: '08:00' })
    expect(res.exit).toBe('18:00')
    expect(res.worked).toBe('03:00')
    expect(res.remaining).toBe('05:00')
  })
})
