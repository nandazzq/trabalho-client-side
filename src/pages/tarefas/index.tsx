import { NavLink } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react'

export function Tarefas() {
    const validacao = z.object({
        titulo: z.string(),
        categoria: z.enum(["Trabalho", "Pessoal", "Urgente"], "Selecione uma categoria."),

    })

    type CadastroFormulario = z.infer<typeof validacao>;


    type Tarefas = CadastroFormulario & {
        id: string;
    };

    const [tarefas, setTarefas] = useState<Tarefas[]>([]);


    useEffect(() => {


        const tarefasArmazenadas = localStorage.getItem('tarefas')

        if (tarefasArmazenadas === null) {
            return setTarefas([])
        }

        setTarefas(JSON.parse(tarefasArmazenadas))
    }, [])




    const formulario = useForm<CadastroFormulario>({
        resolver: zodResolver(validacao) // Conecta o Zod ao formulário
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,

    } = formulario

    const onSubmit = (data: CadastroFormulario) => {

    };


    function submeterFormulario(camposDoFormulario: CadastroFormulario) {

        const novaTarefa = {
            id: Math.random().toString(36).substring(2, 9),
            titulo: camposDoFormulario.titulo,
            categoria: camposDoFormulario.categoria
        };


        setTarefas((oldState) => {
            const novaLista = [...oldState, novaTarefa];
            formulario.reset();
            localStorage.setItem('tarefas', JSON.stringify(novaLista));
            return novaLista;
        });

    }

    function removerTarefa(id: string) {
        const novaLista = tarefas.filter((tarefa) => tarefa.id !== id);

        setTarefas(novaLista);
        localStorage.setItem('tarefas', JSON.stringify(novaLista));
    }



    return (
        <>
            <div className="bg-slate-700 w-[100vw] h-[100vh] flex justify-center items-center flex-col">



                <h1 className="text-[32px] text-blue-500 font-bold">Task Master</h1>
                <form action="" className=" flex justify-center itens-center flex-col gap-[8px] mt-18 rounded-xl" onSubmit={formulario.handleSubmit(submeterFormulario)}>

                    <div className="">

                        <div className="flex gap-[12px] flex-col">
                            <label className="text-white">Titulo: </label>
                            <input type="text" className="bg-white rounded-xl py-2 w-[300px]" {...register('titulo')} />
                            {errors.titulo && <span className="text-red-600 text-[14px]">{errors.titulo.message}</span>}
                        </div>


                        <div className="flex flex-col">
                            <select className="bg-white rounded-xl py-2 w-[300px] mt-3 " {...register("categoria")}>
                                <option className=" " value="">Escolha uma opção</option>
                                <option className="" value="Trabalho">Trabalho</option>
                                <option className="" value="Pessoal">Pessoal</option>
                                <option className="" value="Urgente">Urgente</option>
                            </select>
                            {errors.categoria && <span className="text-red-600 text-[14px]">{errors.categoria.message}</span>}
                        </div>



                    </div >
                    <div className="flex justify-center">
                        <button className="bg-blue-500 rounded-xl py-3 mt-10 w-40 cursor-pointer" >Adicionar Tarefa</button>
                    </div>
                </form>

                <div className="flex flex-col gap-4 w-[320px] mt-8">


                    {tarefas.map((tarefa) => (
                        <div key={tarefa.id} className="bg-slate-100 p-4 rounded-xl border-2 border-slate-600 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-lg">{tarefa.titulo}</span>
                                <span className="text-slate-300 mt-1">
                                    Categoria: {tarefa.categoria}
                                </span>
                            </div>

                            <button onClick={() => removerTarefa(tarefa.id)} className="cursor-pointer">
                                X
                            </button>
                        </div>
                    ))}
                </div>

            </div>



        </>
    )
}