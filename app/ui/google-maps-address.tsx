import {
    APIProvider,
    InfoWindow,
    Marker,
    Map,
    MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import '@/app/ui/google-maps-address.css';

export default function GoogleMapsAddress() {
    return (
        <APIProvider apiKey={'AIzaSyBFT4isOBiPPTttkihHnsl9WboOWUc-ZeY'} onLoad={() => console.log('Maps API has loaded.')}>
            <div className="googleMapsComponent">
                <Map
                    defaultZoom={13}
                    defaultCenter={{ lat: 36.808851391005625, lng: -119.82297917748616 }}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }
                    mapId={'DEMO_MAP_ID'}
                    style={{ width: '100%', height: 'auto' }}
                >
                    <Marker
                        key="officeMarker"
                        position={{ lat: 36.8085374, lng: -119.8240786 }}
                    />
                    <InfoWindow
                        onCloseClick={() => {}}
                        pixelOffset={[0, -24]}
                        position={{ lat: 36.8085374, lng: -119.8240786 }}
                    >
                        <div>
                            <p>Ryan Legal, PC</p>
                            <a
                                href={'https://www.google.com/maps/dir//Motschiedler,+Michaelides,+Wishon,+Brewer+%26+Ryan,+LLP,+1690+W+Shaw+Ave+%23200,+Fresno,+CA+93711/@36.8085374,-119.8240786,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x809467c89cbc798d:0x673414201e60d38a!2m2!1d-119.8240786!2d36.8085335!3e0?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D'}
                                target='_blank'
                                aria-label='Get directions to the Ryan Legal, PC office on Google Maps.'   
                            >
                                Get Directions
                            </a>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        </APIProvider>
    )
}
