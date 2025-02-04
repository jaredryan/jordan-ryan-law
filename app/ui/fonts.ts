import { Libre_Caslon_Text, Charis_SIL, Open_Sans } from 'next/font/google';
 
export const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-opensans',
});

// More modern / less-formal, but still looks good
export const charlesSil = Charis_SIL({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-charles-sil'
});

// // Classier font, just lost out to Charles imo, but will get 2nd opinion
// export const prata = Libre_Caslon_Text({
//     weight: ['400', '700'],
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-charles-sil'
// });
