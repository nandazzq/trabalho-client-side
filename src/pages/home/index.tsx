import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#102b36ad] to-[#17315f] text-white flex flex-col items-center justify-center">

      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl m-8">
          Bem-vindo ao Portal de Ferramentas!
        </h1>

        <p className="bg-white/50 text-[#113c64] p-10 rounded-2xl max-w-xl shadow-2xl">
          Aqui você pode organizar suas tarefas, gerenciar contatos e controlar seus gastos de forma simples e rápida.
          Escolha uma das opções abaixo para começar.
        </p>
      </div>

      <div className="flex justify-center gap-5 mt-10 flex-wrap">
        <NavLink
          to="/tarefas"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg shadow-lg"
        >
          Organizar tarefas
        </NavLink>

        <NavLink
          to="/contato"
          className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg shadow-lg"
        >
          Gerenciar contatos
        </NavLink>

        <NavLink
          to="/gastos"
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg shadow-lg"
        >
          Controle de gastos
        </NavLink>
      </div>

    </div>
  );
}