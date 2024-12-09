import React, { useEffect, useRef } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";

const Map3D: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapDiv.current) return;

    const webScene = new WebScene({
      basemap: "streets-night-vector", // خريطة الأساس
      ground: "world-elevation", // دعم الارتفاعات
    });

    const view = new SceneView({
      container: mapDiv.current,
      map: webScene,
      center: [-117.1956, 34.0561], // إحداثيات المركز (لوس أنجلوس، كاليفورنيا)
      zoom: 16,
    });

    const graphicsLayer = new GraphicsLayer();
    webScene.add(graphicsLayer);

    // إضافة نموذج ثلاثي الأبعاد
    const add3DModel = () => {
      const point = new Point({
        longitude: -117.1956,
        latitude: 34.0561,
        z: 1000, // ارتفاع النقطة
      });

      const symbol = new PointSymbol3D({
        symbolLayers: [
          {
            type: "object",
            resource: {
              href: "./models/worker_talk_animation.glb",
            },
            height: 1000,
          },
        ],
      });

      const graphic = new Graphic({
        geometry: point,
        symbol,
      });

      graphicsLayer.add(graphic);
    };

    add3DModel();

    return () => {
      view.destroy();
    };
  }, []);

  return <div style={{ height: "100vh", width: "100%" }} ref={mapDiv}></div>;
};

export default Map3D;
