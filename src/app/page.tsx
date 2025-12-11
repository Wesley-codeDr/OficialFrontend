export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          WellWave Frontend
        </h1>
        <p className="text-center text-lg text-muted-foreground">
          Sistema de Anamnese Digital para Emergências
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Anamnese Digital</h2>
            <p className="text-sm text-muted-foreground">
              Geração de texto médico a partir de checkboxes
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Red Flags</h2>
            <p className="text-sm text-muted-foreground">
              Alertas automáticos para sinais críticos
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Chat EBM</h2>
            <p className="text-sm text-muted-foreground">
              Assistente de IA para consultas baseadas em evidências
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
