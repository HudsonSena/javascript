import { useState } from 'react';
import './styles/global.css';

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

const createUserFormSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres')
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function App() {
  const [output, setOutput] = useState('')
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <main className='h-screen bg-zinc-50 flex flex-col gap-10 items-center justify-center' >
        <form
          onSubmit={handleSubmit(createUser)}
          className='flex flex-col gap-4 w-full max-w-xs'>

          <h1 className='flex items-center justify-center text-2xl mb-5'>Form Class</h1>

          <div className='flex flex-col gap-1'>
            <label htmlFor="iemail">E-mail</label>
            <input
              type="email"
              id="iemail"
              className='border border-zinc-200 shadow-sm rounded h-10 p-2 items-center'
              placeholder='exemplo@email.com'
              {...register('email')}
            />
            {errors.email && <span>{errors.email.message}</span>} 
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="ipassword">Senha</label>
            <input
              type="password"
              id="ipassword"
              className='border border-zinc-200 shadow-sm rounded h-10 p-2 items-center'
              {...register('password')}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button 
            type='submit'
            className='bg-emerald-500 rounded font-semibold text-white h-10'
          >
            Save
          </button>
        </form>
        <pre>{output}</pre>
      </main>
    </>
  )
}

export default App