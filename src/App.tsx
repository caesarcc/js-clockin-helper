import { useEffect, useState } from 'react'
import { calculateExit } from './utils/calc'

export default function App() {
  const [entrada, setEntrada] = useState('09:00')
  const [saidaAlmoco, setSaidaAlmoco] = useState('12:00')
  const [retornoAlmoco, setRetornoAlmoco] = useState('13:00')
  const [cargaDiaria, setCargaDiaria] = useState('08:00')
  const [saidaPrevista, setSaidaPrevista] = useState('18:00')
  const [tempoTrabalhado, setTempoTrabalhado] = useState('03:00')
  const [tempoRestante, setTempoRestante] = useState('05:00')

  useEffect(() => {
    try {
      const { exit, worked, remaining } = calculateExit({
        entrada,
        saidaAlmoco,
        retornoAlmoco,
        cargaDiaria
      })
      setSaidaPrevista(exit)
      setTempoTrabalhado(worked)
      setTempoRestante(remaining)
    } catch (e) {
      // ignore calculation errors for now
    }
  }, [entrada, saidaAlmoco, retornoAlmoco, cargaDiaria])

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-900">
      <main className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-4">Calculadora de Jornada de Trabalho</h1>
        <label className="block mb-2">
          Entrada
          <input
            aria-label="entrada"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            className="mt-1 block w-full rounded border p-2"
          />
        </label>
        <label className="block mb-2">
          Saída para almoço
          <input
            aria-label="saida-almoco"
            value={saidaAlmoco}
            onChange={(e) => setSaidaAlmoco(e.target.value)}
            className="mt-1 block w-full rounded border p-2"
          />
        </label>
        <label className="block mb-2">
          Retorno do almoço
          <input
            aria-label="retorno-almoco"
            value={retornoAlmoco}
            onChange={(e) => setRetornoAlmoco(e.target.value)}
            className="mt-1 block w-full rounded border p-2"
          />
        </label>
        <label className="block mb-4">
          Carga diária
          <input
            aria-label="carga-diaria"
            value={cargaDiaria}
            onChange={(e) => setCargaDiaria(e.target.value)}
            className="mt-1 block w-full rounded border p-2"
          />
        </label>

        <div className="bg-gray-100 rounded p-4">
          <div className="mb-2">Tempo trabalhado: <strong>{tempoTrabalhado}</strong></div>
          <div className="mb-2">Tempo restante: <strong>{tempoRestante}</strong></div>
          <div className="">Saída prevista: <strong>{saidaPrevista}</strong></div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={() => {
              setEntrada('09:00')
              setSaidaAlmoco('12:00')
              setRetornoAlmoco('13:00')
              setCargaDiaria('08:00')
            }}
            className="px-3 py-2 bg-gray-200 rounded"
          >
            Restaurar padrão
          </button>
        </div>
      </main>
    </div>
  )
}
