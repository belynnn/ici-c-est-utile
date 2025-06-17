import { useEffect, useState } from 'react';
import MapView from './components/MapView';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddPoiForm from './components/AddPoiForm';
import { getPOIs } from './services/api';

function App() {
  const [pois, setPOIs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [filter, setFilter] = useState(''); // état local

  const filteredPOIs = pois.filter(p => !filter || p.type === filter);
  const types = [...new Set(pois.map(p => p.type))]; // liste unique

  async function refreshPOIs() {
    try {
      const res = await getPOIs();
      console.log("Données reçues du backend:", res.data);
      setPOIs(res.data);
    } catch (err) {
      console.error("Erreur lors du fetch POIs:", err);
    }
  }

  useEffect(() => {
    refreshPOIs();
  }, []);

  return (
    <main className='container'>
      <div className='sidebar'>
        <div>
          <h1><a href="#"><span>ICI C'EST</span><br />UTILE</a></h1>
        </div>

        <div>
          <div className='search'>
            <input type="search" name="search" id="search" placeholder="banc, défibrillateur, ..." />
            <input type="submit" value="🔍" />
          </div>
        </div>

        <hr />

        <div>
          <h2>Catégories</h2>
          <div className='categories'>
            <ul>
              <li><button onClick={() => setFilter('santé')}><span>❤️ </span>Santé</button></li>
              <li><button onClick={() => setFilter('famille')}><span>👥 </span>Familles</button></li>
              <li><button onClick={() => setFilter('animaux')}><span>🐾 </span>Animaux</button></li>
              <li><button onClick={() => setFilter('solidaire')}><span>🆓 </span>Solidaire</button></li>
              <li><button onClick={() => setFilter('écologie')}><span>🌱 </span>Écologie</button></li>
              <li><button onClick={() => setFilter('culture')}><span>📚 </span>Culture</button></li>
              <li><button onClick={() => setFilter('accessibilité')}><span>♿️ </span>Accessibilité</button></li>
              <li><button onClick={() => setFilter('mobilité')}><span>🚶 </span>Mobilité</button></li>
              <li><button onClick={() => setFilter('conseiller_numérique')}><span>🤖 </span>Conseiller Numérique</button></li>
            </ul>
          </div>
        </div>

        <hr />

        <div className='credits'>
          Développé avec 🧡 par Deborah Clerckx
        </div>
      </div>
      <MapView pois={filteredPOIs} />

      {/* <MapView pois={filteredPOIs} /> */}

      {/* {!loggedIn && <>
        <LoginForm onLogin={() => setLoggedIn(true)} />
        <RegisterForm />
      </>} */}

      {/* {loggedIn && (
        <>
          <button onClick={() => {
            localStorage.removeItem('token');
            setLoggedIn(false);
          }}>
            Se déconnecter
          </button>
          <AddPoiForm refreshPOIs={refreshPOIs} />
        </>
      )}

      {types.length > 0 && (
        <select onChange={e => setFilter(e.target.value)} value={filter}>
          <option value="">Tous les types</option>
          {types.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>
      )} */}
    </main>
  );
}

export default App;
