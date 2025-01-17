import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image
        src="/attorney-writing.png"
        width={800}
        height={400}
        alt="Screenshots of the dashboard project showing desktop version"
      />
      {/* <Image
        src="/hero-mobile.png"
        width={336}
        height={372}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      /> */}
      <h1>Home Page</h1>
    </div>
  );
}
