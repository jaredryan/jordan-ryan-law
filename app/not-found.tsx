'use client'


import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Custom500() {
    return (
        <div className="errorPage pagePadding">
            <div className="iconContainer" aria-label="Crossed-out Magnifying Glass">
                <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                <div className="icon xMark"><FontAwesomeIcon icon={faXmark} /></div>
            </div>
            <h2>Page not found</h2>
            <p>We&apos;re looking into it. Please go back to the Home page and try again.</p>
            <div className="buttonContainer">
                <Link href="/" className="button">Home</Link>
            </div>
        </div>
    )
}
