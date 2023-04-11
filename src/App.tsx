function App() {
  return (
    <div className="App">
      <header className="mt-20 text-center text-pink-600 font-extrabold text-4xl tracking-tight">
        CRA-TEMPLATE-SMEGALO
      </header>
      <div className="mt-10 text-center text-blue-400 font-extrabold text-xl tracking-tight">
        <div>使用框架</div>
        <div className="mb-2">
          <a
            href="https://github.com/facebook/create-react-app"
            className="underline"
          >
            create-react-app@5
          </a>
        </div>
        <div className="mb-2">
          <a href="https://github.com/dilanx/craco" className="underline">
            @craco/craco@7
          </a>
        </div>
        <div className="mb-2">
          <a
            href="https://tailwindcss.com/docs/installation/using-postcss"
            className="underline"
          >
            tailwindcss@3
          </a>
        </div>
        <div className="mb-2">
          <a href="https://github.com/webpack/webpack" className="underline">
            webpack@5
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
