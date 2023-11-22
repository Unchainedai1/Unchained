'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { ChartComponent } from '@/components/component/Graph';
import { useRouter } from 'next/navigation';

const initialData = [
  { time: '2023-11-22', value: 22.67 },
  { time: '2023-11-23', value: 22.68 },
  { time: '2023-11-24', value: 23.92 },
  { time: '2023-11-25', value: 27.32 },
  { time: '2023-11-26', value: 25.46 },
  { time: '2023-11-27', value: 28.89 },
  { time: '2023-11-28', value: 28.89 },
  { time: '2023-11-29', value: 31.11 },
  { time: '2023-11-30', value: 32.51 },
  { time: '2023-11-31', value: 35.67 },
];

export default function Page() {
  //@ts-ignore
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const checkIfWalletIsConnected = async () => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts.length > 0) {
        setIsConnected(true);
        // Almacena la dirección completa
        setWalletAddress(accounts[0]);
      } else {
        setIsConnected(false);
        router.push('/');
      }
    }
  };

  const disconnectWallet = () => {
    //@ts-ignore
    setIsConnected(false);
    router.push('/');
  };

  const formatWalletAddress = (address: any) => {
    return address
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : '';
  };

  useState(() => {
    checkIfWalletIsConnected();
    //@ts-ignore
  }, []);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-zinc-100/40 lg:block ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <span className="">Unchained AI</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900  transition-all hover:text-zinc-900 "
                href="#"
              >
                <IconHome className="h-4 w-4" />
                Overview
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 "
                href="#"
              >
                <IconPackage className="h-4 w-4" />
                Token Holdings
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900"
                href="#"
              >
                <IconLinechart className="h-4 w-4" />
                P&L Report
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 "
                href="#"
              >
                <IconShoppingcart className="h-4 w-4" />
                Transactions
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 ">
          <Link className="lg:hidden" href="#">
            <IconPackage2 className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 " />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 "
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-zinc-200 w-8 h-8 "
                size="icon"
                variant="ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className=" bg-slate-800 text-white"
            >
              <DropdownMenuLabel>
                {walletAddress
                  ? formatWalletAddress(walletAddress)
                  : 'Not connected'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={disconnectWallet}
                className="hover:cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Total Token Holdings</CardDescription>
                <CardTitle>1,234,567</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>P&L Report</CardDescription>
                <CardTitle>$1,234,567</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Recent Transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>01-01-2023</TableCell>
                      <TableCell>Buy</TableCell>
                      <TableCell>1000</TableCell>
                      <TableCell>Completed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>02-01-2023</TableCell>
                      <TableCell>Sell</TableCell>
                      <TableCell>500</TableCell>
                      <TableCell>Completed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>03-01-2023</TableCell>
                      <TableCell>Buy</TableCell>
                      <TableCell>2000</TableCell>
                      <TableCell>Pending</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>P&L Daily Report</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent data={initialData} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function IconShoppingcart(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function IconLinechart(props: any) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function IconPackage(props: any) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function IconPackage2(props: any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function IconHome(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconSearch(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
