document.addEventListener("DOMContentLoaded", function () {
  const lang = navigator.language || navigator.userLanguage;
  const langCode = lang.split("-")[0]; // Get the base language code (e.g., "en" from "en-US")
  console.log(langCode);

  let translations: Record<string, any> = {};

  async function loadTranslations(langCode: string): Promise<void> {
    try {
      const response = await fetch(`/src/languages/${langCode}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      translations = await response.json();
      translatePage();
    } catch (error) {
      console.error(`Error loading translations for ${langCode}:`, error);
      // If the specific language file is not found, default to English
      if (langCode !== "en") {
        loadTranslations("en");
      }
    }
  }

  function translatePage(): void {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;

      let translation: any = translations;
      key.split(".").forEach((part) => {
        translation =
          translation && translation[part] ? translation[part] : null;
      });

      if (translation) {
        element.textContent = translation;
      } else {
        console.warn(`No translation found for key: ${key}`);
      }
    });
  }

  loadTranslations(langCode);
});
