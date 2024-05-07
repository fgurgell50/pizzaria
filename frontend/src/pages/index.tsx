
import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import { Input } from '../components/ui/Input'

export default function Home() {
  return (
    <>
    <Head>
      <title>Pizzaria - Faça o seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria Rio" ></Image>
      
      <div className={styles.login}>
        <form>
         <Input 
          placeholder="Digite seu Email"
          type="text"
         />

        <Input 
          placeholder="Digite sua Senha"
          type="password"
         />
        </form>
      </div>
    </div>
    </>
  )
}
