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
import { useCallback, useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
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
