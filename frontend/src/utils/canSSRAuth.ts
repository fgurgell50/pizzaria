import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/error/AuthTokenError'; 

// Função HOC para páginas que só podem ser acessadas por usuários logados
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);
    const token = cookies['@nextauth.token'];

    // Se o usuário tentar acessar a página, mas não tem token, redirecionamos
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      };
    }

    try {
      // Chama a função passada como argumento
      return await fn(ctx);
    } catch (err) {
      // Se houver um erro de autenticação, destruir o cookie e redirecionar
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@nextauth.token');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        };
      }

      // Lança o erro para que outras exceções sejam tratadas de forma adequada
      throw err;
    }

    // Adiciona um return vazio no final para garantir que sempre haja um retorno
    return {
      notFound: true,
    };
  }
}
