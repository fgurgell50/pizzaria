import { FormEvent, useState , useContext} from "react"
import Head from "next/head"
import Image from "next/image"
import styles from '../../../styles/home.module.scss'
import { toast } from "react-toastify"
import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from "../../components/ui/Button"

import { AuthContext } from "@/src/contexts/AuthContext"

import Link from 'next/link';

export default function SignUp() {

  const { signUp } = useContext(AuthContext)

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword] = useState("")
  const [ loading, setLoading ] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault()

    if(name === '' || email === '' || password === ''){
      toast.warning("Preencha os campos!")
      return
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    signUp(data)

    setLoading(false)

  }

  return (
    <>
    <Head>
      <title>Faça o seu cadastro agora</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria Rio" ></Image>
      
      <div className={styles.login}>
        <h1>Criando sua Conta</h1>
        <form onSubmit={handleSignUp}>
        <Input 
          placeholder="Digite seu nome"
          type="text"
          value={name}
          onChange={ (e) => setName(e.target.value) }
         />

         <Input 
          placeholder="Digite seu Email"
          type="text"
          value={email}
          onChange={ (e) => setEmail(e.target.value) }
         />

        <Input 
          placeholder="Digite sua Senha"
          type="password"
          value={password}
          onChange={ (e) => setPassword(e.target.value) }
         />

        <Button
          type="submit"
          loading={loading}
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
