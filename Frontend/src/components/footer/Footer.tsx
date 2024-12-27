const Footer = () => {
  return (
    <footer className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Assistenza</h3>
            <ul className="mt-4 space-y-2">
              <li>Centro Assistenza</li>
              <li>Antidiscriminazione</li>
              <li>Supporto alla disabilità</li>
              <li>Opzioni di cancellazione</li>
              <li>Segnala problema nel quartiere</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Ospitare</h3>
            <ul className="mt-4 space-y-2">
              <li>Inserisci un Annuncio</li>
              <li>Per gli host</li>
              <li>Risorse per gli host</li>
              <li>Forum della community</li>
              <li>Ospitare responsabilmente</li>
              <li>Partecipa a una lezione gratuita sull'ospitalità</li>
              <li>Trova un co-host</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">My Urban Guide</h3>
            <ul className="mt-4 space-y-2">
              <li>Newsroom</li>
              <li>Nuove funzionalità</li>
              <li>Opportunità di lavoro</li>
              <li>Investitori</li>
              <li>Gift card</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-600">
          <p className="text-sm">© 2024 MyUrbanGuide, Inc.</p>
          <ul className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <li>Privacy</li>
            <li>Termini</li>
            <li>Mappa del sito</li>
            <li>Dettagli dell'azienda</li>
          </ul>
          <div className="flex space-x-4 mt-4 md:mt-0 items-center">
            <span>🌐 Italiano (IT)</span>
            <span>€ EUR</span>
            {/* Icone social */}
            <a href="https://facebook.com" aria-label="Facebook">
              FB
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              TW
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              IG
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
