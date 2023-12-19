import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { getUser } from './services/api/user';
import { isLoggedInAtom, userAtom } from './atom';

import Header from './components/header/Header';
import Footer from './components/common/Footer';

import Login from './pages/Login';
import Home from './pages/Home';
import Loading from './components/common/Loading';
import Register from './pages/Register';
import Article from './pages/Article';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const App = () => {
  const [loading, setLoading] = useState(true);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const initApp = async () => {
      const hasToken = !!localStorage.getItem('jwtToken');
      if (!hasToken) return;
      try {
        const data = await getUser();
        const { email, username, bio, image } = data.user;
        setIsLoggedIn(true);
        setUser({
          email: email,
          username: username,
          bio: bio,
          image: image,
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUser({
          email: '',
          username: '',
          bio: '',
          image: '',
        });
      }
    };

    initApp().then(() => setLoading(false));
  }, [setIsLoggedIn, setUser]);

  if (loading) return <Loading height={75}/>;

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:URLSlug" element={<Article />} />
          <Route path="/editor" element={<NewArticle />} />
          <Route path="/editor/:URLSlug" element={<EditArticle />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId/*" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App