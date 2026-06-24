export function parseTime(t: string) {
  const m = t.match(/^(\d{1,2}):(\d{2})$/)
  if (!m) throw new Error('Horário inválido')
  const h = parseInt(m[1], 10)
  const min = parseInt(m[2], 10)
  if (h > 23 || min > 59) throw new Error('Horário inválido')
  return h * 60 + min
}

export function formatTime(totalMinutes: number) {
  const m = ((totalMinutes % 1440) + 1440) % 1440 // normalize
  const h = Math.floor(m / 60)
  const min = m % 60
  return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
}

export function calculateExit({ entrada, saidaAlmoco, retornoAlmoco, cargaDiaria }: { entrada: string; saidaAlmoco: string; retornoAlmoco: string; cargaDiaria: string }) {
  const entradaMin = parseTime(entrada)
  const saidaMin = parseTime(saidaAlmoco)
  const retornoMin = parseTime(retornoAlmoco)
  const cargaMin = parseTime(cargaDiaria)

  if (saidaMin < entradaMin) throw new Error('Saída para almoço não pode ser anterior à entrada')
  if (retornoMin < saidaMin) throw new Error('Retorno de almoço não pode ser anterior à saída')
  if (cargaMin <= 0) throw new Error('Carga horária inválida')

  const workedBeforeLunch = saidaMin - entradaMin
  const remaining = cargaMin - workedBeforeLunch
  const exit = retornoMin + remaining

  return {
    exit: formatTime(exit),
    worked: formatTime(workedBeforeLunch),
    remaining: formatTime(remaining)
  }
}
