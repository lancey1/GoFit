import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import Navbar from './shared/components/Navbar';
import Post from './post/pages/Post';
import Profile from './user/pages/Profile';
import NewPost from './post/pages/NewPost';
import CollectionPosts from './collection/pages/CollectionPosts';
import NewCollection from './collection/pages/NewCollection';
import Home from './shared/pages/Home';
import MainLayout from './shared/UI/MainLayout';
import { AuthContext } from './context/AuthContext';
import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const login = useCallback((uid, name, token, expirationDate) => {
    console.log(token);
    setUserId(uid);
    setToken(token);
    setName(name);
    setIsLoggedIn(true);
    //* Generate a new time ==> 1h start from now
    //? 10 seconds for demo
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    setName(null);
    localStorage.removeItem('userData')
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      console.log(remainingTime);
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    };
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData['token'] && new Date(storedData['expiration']) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData['expiration']));
    };
  }, [login]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, token: token, name: name, login: login, logout: logout }}>
      <MainLayout>
        <Navbar />
        <section id='main-section'>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/login" exact>
              <Login />
            </Route>

            <Route path="/signup" exact>
              <Signup />
            </Route>

            <Route path="/create" exact>
              <NewPost />
            </Route>

            <Route path="/user/:userId" exact>
              <Profile />
            </Route>

            <Route path="/posts/:postId" exact>
              <Post />
            </Route>

            <Route path="/:userId/create_collection" exact>
              <NewCollection />
            </Route>

            <Route path="/:userId/collections/:collectionId" exact>
              <CollectionPosts />
            </Route>

            <Redirect to="/" />
          </Switch>
        </section>
      </MainLayout>
    </AuthContext.Provider >

  );
}

export default App;
