import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    // Baterías LiFePO4 Prismáticas
    {
      id: 1,
      name: 'Batería LiFePO4 Cilindrica 20Ah',
      description: 'Batería de fosfato de hierro litio prisma 20Ah 3.2V para sistemas de almacenamiento de energía',
      price: 85,
      category: 'Baterías LiFePO4',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S9cb1951d13924f39b51f52b47af37129F.jpg_960x960q75.jpg_.avif',
      discount: 5,
      isFeatured: true,
      chemistry: 'LiFePO4',
      format: 'Prismática',
      capacity: 20000,
      voltage: 3.2,
      application: 'UPS/No Break',
      weight: 2400,
      lifespan: 2500,
      chargeCurrent: 10,
      dischargeCurrent: 20,
      pulseDischargeCurrent: 40,
      operatingTemperature: '-20°C a 60°C'
    },
    {
      id: 2,
      name: 'Batería LiFePO4 Prismatica 50Ah',
      description: 'Batería de fosfato de hierro litio prisma 50Ah 3.2V para paneles solares y sistemas UPS',
      price: 180,
      category: 'Baterías LiFePO4',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/See89b568f8e245759e8e578f334fb322v.jpg_960x960q75.jpg_.avif',
      isFeatured: true,
      chemistry: 'LiFePO4',
      format: 'Prismática',
      capacity: 50000,
      voltage: 3.2,
      application: 'Paneles Solares',
      weight: 5800,
      lifespan: 2500,
      chargeCurrent: 25,
      dischargeCurrent: 50,
      pulseDischargeCurrent: 100,
      operatingTemperature: '-20°C a 60°C'
    },
    {
      id: 3,
      name: 'Batería LiFePO4 Prismatica 100Ah',
      description: 'Batería de fosfato de hierro litio prisma 100Ah 3.2V para vehículos eléctricos y energía solar',
      price: 320,
      category: 'Baterías LiFePO4',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S7f5cfe2cc0534ff38ae9dce1796ab4dal.jpg_960x960q75.jpg_.avif',
      discount: 10,
      isFeatured: true,
      chemistry: 'LiFePO4',
      format: 'Prismática',
      capacity: 100000,
      voltage: 3.2,
      application: 'Vehículos Eléctricos',
      weight: 11500,
      lifespan: 2500,
      chargeCurrent: 50,
      dischargeCurrent: 100,
      pulseDischargeCurrent: 200,
      operatingTemperature: '-20°C a 60°C'
    },
    {
      id: 4,
      name: 'Batería LiFePO4 Prismatica 280Ah',
      description: 'Batería de fosfato de hierro litio prisma 280Ah 3.2V para sistemas de almacenamiento de gran capacidad',
      price: 850,
      category: 'Baterías LiFePO4',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sde61873e47cd49fcb6a971518d46745aO.jpg_960x960q75.jpg_.avif',
      discount: 15,
      isFeatured: true,
      chemistry: 'LiFePO4',
      format: 'Prismática',
      capacity: 280000,
      voltage: 3.2,
      application: 'Almacenamiento Energía Solar',
      weight: 32000,
      lifespan: 2500,
      chargeCurrent: 140,
      dischargeCurrent: 280,
      pulseDischargeCurrent: 560,
      operatingTemperature: '-20°C a 60°C'
    },
    
    // Baterías 18650 Samsung (Li-Ion)
    {
      id: 5,
      name: 'Batería Samsung 30Q 18650',
      description: 'Batería Samsung INR18650-30Q 3000mAh 18650 para vapes, linternas y dispositivos de alta demanda',
      price: 8.5,
      category: 'Baterías 18650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S039d9abaf027422183193fe062059d6a2.jpg_960x960q75.jpg_.avif',
      chemistry: 'Li-Ion',
      format: '18650',
      capacity: 3000,
      voltage: 3.6,
      application: 'Vapes',
      weight: 45,
      lifespan: 500,
      chargeCurrent: 1.5,
      dischargeCurrent: 3,
      pulseDischargeCurrent: 10,
      operatingTemperature: '-20°C a 60°C'
    },
    {
      id: 6,
      name: 'Batería Samsung 35E 18650',
      description: 'Batería Samsung INR18650-35E 3500mAh 18650 para bicicletas eléctricas y herramientas',
      price: 9.2,
      category: 'Baterías 18650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S6ce6245aff8f49a1b765aac518019de2h.jpg_960x960q75.jpg_.avif',
      isFeatured: true,
      chemistry: 'Li-Ion',
      format: '18650',
      capacity: 3500,
      voltage: 3.6,
      application: 'Bicicletas Eléctricas',
      weight: 48,
      lifespan: 800,
      chargeCurrent: 1.75,
      dischargeCurrent: 10,
      pulseDischargeCurrent: 20,
      operatingTemperature: '-20°C a 60°C'
    },
    {
      id: 7,
      name: 'Batería Samsung 26F 18650',
      description: 'Batería Samsung INR18650-26F 2600mAh 18650 para cámaras y dispositivos de alta corriente',
      price: 7.8,
      category: 'Baterías 18650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S117f3951a1aa45fe8090063f24b5d525Z.jpg_960x960q75.jpg_.avif',
      chemistry: 'Li-Ion',
      format: '18650',
      capacity: 2600,
      voltage: 3.6,
      application: 'Dispositivos Electrónicos',
      weight: 43,
      lifespan: 500,
      chargeCurrent: 1.3,
      dischargeCurrent: 5,
      pulseDischargeCurrent: 10,
      operatingTemperature: '-20°C a 60°C'
    },
    
    // Baterías 18650 LG (Li-Ion)
    {
      id: 8,
      name: 'Batería LG HG2 18650',
      description: 'Batería LG HG2 3000mAh 18650 para bicicletas eléctricas y dispositivos de alta potencia',
      price: 8.2,
      category: 'Baterías 18650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S098714a67d9e4c88b6ce59f1d2202638d.jpg_960x960q75.jpg_.avif',
      chemistry: 'Li-Ion',
      format: '18650',
      capacity: 3000,
      voltage: 3.6,
      application: 'Bicicletas Eléctricas',
      weight: 45,
      lifespan: 800,
      chargeCurrent: 1.5,
      dischargeCurrent: 10,
      pulseDischargeCurrent: 20,
      operatingTemperature: '-20°C a 60°C'
    },
    
    // Baterías 18650 Liitokala (Li-Ion)
    {
      id: 9,
      name: 'Batería Liitokala 35E 18650',
      description: 'Batería Liitokala 3500mAh 18650 para vapes y dispositivos electrónicos',
      price: 6.5,
      category: 'Baterías 18650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S6ce6245aff8f49a1b765aac518019de2h.jpg_960x960q75.jpg_.avif,',
      chemistry: 'Li-Ion',
      format: '18650',
      capacity: 3500,
      voltage: 3.6,
      application: 'Vapes',
      weight: 48,
      lifespan: 500,
      chargeCurrent: 1.75,
      dischargeCurrent: 5,
      pulseDischargeCurrent: 15,
      operatingTemperature: '-20°C a 60°C'
    },
    
    // Baterías LiFePO4 18650
    {
      id: 10,
      name: 'Batería LiFePO4 18650 DLG Power 2000mAh',
      description: 'Batería DLG LiFePO4 18650 2000mAh para seguridad y dispositivos de bajo consumo',
      price: 12.5,
      category: 'Baterías LiFePO4',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sca91302acc6d462d8fbdd08ceeb5d240i.jpg_960x960q75.jpg_.avif',
      discount: 8,
      chemistry: 'LiFePO4',
      format: '18650',
      capacity: 2000,
      voltage: 3.2,
      application: 'Dispositivos Electrónicos',
      weight: 35,
      lifespan: 2000,
      chargeCurrent: 6,
      dischargeCurrent: 6,
      pulseDischargeCurrent: 12,
      operatingTemperature: '-20°C a 60°C'
    },
    
    // Baterías 26650 (Li-Ion)
    {
      id: 11,
      name: 'Batería Liitokala 26650 5000mAh',
      description: 'Batería Liitokala 26650 5000mAh para linternas y herramientas de alta demanda',
      price: 15.8,
      category: 'Baterías 26650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S9fda326ffce34648a88b6830f4304b790.jpg_960x960q75.jpg_.avif',
      chemistry: 'Li-Ion',
      format: '26650',
      capacity: 5000,
      voltage: 3.6,
      application: 'Linternas',
      weight: 85,
      lifespan: 500,
      chargeCurrent: 2.5,
      dischargeCurrent: 5,
      pulseDischargeCurrent: 15,
      operatingTemperature: '-20°C a 60°C'
    },
    {
      id: 12,
      name: 'Batería Liitokala 26650 7000mAh',
      description: 'Batería Liitokala 26650 7000mAh para dispositivos de alta capacidad',
      price: 19.5,
      category: 'Baterías 26650',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/S8f16a7cf471f4022a359c981052d8b20S.jpg_960x960q75.jpg_.avif',
      isFeatured: true,
      chemistry: 'Li-Ion',
      format: '26650',
      capacity: 7000,
      voltage: 3.6,
      application: 'Herramientas',
      weight: 110,
      lifespan: 500,
      chargeCurrent: 7,
      dischargeCurrent: 7,
      pulseDischargeCurrent: 35,
      operatingTemperature: '-20°C a 60°C'
    },
    
    // Baterías de Sodio
    {
      id: 13,
      name: 'Batería Ión de Sodio HAKADI 18650 1500mAh',
      description: 'Batería de ion de sodio 1500mAh tecnología emergente y ecológica sin el uso de litio ni metales raros',
      price: 22.5,
      category: 'Baterías de Sodio',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/Se068107792fc49469d8f9e100d2ff1c0T.jpg_960x960q75.jpg_.avif',
      discount: 12,
      isFeatured: true,
      chemistry: 'Na-Ion',
      format: '18650',
      capacity: 1500,
      voltage: 3.0,
      application: 'Sistemas Aislados',
      weight: 50,
      lifespan: 3000,
      chargeCurrent: 1.5,
      dischargeCurrent: 1.5,
      pulseDischargeCurrent: 4.5,
      operatingTemperature: '-10°C a 50°C'
    },
    {
      id: 14,
      name: 'Batería Ión de Sodio Varicore 32700 5000mAh',
      description: 'Batería de iones de sodio de alta capacidad 5000mAh, solución ecológica y segura para almacenamiento de energía',
      price: 22.5,
      category: 'Baterías de Sodio',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sc4d2fcc1aef544e69e79e9882b83b966r.jpg_960x960q75.jpg_.avif',
      discount: 12,
      isFeatured: true,
      chemistry: 'Na-Ion',
      format: '32700',
      capacity: 5000,
      voltage: 3.0,
      application: 'Sistemas Aislados',
      weight: 127,
      lifespan: 1500,
      chargeCurrent: 5,
      dischargeCurrent: 5,
      pulseDischargeCurrent: 50,
      operatingTemperature: '-10°C a 50°C'
    },

    // BMS
    {
      id: 15,
      name: 'TDT BMS 8S 24V 60A Protección Batería LiFePO4',
      description: 'Módulo de protección BMS 8S 24V 60A para baterías LiFePO4, con balanceo de celdas, protección contra sobrecarga, sobredescarga, cortocircuito y temperatura',
      price: 50.99,
      category: 'BMS',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sce7296cf160a4cdf8e8ead9832bfa5350.jpg_960x960q75.jpg_.avif',
      discount: 8,
      isFeatured: true,
      chemistry: 'LiFePO4',
      format: 'BMS',
      capacity: 0, // No aplica para BMS
      voltage: 25.2,
      application: 'General',
      weight: 280, // Peso en gramos
      lifespan: 50000, // Horas de operación estimadas
      chargeCurrent: 30, // A
      dischargeCurrent: 60, // A
      pulseDischargeCurrent: 100, // A
      operatingTemperature: '-20°C a 70°C',
      features: [
        'Protección contra sobrecarga (4.25V±0.05V)',
        'Protección contra sobredescarga (2.5V±0.08V)',
        'Protección contra cortocircuito',
        'Protección contra sobrecorriente',
        'Protección contra temperatura',
        'Modulo Bluetooth de Comunicacion para monitoreo',
        'Balanceo de celdas integrado',
        'Bajo consumo en modo standby (<50μA)'
      ]
    },
    {
      id: 16,
      name: 'Daly BMS 8S 24V 100A Batería LiFePO4 con Bluetooth',
      description: 'Sistema de Gestión de Batería (BMS) 8S 24V 100A para baterías LiFePO4 con monitoreo en tiempo real vía Bluetooth. Incluye protección contra sobrecarga, sobredescarga, cortocircuito y temperatura',
      price: 89.99,
      category: 'BMS',
      image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sfe1c3eb4aedf4b1d8defd44155af9131G.jpg_960x960q75.jpg_.avif',
      discount: 12,
      isFeatured: true,
      chemistry: 'LiFePO4',
      format: 'BMS',
      capacity: 0, // No aplica para BMS
      voltage: 24, // Voltaje nominal
      application: 'General',
      weight: 350, // Peso en gramos
      lifespan: 50000, // Horas de operación estimadas
      chargeCurrent: 50, // A
      dischargeCurrent: 100, // A
      pulseDischargeCurrent: 200, // A
      operatingTemperature: '-20°C a 70°C',
      protection: {
        overVoltage: '3.65V ± 0.05V por celda',
        underVoltage: '2.5V ± 0.05V por celda',
        overCurrent: '100A continuo / 200A pico',
        shortCircuit: 'Protección activa',
        temperature: 'Protección por sensor NTC'
      },
      features: [
        'Comunicación Bluetooth para monitoreo en tiempo real',
        'Aplicación móvil para iOS y Android',
        'Balanceo activo de celdas (≤50mA)',
        'Protección contra polaridad inversa',
        'Interfaz RS485/UART para comunicación',
        'Pantalla LCD opcional para visualización',
        'Bajo consumo en modo standby (<100μA)',
        'Diseño con disipación de calor mejorada'
      ]
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.isFeatured);
    return of(featured);
  }

  searchProducts(query: string): Observable<Product[]> {
    const results = this.products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.chemistry.toLowerCase().includes(query.toLowerCase()) ||
      p.format.toLowerCase().includes(query.toLowerCase()) ||
      p.application.toLowerCase().includes(query.toLowerCase())
    );
    return of(results);
  }
}