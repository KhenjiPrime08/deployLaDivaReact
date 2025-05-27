import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Inicializa react-i18next
  .init({
    resources: {
      es: {
        translation: {
          profile: "Perfil del Usuario",
          name: "Nombre",
          email: "Correo Electrónico",
          phone: "Teléfono",
          edit: "Editar Perfil",
          appointments: "Mis Citas",
          no_appointments: "No tienes citas agendadas.",
          loading: "Cargando datos...",
          error_loading: "Error al cargar los datos."
        },
      },
      en: {
        translation: {
          profile: "User Profile",
          name: "Name",
          email: "Email",
          phone: "Phone",
          edit: "Edit Profile",
          appointments: "My Appointments",
          no_appointments: "You have no scheduled appointments.",
          loading: "Loading data...",
          error_loading: "Error loading data."
        },
      },
      de: {
        translation: {
          profile: "Benutzerprofil",
          name: "Name",
          email: "E-Mail",
          phone: "Telefon",
          edit: "Profil bearbeiten",
          appointments: "Meine Termine",
          no_appointments: "Sie haben keine geplanten Termine.",
          loading: "Daten werden geladen...",
          error_loading: "Fehler beim Laden der Daten."
        },
      }
    },
    lng: localStorage.getItem("language") || "es", // Obtiene el idioma guardado o usa español por defecto
    fallbackLng: "es", // Idioma por defecto si no se encuentra traducción
    interpolation: { escapeValue: false },
  });

// Guarda el idioma seleccionado en localStorage cuando cambia
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
