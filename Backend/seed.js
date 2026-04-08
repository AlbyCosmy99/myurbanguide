import mongoose from "mongoose";
import 'dotenv/config';
import { UserModel } from "./database/schemas/userSchema.js";
import { IncludesModel } from "./database/schemas/includesSchema.js";
import { ExcludesModel } from "./database/schemas/excludesSchema.js";
import { LanguagesModel } from "./database/schemas/languagesSchema.js";
import { TourModel } from "./database/schemas/tourSchema.js";
import bcrypt from "bcryptjs";

const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myurbanguide';

async function seed() {
  try {
    console.log("Connessione al DB...");
    await mongoose.connect(mongouri);
    console.log("Azzero le collezioni esistenti...");
    await UserModel.deleteMany({});
    await IncludesModel.deleteMany({});
    await ExcludesModel.deleteMany({});
    await LanguagesModel.deleteMany({});
    await TourModel.deleteMany({});

    console.log("Creazione dati fittizi...");

    // 1. Languages
    const langIta = await LanguagesModel.create({ title: "Italiano" });
    const langEng = await LanguagesModel.create({ title: "Inglese" });
    const langSpa = await LanguagesModel.create({ title: "Spagnolo" });

    // 2. Includes
    const incGuida = await IncludesModel.create({ title: "Guida locale esperta", default: true });
    const incBiglietti = await IncludesModel.create({ title: "Biglietti d'ingresso", default: false });
    const incCibo = await IncludesModel.create({ title: "Degustazione gastronomica", default: false });
    const incPickUp = await IncludesModel.create({ title: "Pick-up in hotel", default: false });

    // 3. Excludes
    const excMancia = await ExcludesModel.create({ title: "Mancia per la guida", default: true });
    const excVolo = await ExcludesModel.create({ title: "Volo aereo", default: true });
    const excPasti = await ExcludesModel.create({ title: "Pasti non menzionati", default: true });

    // 4. Users
    const password = await bcrypt.hash("password123", 10);
    const user1 = await UserModel.create({
      username: "mario_rossi",
      email: "mario@example.com",
      password,
      name: "Mario",
      surname: "Rossi",
      birthday: new Date("1985-05-15")
    });

    const user2 = await UserModel.create({
      username: "luigi_verdi",
      email: "luigi@example.com",
      password,
      name: "Luigi",
      surname: "Verdi",
      birthday: new Date("1990-11-20")
    });

    // 5. Tours
    const tours = [
      {
        user: user1._id,
        title: "Roma Antica: Segreti del Colosseo e Fori Imperiali",
        meeting_point: {
          latitude: 41.8902,
          longitude: 12.4922,
          address: "Piazza del Colosseo, 1, 00184 Roma RM, Italia"
        },
        description: "Un'immersione totale nel cuore dell'Impero Romano. Accompagnati da una guida archeologa, scopriremo i dettagli meno noti sulle vite dei gladiatori e visiteremo i fori imperiali senza fare la fila.",
        price: 49,
        duration: "3 ore",
        includes: [incGuida._id, incBiglietti._id],
        excludes: [excMancia._id, excPasti._id],
        highlights: ["Accesso prioritario", "Guida esperta locale", "Aneddoti sui gladiatori"],
        featured_image: "public/Images/rome_main_1775668370666.png",
        gallery: [
          "public/Images/rome_gallery_1_1775668387937.png",
          "public/Images/rome_gallery_2_1775668409504.png"
        ],
        additional_info: {
          group_size: "Massimo 12 persone",
          recommended_gear: ["Scarpe comode", "Borraccia"],
          age_restriction: "Nessuna",
          meeting_time: "09:30 AM",
          language: [langIta._id, langEng._id],
          clothing_advice: "Abbigliamento leggero in estate",
          family_friendly: true,
          best_season: "Primavera/Autunno",
          recommended_items: ["Macchina fotografica"]
        }
      },
      {
        user: user2._id,
        title: "Napoli Street Food & Misteri dei Vicoli",
        meeting_point: {
          latitude: 40.8499,
          longitude: 14.2562,
          address: "Piazza del Gesù Nuovo, 80134 Napoli NA, Italia"
        },
        description: "Scopri il vero sapore di Napoli passeggiando tra i Quartieri Spagnoli e Spaccanapoli. Assaggeremo la famosa pizza a portafoglio, cuoppi fritti, sfogliatelle e caffè storico, ascoltando leggende esoteriche della città.",
        price: 35,
        duration: "2.5 ore",
        includes: [incGuida._id, incCibo._id],
        excludes: [excMancia._id, excVolo._id],
        highlights: ["Degustazione di 5 specialità locali", "Misteri di Spaccanapoli", "Chiese esoteriche"],
        featured_image: "public/Images/naples_main_1775670793909.png",
        gallery: [
          "public/Images/naples_gallery_1_1775670817524.png",
          "public/Images/naples_gallery_2_1775670837080.png"
        ],
        additional_info: {
          group_size: "Massimo 8 persone",
          recommended_gear: ["Appetito!"],
          age_restriction: "Nessuna",
          meeting_time: "11:00 AM",
          language: [langIta._id],
          clothing_advice: "Casual",
          family_friendly: true,
          best_season: "Tutto l'anno",
          recommended_items: ["Tanta fame!"]
        }
      },
      {
        user: user1._id,
        title: "Venezia Nascosta: Tra Calli Sconosciute e Bacari",
        meeting_point: {
          latitude: 45.4384,
          longitude: 12.3276,
          address: "Campo San Polo, 30125 Venezia VE, Italia"
        },
        description: "Eviteremo la folla di Piazza San Marco per addentrarci nella Venezia più vera. Visiteremo i sestieri di San Polo e Cannaregio fermandoci nei tradizionali 'Bacari' per cicchetti e ombre de vin.",
        price: 55,
        duration: "4 ore",
        includes: [incGuida._id, incCibo._id],
        excludes: [excVolo._id, excPasti._id],
        highlights: ["3 fermate in bacari storici", "Cannaregio e ghetto ebraico", "Lontano dalle folle"],
        featured_image: "public/Images/1735937782553-232982003-97.jpg",
        gallery: [
          "public/Images/1735939999648-643595691-147.jpg",
          "public/Images/1735940234253-717521692-97.jpg"
        ],
        additional_info: {
          group_size: "Massimo 10 persone",
          recommended_gear: ["Scarpe impermeabili se acqua alta"],
          age_restriction: "+18 (per il vino)",
          meeting_time: "17:30 PM",
          language: [langIta._id, langEng._id, langSpa._id],
          clothing_advice: "Vestirsi a strati",
          family_friendly: false,
          best_season: "Primavera/Autunno",
          recommended_items: ["Ombrello"]
        }
      },
      {
        user: user2._id,
        title: "Milano Fashion District & Architettura Contemporanea",
        meeting_point: {
          latitude: 45.4642,
          longitude: 9.1900,
          address: "Piazza della Scala, 20121 Milano MI, Italia"
        },
        description: "Scopri le due anime di Milano: il quadrilatero della moda con i suoi cortili segreti e il nuovo skyline di Porta Nuova. Il tour termina con un classico aperitivo milanese sui Navigli.",
        price: 45,
        duration: "3.5 ore",
        includes: [incGuida._id, incCibo._id],
        excludes: [excMancia._id],
        highlights: ["Quadrilatero della Moda", "Piazza Gae Aulenti", "Aperitivo incluso"],
        featured_image: "public/Images/1735940356762-455514388-97.jpg",
        gallery: [
          "public/Images/1735941711506-968353296-97.jpg",
          "public/Images/1735942836270-834239517-97.jpg"
        ],
        additional_info: {
          group_size: "Massimo 15 persone",
          recommended_gear: ["Scarpe chic ma comode"],
          age_restriction: "Nessuna",
          meeting_time: "16:00 PM",
          language: [langIta._id, langEng._id],
          clothing_advice: "Smart Casual",
          family_friendly: true,
          best_season: "Tutto l'anno",
          recommended_items: ["Smartphone o fotocamera"]
        }
      }
    ];

    await TourModel.insertMany(tours);
    console.log("Database popolato con successo con 4 tour incredibili e tutti i relativi dati accessori!");
    process.exit(0);
  } catch (error) {
    console.error("Errore durante il seeding:", error);
    process.exit(1);
  }
}

seed();
