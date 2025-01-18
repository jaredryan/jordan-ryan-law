import {
    AdvancedMarker,
    APIProvider,
    Map,
    MapCameraChangedEvent,
    Pin
} from '@vis.gl/react-google-maps';

export default function GoogleMapsAddress() {
    return (
        <APIProvider apiKey={'AIzaSyBFT4isOBiPPTttkihHnsl9WboOWUc-ZeY'} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={13}
                defaultCenter={{ lat: 36.808851391005625, lng: -119.82297917748616 }}
                onCameraChanged={(ev: MapCameraChangedEvent) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
                mapId={'DEMO_MAP_ID'}
                style={{ width: '800px', height: '800px' }}
            >
                <AdvancedMarker
                    key="office"
                    position={{ lat: 36.808851391005625, lng: -119.82297917748616 }}
                >
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            </Map>
        </APIProvider>
    )
}
