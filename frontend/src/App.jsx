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
    const res = await getPOIs();
    setPOIs(res.data);
  }

  useEffect(() => {
    refreshPOIs();
  }, []);

  return (
    <div className="container">
      <h1>Ici C'est Utile</h1>
      <MapView pois={filteredPOIs} />

      {!loggedIn && <>
        <LoginForm onLogin={() => setLoggedIn(true)} />
        <RegisterForm />
      </>}

      {loggedIn && (
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
      )}
    </div>
  );
}

export default App;
