import {
    APIProvider,
    InfoWindow,
    Marker,
    Map,
    ColorScheme,
} from '@vis.gl/react-google-maps';
import '@/app/ui/google-maps-address.css';

// export function stub() {
//     return <div style={{width: '100%', height: '400px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <h2 style={{ color: 'white', backgroundColor: 'black' }}>Google Maps section</h2>
//     </div>
// }

export default function GoogleMapsAddress() {
    return (
        <APIProvider apiKey={'AIzaSyBFT4isOBiPPTttkihHnsl9WboOWUc-ZeY'} onLoad={() => console.log('Maps API has loaded.')}>
            <div className="googleMapsComponent">
                <Map
                    defaultZoom={13}
                    defaultCenter={{ lat: 36.808851391005625, lng: -119.82297917748616 }}
                    mapId={'DEMO_MAP_ID'}
                    style={{ width: '100%', height: 'auto' }}
                    colorScheme={ColorScheme.FOLLOW_SYSTEM}
                >
                    <Marker
                        key="officeMarker"
                        position={{ lat: 36.8085374, lng: -119.8240786 }}
                    />
                    <InfoWindow
                        onCloseClick={() => {}}
                        pixelOffset={[0, -24]}
                        position={{ lat: 36.8085374, lng: -119.8240786 }}
                        ariaLabel="Legal, PC office location with link to getting directions on Google Maps"
                    >
                            <h2>Ryan Legal, PC</h2>
                            <a
                                href="https://www.google.com/maps/dir//MMWB%26R,+1690+W+Shaw+Ave+%23200,+Fresno,+CA+93711/@36.8086968,-119.8234727,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x809467c626e1d33f:0x89ac52a38630fad!2m2!1d-119.8232368!2d36.8086987!3e0?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
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
