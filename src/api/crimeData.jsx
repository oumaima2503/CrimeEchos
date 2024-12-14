
const coordinates = {
    Casablanca: {
        "Hay Mohammedi": { latitude: 33.5941, longitude: -7.5374 },
        Maarif: { latitude: 33.589886, longitude: -7.603869 },
        "Sidi Bernoussi": { latitude: 33.6153, longitude: -7.5042 },
        "Derb Ghallef": { latitude: 33.5845, longitude: -7.6165 },
        Anfa: { latitude: 33.5883, longitude: -7.6262 },
        "Oasis": { latitude: 33.5622, longitude: -7.6411 },
        "Ain Chock": { latitude: 33.5248, longitude: -7.6441 },
        "Ain Sebaa": { latitude: 33.6273, longitude: -7.5004 },
        "Bourgogne": { latitude: 33.5973, longitude: -7.6352 },
        "Hay Hassani": { latitude: 33.5448, longitude: -7.6648 },
    },
    Rabat: {
        Agdal: { latitude: 34.017049, longitude: -6.836157 },
        "Hay Ryad": { latitude: 34.0022, longitude: -6.8455 },
        "Yacoub El Mansour": { latitude: 34.0296, longitude: -6.8361 },
        Souissi: { latitude: 34.0194, longitude: -6.8214 },
        Akkari: { latitude: 34.0046, longitude: -6.8518 },
        "Medina": { latitude: 34.0213, longitude: -6.8365 },
        "Touarga": { latitude: 34.0288, longitude: -6.8149 },
        "Quartier Hassan": { latitude: 34.0224, longitude: -6.8288 },
        "Quartier Ocean": { latitude: 34.0099, longitude: -6.8444 },
        "Takaddoum": { latitude: 34.0275, longitude: -6.8481 },
    },
    Marrakech: {
        Gueliz: { latitude: 31.6342, longitude: -8.0071 },
        Medina: { latitude: 31.6295, longitude: -7.9811 },
        "Sidi Youssef Ben Ali": { latitude: 31.6181, longitude: -7.9466 },
        Annakhil: { latitude: 31.6687, longitude: -7.9613 },
        Targa: { latitude: 31.6391, longitude: -8.0343 },
        "Mellah": { latitude: 31.6176, longitude: -7.9792 },
        "Bab Doukkala": { latitude: 31.6377, longitude: -8.0058 },
        "Quartier Palmier": { latitude: 31.6253, longitude: -7.9968 },
        "Quartier Izdihar": { latitude: 31.6656, longitude: -8.0085 },
        "Quartier Al Massar": { latitude: 31.6408, longitude: -7.9882 },
    },
    Fès: {
        Zouagha: { latitude: 34.0422, longitude: -4.9914 },
        "Ville Nouvelle": { latitude: 34.0378, longitude: -4.9997 },
        Médina: { latitude: 34.0622, longitude: -4.9707 },
        Narjiss: { latitude: 34.0372, longitude: -4.9782 },
        Saiss: { latitude: 34.0329, longitude: -4.9822 },
    },
    Tanger: {
        Malabata: { latitude: 35.7594, longitude: -5.8097 },
        "Beni Makada": { latitude: 35.7858, longitude: -5.8043 },
        Médina: { latitude: 35.7719, longitude: -5.8022 },
        Gzenaya: { latitude: 35.7602, longitude: -5.7364 },
        Charf: { latitude: 35.7713, longitude: -5.8198 },
    },
    Agadir: {
        Talborjt: { latitude: 30.4205, longitude: -9.5982 },
        "Hay Dakhla": { latitude: 30.4153, longitude: -9.6021 },
        Anza: { latitude: 30.4291, longitude: -9.5535 },
        Bensergao: { latitude: 30.4239, longitude: -9.5792 },
        "Cité Suisse": { latitude: 30.4169, longitude: -9.5893 },
    },
    Oujda: {
        "Hay Al Qods": { latitude: 34.7051, longitude: -1.9069 },
        "Quartier Lazaret": { latitude: 34.6889, longitude: -1.9183 },
        "Quartier Centre Ville": { latitude: 34.6846, longitude: -1.9146 },
        "Quartier Al Aouama": { latitude: 34.6811, longitude: -1.8994 },
        "Quartier Al Jameea": { latitude: 34.6843, longitude: -1.8798 },
    },
    Meknès: {
        Hamria: { latitude: 33.8951, longitude: -5.5513 },
        "Ville Nouvelle": { latitude: 33.8955, longitude: -5.5589 },
        Marjane: { latitude: 33.8931, longitude: -5.5671 },
        "Quartier Medina": { latitude: 33.8965, longitude: -5.5585 },
        "Quartier Toulal": { latitude: 33.8883, longitude: -5.5378 },
    },
    Tetouan: {
        Medina: { latitude: 35.5875, longitude: -5.3634 },
        Martil: { latitude: 35.6932, longitude: -5.2887 },
        Mhannech: { latitude: 35.5834, longitude: -5.3784 },
        "Kaa Asras": { latitude: 35.5613, longitude: -5.3746 },
        "Aouinate Hajjaj": { latitude: 35.5527, longitude: -5.3493 },
    },
    Kenitra: {
        "Bir Rami": { latitude: 34.2651, longitude: -6.5719 },
        Mellah: { latitude: 34.2687, longitude: -6.5736 },
        "Quartier Industriel": { latitude: 34.2712, longitude: -6.5763 },
        "Quartier Massira": { latitude: 34.2763, longitude: -6.5808 },
        "Quartier Saknia": { latitude: 34.2816, longitude: -6.5826 },
    },
};

const forces = {
    Casablanca: {
        "Hay Mohammedi": {
            name: "Commissariat Hay Mohammedi",
            address: "Hay Mohammedi, Casablanca",
            latitude: 33.5941,
            longitude: -7.5374,
        },
        Maarif: {
            name: "Commissariat Maarif",
            address: "Maarif, Casablanca",
            latitude: 33.589886,
            longitude: -7.603869,
        },
        "Sidi Bernoussi": {
            name: "Commissariat Sidi Bernoussi",
            address: "Sidi Bernoussi, Casablanca",
            latitude: 33.6153,
            longitude: -7.5042,
        },
        "Derb Ghallef": {
            name: "Commissariat Derb Ghallef",
            address: "Derb Ghallef, Casablanca",
            latitude: 33.5845,
            longitude: -7.6165,
        },
        Anfa: {
            name: "Commissariat Anfa",
            address: "Anfa, Casablanca",
            latitude: 33.5883,
            longitude: -7.6262,
        },
        Oasis: {
            name: "Commissariat Oasis",
            address: "Oasis, Casablanca",
            latitude: 33.5622,
            longitude: -7.6411,
        },
        "Ain Chock": {
            name: "Commissariat Ain Chock",
            address: "Ain Chock, Casablanca",
            latitude: 33.5248,
            longitude: -7.6441,
        },
        "Ain Sebaa": {
            name: "Commissariat Ain Sebaa",
            address: "Ain Sebaa, Casablanca",
            latitude: 33.6273,
            longitude: -7.5004,
        },
        Bourgogne: {
            name: "Commissariat Bourgogne",
            address: "Bourgogne, Casablanca",
            latitude: 33.5973,
            longitude: -7.6352,
        },
        "Hay Hassani": {
            name: "Commissariat Hay Hassani",
            address: "Hay Hassani, Casablanca",
            latitude: 33.5448,
            longitude: -7.6648,
        },
        "Sidi Moumen": {
            name: "Commissariat Sidi Moumen",
            address: "Sidi Moumen, Casablanca",
            latitude: 33.5613,
            longitude: -7.6544,
        },
        "Mohammedia": {
            name: "Commissariat Mohammedia",
            address: "Mohammedia, Casablanca",
            latitude: 33.6791,
            longitude: -7.3871,
        },
    },
    Rabat: {
        Agdal: {
            name: "Commissariat Agdal",
            address: "Agdal, Rabat",
            latitude: 34.017049,
            longitude: -6.836157,
        },
        "Hay Ryad": {
            name: "Commissariat Hay Ryad",
            address: "Hay Ryad, Rabat",
            latitude: 34.0022,
            longitude: -6.8455,
        },
        "Yacoub El Mansour": {
            name: "Commissariat Yacoub El Mansour",
            address: "Yacoub El Mansour, Rabat",
            latitude: 34.0296,
            longitude: -6.8361,
        },
        Souissi: {
            name: "Commissariat Souissi",
            address: "Souissi, Rabat",
            latitude: 34.0194,
            longitude: -6.8214,
        },
        Akkari: {
            name: "Commissariat Akkari",
            address: "Akkari, Rabat",
            latitude: 34.0046,
            longitude: -6.8518,
        },
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Rabat",
            latitude: 34.0213,
            longitude: -6.8365,
        },
        Touarga: {
            name: "Commissariat Touarga",
            address: "Touarga, Rabat",
            latitude: 34.0288,
            longitude: -6.8149,
        },
        "Quartier Hassan": {
            name: "Commissariat Quartier Hassan",
            address: "Quartier Hassan, Rabat",
            latitude: 34.0224,
            longitude: -6.8288,
        },
        "Quartier Ocean": {
            name: "Commissariat Quartier Ocean",
            address: "Quartier Ocean, Rabat",
            latitude: 34.0099,
            longitude: -6.8444,
        },
        Takaddoum: {
            name: "Commissariat Takaddoum",
            address: "Takaddoum, Rabat",
            latitude: 34.0275,
            longitude: -6.8481,
        },
        "Hay Al Fath": {
            name: "Commissariat Hay Al Fath",
            address: "Hay Al Fath, Rabat",
            latitude: 34.0331,
            longitude: -6.8280,
        },
    },
    Marrakech: {
        Gueliz: {
            name: "Commissariat Gueliz",
            address: "Avenue Mohammed V, Gueliz, Marrakech",
            latitude: 31.6342,
            longitude: -8.0071,
        },
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Marrakech",
            latitude: 31.6295,
            longitude: -7.9811,
        },
        "Sidi Youssef Ben Ali": {
            name: "Commissariat Sidi Youssef Ben Ali",
            address: "Sidi Youssef Ben Ali, Marrakech",
            latitude: 31.6181,
            longitude: -7.9466,
        },
        Annakhil: {
            name: "Commissariat Annakhil",
            address: "Annakhil, Marrakech",
            latitude: 31.6687,
            longitude: -7.9613,
        },
        Targa: {
            name: "Commissariat Targa",
            address: "Targa, Marrakech",
            latitude: 31.6391,
            longitude: -8.0343,
        },
        Mellah: {
            name: "Commissariat Mellah",
            address: "Mellah, Marrakech",
            latitude: 31.6176,
            longitude: -7.9792,
        },
        "Bab Doukkala": {
            name: "Commissariat Bab Doukkala",
            address: "Bab Doukkala, Marrakech",
            latitude: 31.6377,
            longitude: -8.0058,
        },
        "Quartier Palmier": {
            name: "Commissariat Quartier Palmier",
            address: "Quartier Palmier, Marrakech",
            latitude: 31.6253,
            longitude: -7.9968,
        },
        "Quartier Izdihar": {
            name: "Commissariat Quartier Izdihar",
            address: "Quartier Izdihar, Marrakech",
            latitude: 31.6656,
            longitude: -8.0085,
        },
        "Quartier Al Massar": {
            name: "Commissariat Quartier Al Massar",
            address: "Quartier Al Massar, Marrakech",
            latitude: 31.6408,
            longitude: -7.9882,
        },
        "Sidi Ghanem": {
            name: "Commissariat Sidi Ghanem",
            address: "Sidi Ghanem, Marrakech",
            latitude: 31.6370,
            longitude: -8.0165,
        },
    },
    Fès: {
        Zouagha: {
            name: "Commissariat Zouagha",
            address: "Zouagha, Fès",
            latitude: 34.0422,
            longitude: -4.9914,
        },
        "Ville Nouvelle": {
            name: "Commissariat Ville Nouvelle",
            address: "Ville Nouvelle, Fès",
            latitude: 34.0378,
            longitude: -4.9997,
        },
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Fès",
            latitude: 34.0622,
            longitude: -4.9707,
        },
        Narjiss: {
            name: "Commissariat Narjiss",
            address: "Narjiss, Fès",
            latitude: 34.0372,
            longitude: -4.9782,
        },
        Saiss: {
            name: "Commissariat Saiss",
            address: "Saiss, Fès",
            latitude: 34.0329,
            longitude: -4.9822,
        },
        "Hay Al Jabal": {
            name: "Commissariat Hay Al Jabal",
            address: "Hay Al Jabal, Fès",
            latitude: 34.0406,
            longitude: -4.9926,
        },
    },
    Meknès: {
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Meknès",
            latitude: 33.8938,
            longitude: -5.5575,
        },
        "Hay Al Amal": {
            name: "Commissariat Hay Al Amal",
            address: "Hay Al Amal, Meknès",
            latitude: 33.8925,
            longitude: -5.5536,
        },
        "Quartier Al Massira": {
            name: "Commissariat Quartier Al Massira",
            address: "Quartier Al Massira, Meknès",
            latitude: 33.9007,
            longitude: -5.5531,
        },
        "Hay Moulay Ismail": {
            name: "Commissariat Hay Moulay Ismail",
            address: "Hay Moulay Ismail, Meknès",
            latitude: 33.8952,
            longitude: -5.5362,
        },
    },
    Kénitra: {
        "Hay Al Fath": {
            name: "Commissariat Hay Al Fath",
            address: "Hay Al Fath, Kénitra",
            latitude: 34.2621,
            longitude: -6.5765,
        },
        "Hay Salam": {
            name: "Commissariat Hay Salam",
            address: "Hay Salam, Kénitra",
            latitude: 34.2662,
            longitude: -6.5793,
        },
        "Moulay Ismail": {
            name: "Commissariat Moulay Ismail",
            address: "Moulay Ismail, Kénitra",
            latitude: 34.2585,
            longitude: -6.5752,
        },
    },
    Tétouan: {
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Tétouan",
            latitude: 35.5896,
            longitude: -5.3707,
        },
        "Hay Al Irfane": {
            name: "Commissariat Hay Al Irfane",
            address: "Hay Al Irfane, Tétouan",
            latitude: 35.5854,
            longitude: -5.3682,
        },
        "Hay Al Matar": {
            name: "Commissariat Hay Al Matar",
            address: "Hay Al Matar, Tétouan",
            latitude: 35.5872,
            longitude: -5.3694,
        },
    },
    Oujda: {
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Oujda",
            latitude: 34.6812,
            longitude: -1.9109,
        },
        "Hay Al Amir": {
            name: "Commissariat Hay Al Amir",
            address: "Hay Al Amir, Oujda",
            latitude: 34.6849,
            longitude: -1.9152,
        },
        "Hay Al Wifaq": {
            name: "Commissariat Hay Al Wifaq",
            address: "Hay Al Wifaq, Oujda",
            latitude: 34.6885,
            longitude: -1.9117,
        },
    },
    Tanger: {
        Malabata: {
            name: "Commissariat Malabata",
            address: "Malabata, Tanger",
            latitude: 35.7594,
            longitude: -5.8097,
        },
        "Beni Makada": {
            name: "Commissariat Beni Makada",
            address: "Beni Makada, Tanger",
            latitude: 35.7858,
            longitude: -5.8043,
        },
        Medina: {
            name: "Commissariat Medina",
            address: "Medina, Tanger",
            latitude: 35.7719,
            longitude: -5.8022,
        },
        Gzenaya: {
            name: "Commissariat Gzenaya",
            address: "Gzenaya, Tanger",
            latitude: 35.7602,
            longitude: -5.7364,
        },
        Charf: {
            name: "Commissariat Charf",
            address: "Charf, Tanger",
            latitude: 35.7713,
            longitude: -5.8198,
        },
        "Médina Anciénne": {
            name: "Commissariat Médina Anciénne",
            address: "Médina Anciénne, Tanger",
            latitude: 35.7694,
            longitude: -5.8056,
        },
    },
    Agadir: {
        Talborjt: {
            name: "Commissariat Talborjt",
            address: "Talborjt, Agadir",
            latitude: 30.4205,
            longitude: -9.5982,
        },
        "Hay Dakhla": {
            name: "Commissariat Hay Dakhla",
            address: "Hay Dakhla, Agadir",
            latitude: 30.4153,
            longitude: -9.6021,
        },
        Anza: {
            name: "Commissariat Anza",
            address: "Anza, Agadir",
            latitude: 30.4291,
            longitude: -9.5535,
        },
        Bensergao: {
            name: "Commissariat Bensergao",
            address: "Bensergao, Agadir",
            latitude: 30.4239,
            longitude: -9.5792,
        },
        "Cité Suisse": {
            name: "Commissariat Cité Suisse",
            address: "Cité Suisse, Agadir",
            latitude: 30.4169,
            longitude: -9.5893,
        },
        "Hay Mohammadi": {
            name: "Commissariat Hay Mohammadi",
            address: "Hay Mohammadi, Agadir",
            latitude: 30.4325,
            longitude: -9.5821,
        },
    },
};


// Generate crime data
export const crimes = Array.from({ length: 300 }, (_, index) => {
    // Check if coordinates and forces are defined
    const cities = coordinates ? Object.keys(coordinates) : [];
    if (cities.length === 0) return {}; // Return an empty object if coordinates is invalid

    const city = cities[index % cities.length]; // Cycle through cities
    const districts = coordinates[city] ? Object.keys(coordinates[city]) : [];
    if (districts.length === 0) return {}; // Return an empty object if districts are invalid

    const district = districts[index % districts.length]; // Cycle through districts
    const { latitude, longitude } = coordinates[city][district];

    // Get the responsible force based on the city and district
    const citiesForce = forces ? Object.keys(forces) : [];
    if (citiesForce.length === 0) return {}; // Return an empty object if forces is invalid

    const cityForce = cities[index % citiesForce.length]; // Cycle through cities
    const districtsForce = forces[cityForce] ? Object.keys(forces[cityForce]) : [];
    if (districtsForce.length === 0) return {}; // Return an empty object if districtsForce are invalid

    const districtForce = districtsForce[index % districtsForce.length]; // Cycle through districts
    const { latitudeForce, longitudeForce, name: nameForce, address: addressForce } = forces[cityForce][districtForce];

    // Crime categories with more variety
    const categories = ['Theft', 'Murder', 'Fraud', 'Assault', 'Cybercrime', 'Vandalism', 'Drug trafficking', 'Arson', 'Kidnapping', 'Human trafficking'];
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Randomize the criminal's gender and description
    const sex = ['Male', 'Female', 'Non-binary', 'Unknown'][Math.floor(Math.random() * 4)];
    const description = `Suspect is a ${sex} with specific physical features.`;

    // Randomize the solved status
    const isSolved = Math.random() > 0.5; // 50% chance of being solved

    // Randomize crime date within a range
    const crimeDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];

    // Randomize the crime description
    const crimeDescription = `
        Crime ${index + 1} is categorized as ${category}.
        It occurred in ${district}, ${city} on ${crimeDate}.
        The case is ${isSolved ? 'solved' : 'unsolved'}.
        Responsible force: ${nameForce || 'Unknown Force'}.
    `.trim();

    return {
        id: index + 1,
        category: category,
        name: `Crime ${index + 1}`,
        criminalInfo: {
            sex: sex,
            description: description,
        },
        crimeAddress: {
            city: city,
            district: district,
        },
        longitude: longitude,
        latitude: latitude,
        isSolved: isSolved,
        crimeDate: crimeDate,
        criminalAddress: `Suspect resides in ${district}, ${city}`,
        description: crimeDescription,
        responsibleForce: {
            name: nameForce || 'Unknown Force',
            address: addressForce || 'Unknown Address',
            coordinates: {
                latitude: latitudeForce || 0,
                longitude: longitudeForce || 0,
            },
        },
    };
});
