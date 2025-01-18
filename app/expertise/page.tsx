import Image from 'next/image';
import '@/app/ui/expertise.css';

export default function Page() {
  return (
    <div className="expertisePage">
      <div className="imageContainer">
        <Image
          src="/practice.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Legal System Image"
          className="bannerImage"
          loading="eager"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Expertise</h1>
        </div>
      </div>
      <div className="contentSection">
        <h2>Real Estate</h2>
        <p>Ryan Legal, PC, real estate practice encompasses a variety of transactions (purchase, sale and escrow), organization of real estate development ventures and representation of borrowers and lenders in transactions for commercial, office, industrial and residential projects. MMWB&R also represents clients before local and state governmental agencies on regulatory matters (with particular focus on real estate development entitlements and public contract disputes) and in land use transactions and disputes with governmental agencies. (See also “Eminent Domain and Inverse Condemnation,” below.)</p>
      </div>
    </div>
  );
}
