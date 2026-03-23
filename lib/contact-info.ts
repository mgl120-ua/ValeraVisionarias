export const contactInfo = {
  phone: "617 31 45 84",
  phoneHref: "tel:+34617314584",
  phoneE164: "+34617314584",
  email: "Valeravisionarias@gmail.com",
  emailHref: "mailto:Valeravisionarias@gmail.com",
  whatsappHref: "https://wa.me/34617314584",
  addressLine1: "Calle Alicante 13, entreplanta 3",
  addressLine2: "San Vicente del Raspeig, Alicante",
  postalCode: "03690",
  fullAddress: "Calle Alicante 13, entreplanta 3, San Vicente del Raspeig, 03690, Alicante",
  mapsSearchHref:
    "https://www.google.com/maps/search/?api=1&query=Calle+Alicante+13+entreplanta+3+San+Vicente+del+Raspeig+Alicante+03690",
  mapsEmbedQuery:
    "Calle+Alicante+13,+entreplanta+3,+03690+San+Vicente+del+Raspeig,+Alicante",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Calle+Alicante+13+entreplanta+3+03690+San+Vicente+del+Raspeig+Alicante",
  hoursSummary: "Lunes a viernes de 9:00 a 20:00 y sábados de 9:00 a 14:00.",
  appointmentNote: "Atención personal solo con cita previa.",
  socialLinks: {
    instagram: "https://www.instagram.com/lvaleravisionarias?igsh=emp1N2VyZXg1cTN1&utm_source=qr",
    tiktok: "https://www.tiktok.com/@lvaleravisionarias?_r=1&_t=ZN-94lbuEN3tT8",
    idealista: "https://www.idealista.com/pro/valera-visionarias/",
  },
} as const

export const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "09:00",
    closes: "14:00",
  },
] as const
