
import Head from "next/head"
import Image from "next/image"
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from "../../components/ui/Button"

import Link from 'next/link';

export default function SignUp() {
  return (
    <>
    <Head>
      <title>Faça o seu cadastro agora</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria Rio" ></Image>
      
      <div className={styles.login}>
        <h1>Criando sua Conta</h1>
        <form>


        <Input 
          placeholder="Digite seu nome"
          type="text"
         />

         <Input 
          placeholder="Digite seu Email"
          type="text"
         />

        <Input 
          placeholder="Digite sua Senha"
          type="password"
         />

        <Button
          type="submit"
          loading={false}
          >
            Cadastrar
        </Button>

        </form>

        <Link href="/" className={styles.text}>
          Já possui uma conta faça o login.
        </Link>


      </div>
    </div>
    </>
  )
}
