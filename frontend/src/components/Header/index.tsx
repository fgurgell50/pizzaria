import { useContext } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FiLogOut } from 'react-icons/fi' 
import { AuthContext } from '@/src/contexts/AuthContext'

export function Header(){

    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image src='/logo.svg' alt='Pizzaria' width={190} height={60} />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href='/category'  legacyBehavior>
                        <a>Categoria</a>
                    </Link>
                    <Link href='/product' legacyBehavior>
                        <a>Cardápio</a>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}