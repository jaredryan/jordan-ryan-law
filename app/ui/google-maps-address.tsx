'use client'

import {
    APIProvider,
    InfoWindow,
    Marker,
    Map,
    ColorScheme,
} from '@vis.gl/react-google-maps'
import '@/app/ui/google-maps-address.css'

export function stub() {
    return <div style={{width: '100%', height: '400px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: 'white', backgroundColor: 'black' }}>Google Maps section</h2>
    </div>
}

const latAndLong = { lat: 36.81224531879936, lng: -119.80423819568016 }

export default function GoogleMapsAddress() {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
            <div className="googleMapsComponent">
                <Map
                    defaultZoom={13}
                    defaultCenter={latAndLong}
                    mapId={'DEMO_MAP_ID'}
                    style={{ width: '100%', height: 'auto' }}
                    colorScheme={ColorScheme.FOLLOW_SYSTEM}
                >
                    <Marker
                        key="officeMarker"
                        position={latAndLong}
                    />
                    <InfoWindow
                        onCloseClick={() => {}}
                        pixelOffset={[0, -24]}
                        position={latAndLong}
                        ariaLabel="Legal, PC office location with link to getting directions on Google Maps"
                    >
                            <h2>Ryan Legal, PC</h2>
                            <a
                                href="https://www.google.com/maps/place/5200+N+Palm+Ave+%23306,+Fresno,+CA+93704/@36.8115688,-119.8070387,17z/data=!3m1!4b1!4m6!3m5!1s0x809467ecc3fedb5d:0xed90dea4b3e0c483!8m2!3d36.8115645!4d-119.8044638!16s%2Fg%2F11qpw25lwf?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
                                target='_blank'
                                aria-label='Get directions to the Ryan Legal, PC office on Google Maps.'   
                            >
                                Get Directions
                            </a>
                    </InfoWindow>
                </Map>
            </div>
        </APIProvider>
    )
}
