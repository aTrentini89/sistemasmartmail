'use server'

import { redirect } from 'next/navigation'

export async function sendEmail(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  // Aqui você normalmente usaria um serviço de e-mail real
  console.log('Enviando e-mail:', { name, email, message })

  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simula um envio bem-sucedido
  console.log('E-mail enviado com sucesso!')

  // Redireciona para uma página de agradecimento
  redirect('/obrigado')
}

