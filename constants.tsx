
import React from 'react';
import { 
  Wrench, Car, Hammer, Home, Scissors, Monitor, Sparkles, GraduationCap, 
  Paintbrush, Zap, Pipe, Camera, ChefHat, Truck, HeartPulse
} from 'lucide-react';
import { Category, Master } from './types';

export interface ExtendedCategory extends Category {
  subs: string[];
}

export const CATEGORIES: ExtendedCategory[] = [
  { 
    id: 'qurilish', 
    name: 'Qurilish va taʼmirlash', 
    icon: 'Hammer', 
    description: 'Elektrik, Santexnik, Plitkachi...',
    subs: ['Elektrik', 'Santexnik', 'Plitkachi', 'Malyar', 'Gipsokartonchi', 'Payvandchi', 'Tom yopuvchi']
  },
  { 
    id: 'avto', 
    name: 'Avto xizmatlar', 
    icon: 'Car', 
    description: 'Mexanik, Elektrik, Shinomontaj...',
    subs: ['Avtomexanik', 'Avtoelektrik', 'Kuzov ustasi', 'Motorist', 'Xodovoy ustasi', 'Vulkanizatsiya']
  },
  { 
    id: 'mebel', 
    name: 'Mebel xizmatlari', 
    icon: 'Wrench', 
    description: 'Mebel yigʻish, duradgor...',
    subs: ['Mebel yigʻuvchi', 'Duradgor', 'Mebel taʼmirlovchi', 'Yumshoq mebel ustasi']
  },
  { 
    id: 'it', 
    name: 'IT va Texnika', 
    icon: 'Monitor', 
    description: 'Komp taʼmiri, Dasturlash...',
    subs: ['Kompyuter ustasi', 'Dasturchi', 'Grafik dizayner', 'SMM mutaxassisi', 'Tarmoq sozlovchi']
  },
  { 
    id: 'tozalash', 
    name: 'Cleaning', 
    icon: 'Sparkles', 
    description: 'Uy/ofis tozalash...',
    subs: ['Uy tozalash', 'Ofis tozalash', 'Ximchistka', 'Oyna yuvish', 'Hovli tozalash']
  },
  { 
    id: 'maishiy', 
    name: 'Maishiy xizmatlar', 
    icon: 'Home', 
    description: 'Texnika taʼmiri...',
    subs: ['Xolodilnik ustasi', 'Kir yuvish mashinasi ustasi', 'Konditsioner ustasi', 'Televizor ustasi']
  },
  { 
    id: 'talim', 
    name: 'Taʼlim', 
    icon: 'GraduationCap', 
    description: 'Repetitorlik, Til kurslari...',
    subs: ['Ingliz tili', 'Rus tili', 'Matematika', 'Fizika', 'Tarix', 'Boshlangʻich taʼlim']
  },
  { 
    id: 'gozallik', 
    name: 'Goʻzallik', 
    icon: 'Scissors', 
    description: 'Sartarosh, Vizajist...',
    subs: ['Sartarosh', 'Vizajist', 'Manikyur', 'Kosmetolog', 'Massajchi']
  },
];

export const CITY_DISTRICTS: Record<string, string[]> = {
  'Toshkent': ['Chilonzor', 'Yunusobod', 'Mirzo Ulugʻbek', 'Yakkasaroy', 'Shayxontohur', 'Olmazor', 'Sergeli', 'Yashnobod', 'Mirobod', 'Uchtepa', 'Bektemir'],
  'Samarqand': ['Samarqand shahar', 'Pastdargʻom', 'Bulungʻur', 'Ishtixon', 'Kattaqoʻrgʻon'],
  'Buxoro': ['Buxoro shahar', 'Gʻijduvon', 'Kogon', 'Vobkent', 'Qorakoʻl'],
  'Fargʻona': ['Fargʻona shahar', 'Margʻilon', 'Qoʻqon', 'Quva', 'Oltiariq'],
  'Andijon': ['Andijon shahar', 'Asaka', 'Shahrixon', 'Xoʻjaobod'],
  'Namangan': ['Namangan shahar', 'Chust', 'Uychi', 'Kosonsoy'],
  'Xiva': ['Xiva shahar', 'Urganch shahar', 'Xonqa', 'Gurlan'],
};

export const MOCK_MASTERS: Master[] = [
  {
    id: '1',
    name: 'Dilshod Raxmatov',
    profession: 'Professional Elektrik',
    category: 'qurilish',
    city: 'Toshkent',
    rating: 4.9,
    reviewsCount: 124,
    description: '15 yillik tajribaga ega usta. Har qanday murakkablikdagi elektr ishlarini sifatli bajaramiz.',
    image: 'https://picsum.photos/seed/usta1/400/400',
    gallery: [
      'https://picsum.photos/seed/job1/600/400',
      'https://picsum.photos/seed/job2/600/400'
    ],
    phone: '+998 90 123 45 67',
    isTop: true,
    experience: '15',
    location: { lat: 41.2995, lng: 69.2401 }
  },
  {
    id: '2',
    name: 'Anvar Karimov',
    profession: 'Avtomexanik',
    category: 'avto',
    city: 'Samarqand',
    rating: 4.7,
    reviewsCount: 89,
    description: 'Dvigatel va yurish qismi taʼmiri. Barcha turdagi avtomobillarga xizmat koʻrsatiladi.',
    image: 'https://picsum.photos/seed/usta2/400/400',
    gallery: ['https://picsum.photos/seed/job4/600/400'],
    phone: '+998 93 321 65 43',
    experience: '8',
    location: { lat: 39.6270, lng: 66.9750 }
  }
];

export const CITIES = Object.keys(CITY_DISTRICTS);
