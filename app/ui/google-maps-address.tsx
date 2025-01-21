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
                                href="https://www.google.com/maps/place/MMWB%26R/@36.8086968,-119.8260476,17z/data=!3m1!4b1!4m6!3m5!1s0x809467c626e1d33f:0x89ac52a38630fad!8m2!3d36.8086968!4d-119.8234727!16s%2Fg%2F11c2p_xw9l?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
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
