import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextaAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps ) {
    return(
        <input className={styles.input}  {...rest} />
    )
}

export function TextArea({...rest}: TextaAreaProps ) {
    return(
        <textarea className={styles.input} {...rest}  ></textarea>
    )
}