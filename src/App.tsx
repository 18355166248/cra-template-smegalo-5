function App() {
  return (
    <div className="App">
      <header className="mt-40 text-center text-pink-600 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight dark:text-white">
        CRA-TEMPLATE-SMEGALO
      </header>
      <div className="mt-20 text-center text-blue-400 font-extrabold text-xl sm:text-xl lg:text-xl tracking-tight dark:text-white">
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
