export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  discount?: number; // Porcentaje de descuento
  isFeatured?: boolean; // Producto destacado
  chemistry: 'Li-Ion' | 'LiPo' | 'LiFePO4' | 'Na-Ion' | 'Other'; // Química de la batería
  format: 'Prismática' | '18650' | '26650' | '14500' | '21700' | '32700' | 'BMS' | 'Personalizada'; // Formato de la batería
  capacity: number; // Capacidad en mAh o Ah
  voltage: number; // Voltaje nominal
  application: 'Vehículos Eléctricos' | 'Paneles Solares' | 'Herramientas' | 'Dispositivos Electrónicos' | 'UPS/No Break' | 'Almacenamiento Energía Solar' | 'Bicicletas Eléctricas' | 'Vapes' | 'Linternas' | 'Sistemas Aislados' | 'General'; // Aplicación principal
  weight?: number; // Peso en gramos
  lifespan?: number; // Vida útil en ciclos
  chargeCurrent?: number; // Corriente de carga en Amperios
  dischargeCurrent?: number; // Corriente de descarga continua en Amperios
  pulseDischargeCurrent?: number; // Corriente de descarga pulso 5s en Amperios
  operatingTemperature?: string; // Rango de temperatura de operación
  cells?: number; // Número de celdas (opcional)
  features?: string[]; // Características adicionales
  protection?: {
    overVoltage?: string;
    underVoltage?: string;
    overCurrent?: string;
    shortCircuit?: string;
    temperature?: string;
  };
  isFavorite?: boolean; // Indica si el producto está en favoritos
}