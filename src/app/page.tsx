'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const checkIfWalletIsConnected = async () => {
    // @ts-ignore
    if (window.ethereum) {
      try {
        // @ts-ignore
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        const ethereumChainId = '0x1'; // ID de la cadena para Ethereum Mainnet

        // Si no está en la red Ethereum, solicitar cambiar
        if (chainId !== ethereumChainId) {
          //@ts-ignore
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethereumChainId }],
          });
        }

        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        setIsConnected(accounts.length > 0);
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  // Función para conectar la cartera
  const connectWallet = async () => {
    // @ts-ignore
    if (window.ethereum) {
      try {
        //@ts-ignore
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        const ethereumChainId = '0x1'; // ID de la cadena para Ethereum Mainnet

        // Si no está en la red Ethereum, solicitar cambiar
        if (chainId !== ethereumChainId) {
          //@ts-ignore
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethereumChainId }],
          });
        }

        // @ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };

  // Efecto para verificar la conexión al cargar el componente
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div key="1" className="flex flex-col min-h-[100vh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            onClick={
              isConnected ? () => router.push('/dashboard') : connectWallet
            }
            className="ml-4 text-sm font-medium text-white bg-blue-600 rounded-md px-4 py-2"
          >
            {isConnected ? 'Dashboard' : 'Login with Web3 Wallet'}
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 bg-gray-800 text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to Unchained AI</h1>
          <p className="max-w-lg mx-auto mt-4 text-gray-300">
            Trade smarter with our advanced artificial intelligence tool.
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 mt-6 px-8 text-sm font-medium text-white"
            href="#1"
          >
            Get Started
          </Link>
        </section>
        <section className="w-full py-12 grid grid-cols-3 gap-4 px-4 lg:px-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <IconLightning className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold">Fast Trades</h3>
            <p className="text-gray-500">
              Experience lightning-fast trading with our AI.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <IconShield className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold">Secure</h3>
            <p className="text-gray-500">Your security is our top priority.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <IconGraph className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold">Profitable</h3>
            <p className="text-gray-500">Maximize your profits with our AI.</p>
          </div>
        </section>
        <section className="w-full py-12 px-4 lg:px-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Coming Soon...
          </h2>
          <div className="flex justify-center">
            <Image
              alt="SAAS dashboard"
              className="rounded-lg shadow-lg"
              height="300"
              src="https://utfs.io/f/d4f1ed98-6b04-4505-a71c-f9ef4cfeaf99-hbvaek.png"
              style={{
                aspectRatio: '600/300',
                objectFit: 'cover',
              }}
              width="600"
            />
          </div>
        </section>
        <section className="w-full py-12 px-4 lg:px-6">
          <h2 className="text-2xl font-bold text-center mb-12" id="1">Roadmap</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-2">
              <IconPhase1 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-bold">Phase 1: Token Launch</h3>
              <p className="text-gray-500 w-1/3 pt-4 ml-12">
                * Develop tokenomics and whitepaper.
              </p>
              <p className="text-gray-500 w-1/3 pt-4 ml-12">
                * Conduct security audits and smart contract verification.
              </p>
              <p className="text-gray-500 w-1/3 pt-4 ml-12">
                * Initiate marketing campaigns for token awareness.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <IconPhase2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-bold">
                Phase 2: Web Application <br></br> Development and Release
              </h3>
              <p className="text-gray-500 w-1/2 pt-4">
                * Design and develop the web application interface.
              </p>
              <p className="text-gray-500 w-1/2 pt-4">
                * Integrate AI trading algorithms and blockchain functionality.
              </p>
              <p className="text-gray-500 w-1/2 pt-4">
                * Perform beta testing with a select user group for feedback.
              </p>
              <p className="text-gray-500 w-1/2 pt-4">
                * Officially launch the web application for public use.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <IconPhase3 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-bold">
                Phase 3: Telegram Bot and <br></br> Web Dashboard Implementation
              </h3>
              <p className="text-gray-500 w-1/2 pt-4">
                * Develop a Telegram bot for trading and monitoring in real
                time.
              </p>
              <p className="text-gray-500 w-1/2 pt-4">
                * Integrate these tools with the existing &apos;Unchained
                AI&apos; platform.
              </p>
              <p className="text-gray-500 w-1/2 pt-4">
                * Create a web dashboard for real-time analytics and user
                account management.
              </p>
              <p className="text-gray-500 w-1/2 pt-4">
                * Provide user support and tutorials for utilizing these new
                features.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700 text-white">
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
        </nav>
        <div className="flex gap-4 mt-4">
          <Link className="text-blue-400" href="#">
            <IconTwitter className="h-5 w-5" />
          </Link>
          <Link
            className="text-blue-400"
            href="https://t.me/+1zH9uduzeZlmOWVk"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="23"
              height="23"
              viewBox="0 0 50 50"
            >
              <path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 34.087891 14.035156 C 33.403891 14.035156 32.635328 14.193578 31.736328 14.517578 C 30.340328 15.020578 13.920734 21.992156 12.052734 22.785156 C 10.984734 23.239156 8.9960938 24.083656 8.9960938 26.097656 C 8.9960938 27.432656 9.7783594 28.3875 11.318359 28.9375 C 12.146359 29.2325 14.112906 29.828578 15.253906 30.142578 C 15.737906 30.275578 16.25225 30.34375 16.78125 30.34375 C 17.81625 30.34375 18.857828 30.085859 19.673828 29.630859 C 19.666828 29.798859 19.671406 29.968672 19.691406 30.138672 C 19.814406 31.188672 20.461875 32.17625 21.421875 32.78125 C 22.049875 33.17725 27.179312 36.614156 27.945312 37.160156 C 29.021313 37.929156 30.210813 38.335938 31.382812 38.335938 C 33.622813 38.335938 34.374328 36.023109 34.736328 34.912109 C 35.261328 33.299109 37.227219 20.182141 37.449219 17.869141 C 37.600219 16.284141 36.939641 14.978953 35.681641 14.376953 C 35.210641 14.149953 34.672891 14.035156 34.087891 14.035156 z M 34.087891 16.035156 C 34.362891 16.035156 34.608406 16.080641 34.816406 16.181641 C 35.289406 16.408641 35.530031 16.914688 35.457031 17.679688 C 35.215031 20.202687 33.253938 33.008969 32.835938 34.292969 C 32.477938 35.390969 32.100813 36.335938 31.382812 36.335938 C 30.664813 36.335938 29.880422 36.08425 29.107422 35.53125 C 28.334422 34.97925 23.201281 31.536891 22.488281 31.087891 C 21.863281 30.693891 21.201813 29.711719 22.132812 28.761719 C 22.899812 27.979719 28.717844 22.332938 29.214844 21.835938 C 29.584844 21.464938 29.411828 21.017578 29.048828 21.017578 C 28.923828 21.017578 28.774141 21.070266 28.619141 21.197266 C 28.011141 21.694266 19.534781 27.366266 18.800781 27.822266 C 18.314781 28.124266 17.56225 28.341797 16.78125 28.341797 C 16.44825 28.341797 16.111109 28.301891 15.787109 28.212891 C 14.659109 27.901891 12.750187 27.322734 11.992188 27.052734 C 11.263188 26.792734 10.998047 26.543656 10.998047 26.097656 C 10.998047 25.463656 11.892938 25.026 12.835938 24.625 C 13.831938 24.202 31.066062 16.883437 32.414062 16.398438 C 33.038062 16.172438 33.608891 16.035156 34.087891 16.035156 z"></path>
            </svg>
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          © Unchained AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function IconPhase1(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function IconLightning(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function IconFinancial(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
}

function IconGraph(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function IconDashboard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function IconLinkedIn(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconPhase2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  );
}

function IconShield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function IconFacebook(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTwitter(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function IconPhase3(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
    </svg>
  );
}
