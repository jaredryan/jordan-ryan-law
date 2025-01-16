import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image
        src="/hero-desktop.png"
        width={400}
        height={304}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={336}
        height={372}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
      <h1>Home Page</h1>
    </div>
  );
}
