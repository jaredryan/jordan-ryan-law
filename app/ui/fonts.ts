import { Prata, Open_Sans } from 'next/font/google';
 
export const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-opensans',
});

export const prata = Prata({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-prata'
});
