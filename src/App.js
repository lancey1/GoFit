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
import { AuthContext } from './context/AuthContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import EditProfile from './user/components/EditProfile';
import Main from './shared/pages/Main';
import ErrorModal from './shared/components/ErrorModal';
import NewAppointment from './appointment/pages/NewAppointment';

let logoutTimer;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(user);
  const [posts, setPosts] = useState([]);

  const login = useCallback((uid, token, user, expirationDate) => {
    console.log(token);
    setUserId(uid);
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
    //* Generate a new time ==> 1h start from now
    //? 10 seconds for demo
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, user: user, expiration: tokenExpirationDate.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
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
      login(storedData.userId, storedData.token, storedData.user, new Date(storedData['expiration']));
    };
  }, [login]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let response = await fetch('http://localhost:5000/api/posts');
        let responseData = await response.json();
        setIsLoading(false);
        if (!response.ok) {
          throw new Error(responseData.message);
        };
        console.log(responseData)
        setPosts(responseData.posts);
      } catch (error) {
        console.log(error)
        setError(error.message);
      }
      setIsLoading(false);
    })();
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, token: token, user: user, login: login, logout: logout }}>

      {error && <ErrorModal error={error} onClear={() => setError(null)} />}

      <Navbar />
      <section id='main-section'>
        <Switch>
          <Route path="/home" exact>
            <Home posts={posts} />
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

          <Route path="/invite" exact>
            <NewAppointment user={useMemo(() => { if (user) return { name: user.name, id: userId } }, [userId])} />
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

          <Redirect to="/home" />
        </Switch>
      </section>

    </AuthContext.Provider >

  );
}

export default App;
