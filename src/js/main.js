window.addEventListener('load', () => {
    require(
        [
            'esri/config',
            'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'esri/layers/GraphicsLayer'
        ],
        (esriConfig, Map, MapView, Graphic, GraphicsLayer) => {
            esriConfig.apiKey = key;
    
            const map = new Map({
                basemap: 'arcgis-topographic'
            });
            
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            
            const mapConfig = {
                map,
                center: [ -58.45, -34.61 ],
                zoom: 12,
                container: 'map'
            }
            
            const view = new MapView(mapConfig);
            
            const createPointer = (longitude, latitude, name, address, phone, category) => {
                // Create the point
                const point = {
                    type: "point",
                    longitude, // x
                    latitude // y
                };
            
                const pointerConfig = {
                    type: "simple-marker",
                    color: [255, 0, 0],
                    outline: {
                        color: [255, 255, 255],
                        width: 1
                    }
                };
            
                const attributes = {
                    name,
                    address,
                    phone,
                    longitude,
                    latitude,
                    category
                }
            
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: pointerConfig,
                    popupTemplate,
                    attributes
                });
                graphicsLayer.add(pointGraphic);
            }

            DOMForm.form.addEventListener('submit', e => {
                e.preventDefault();
                validateFields();

                const valuesToSubmit = {}
                for (let i of e.target) {
                    if (i.id === 'submit') continue;
                    valuesToSubmit[i.name] = i.value;
                }

                createPointer(valuesToSubmit['coord-x'], valuesToSubmit['coord-y'], valuesToSubmit.name, valuesToSubmit.address, valuesToSubmit.phone, valuesToSubmit.category);
            });
        }
    );

    // Loading screen
    setTimeout(() => {
        DOMoverlay.style.display = 'none';
        const content = document.getElementById('content');

        content.style.animation = 'jumpIn 2s';
    }, 2000);
})