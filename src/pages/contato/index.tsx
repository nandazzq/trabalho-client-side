import { NavLink } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function Contato() {
    const validacao = z.object({
        nome: z.string().min(3, "O nome de usuário deve ter no minímo 3 caracteres.").max(16, 'O nome de usuário deve ter no máximo 16 caracteres.'),
        email: z.email("Email inválido, digite um Email válido.").min(1, "Campo Obrigatório."),
        telefone: z.string().min(1, "Campo Obrigatório.").regex(/^\d+$/, " ERRO. Deve conter apenas números."),

    })

    type CadastroFormulario = z.infer<typeof validacao>;

    


    const formulario = useForm<CadastroFormulario>({
        resolver: zodResolver(validacao) // Conecta o Zod ao formulário
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = formulario

    const onSubmit = (data: CadastroFormulario) => {
        alert(`Bem-vindo(a), ${data.nome}!`);
    };

    return (
        <>
            <div className="bg-slate-700 w-[100vw] h-[100vh] flex justify-center items-center flex-col">

                <h1 className="text-[32px] text-blue-500 font-bold">Connect Hub</h1>
                <form action="" className=" flex justify-center itens-center flex-col gap-[8px] mt-18" onSubmit={handleSubmit(onSubmit)}>
                    
                <div>

                    <div className="flex gap-[12px] flex-col">
                        <label className="text-white">Nome: </label>
                        <input type="text" className="bg-white rounded-xl py-2 w-[300px]"  {...register('nome')}/>
                        {errors.nome && <span className="text-red-600 text-[14px]">{errors.nome.message}</span>}
                    </div>


                    <div className="flex gap-[12px] flex-col">
                        <label className="text-white">Email: </label>
                        <input type="text" className="bg-white rounded-xl py-2 w-[300px]"  {...register('email')}/>
                        {errors.email && <span className="text-red-600 text-[14px]">{errors.email.message}</span>}
                    </div>

                    <div className="flex gap-[12px] flex-col">
                        <label className="text-white">Telefone: </label>
                        <input type="text" className="bg-white rounded-xl py-2 w-[300px] "  {...register('telefone')}/>
                        {errors.telefone && <span className="text-red-600 text-[14px]">{errors.telefone.message}</span>}
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