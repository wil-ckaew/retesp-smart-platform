// frontend-web/src/app/test/page.tsx
export default function TestPage() {
  return (
    <div style={{ backgroundColor: 'blue', color: 'white', padding: '20px', borderRadius: '8px', margin: '20px' }}>
      <h1>Teste Básico</h1>
      <p>Se você ver fundo azul e texto branco, o HTML básico está funcionando.</p>
      <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
        Teste inline styles
      </div>
    </div>
  );
}