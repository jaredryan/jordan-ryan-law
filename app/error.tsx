'use client'


import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function Custom500() {
    const router = useRouter()

    return <>
        <div className="stubNavbarBackground" />
        <div className="errorPage pagePadding">
            <div className="icon"><FontAwesomeIcon icon={faCircleXmark} /></div>
            <h2>Something went wrong</h2>
            <p>We&apos;re looking into it. Please refresh or go back to the Home page.</p>
            <p>
                If you were filling out the Request Consultation form, copy and paste the current url in the browser.
                There is a chance your progress was saved.
            </p>
            <div className="buttonContainer">
                <Link href="/" className="button">Home</Link>
                <button onClick={() => router.refresh()}>Refresh</button>
            </div>
        </div>
    </>
}
