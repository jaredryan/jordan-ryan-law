import Image from 'next/image';

export default function Page() {
  return (
    <>
      <div className="imageContainer">
        <Image
          src="/pens2.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Classy pen image"
          className="heroImage"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Ryan Legal, PC</h1>
          <h2>Premier provider of the highest quality legal services in Central California</h2>
        </div>
      </div>
      <h1>Home Page</h1>
    </>
  );
}
