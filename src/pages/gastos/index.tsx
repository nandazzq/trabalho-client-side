import { NavLink } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react'

export function Gastos() {
    const validacao = z.object({
        valor: z.number("O valor digitado não é número").positive("Deve ser maior que 0"),
        descricao: z.string().min(1, "Campo Obrigatório."),


    })

    type CadastroFormulario = z.infer<typeof validacao>;


    const [saldo, setsaldo] = useState<CadastroFormulario[]>([]);


    const saldoTotal = saldo.reduce((somador, transacao) => {
        return somador + transacao.valor;
    }, 0);

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

        setsaldo((oldState) => [...oldState, data]);
        reset();

    };

    return (
        <>
            <div className="bg-slate-700 w-[100vw] h-[100vh] flex justify-center items-center flex-col">

                <div className="flex flex-col">
                    <span className="text-white font-[18px]">Saldo Total: R$ {saldoTotal}</span>
                </div>

                <h1 className="text-[32px] text-blue-500 font-bold">Money Flow</h1>
                <form action="" className=" flex justify-center itens-center flex-col gap-[8px] mt-18 rounded-xl" onSubmit={handleSubmit(onSubmit)}>

                    <div>

                        <div className="flex gap-[12px] flex-col">
                            <label className="text-white">Valor: </label>
                            <input type="number" className="bg-white rounded-xl py-2 w-[300px]" {...register('valor', { valueAsNumber: true })} />
                            {errors.valor && <span className="text-red-600 text-[14px]">{errors.valor.message}</span>}
                        </div>


                        <div className="flex gap-[12px] flex-col">
                            <label className="text-white">Descrição: </label>
                            <input type="text" className="bg-white rounded-xl py-2 w-[300px]"  {...register('descricao')} />
                            {errors.descricao && <span className="text-red-600 text-[14px]">{errors.descricao.message}</span>}
                        </div>



                    </div >
                    <div className="flex justify-center">
                        <button className="bg-blue-500 rounded-xl py-3 mt-10 w-30 cursor-pointer" >Enviar</button>
                    </div>
                </form>
            </div>
        </>
    )
}