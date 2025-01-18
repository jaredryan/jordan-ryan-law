import Image from 'next/image';
import '@/app/ui/about.css';

export default function Page() {
  return (
    <div className="aboutPage">
      <div className="imageContainer">
        <Image
          src="/attorney-writing.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Attorneys Writing Image"
          className="bannerImage"
        />
        <div className="after" />
        <div className="imageText">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="contentSection">
        <h2>Russ Ryan</h2>
        <p>Russ is a star lawyer. Here's his pic.</p>
        <Image
          src="/profile.jpg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Russ Ryan Image"
          className="profileImage"
        />
        <p>Check out his various accolades.</p>
        <Image
          src="/av-preeminent.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="AV Preeminent Image"
          className="avPreeminentBadge"
        />
        <Image
          src="/super-lawyers-badge.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Super Lawyers Badge Image"
          className="superLawyersBadge"
        />
        <h2>Crystal Brightwell</h2>
        <p>Crystal is a star secretary / paralegal.</p>
      </div>
    </div>
  );
}
