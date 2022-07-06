import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostList from './post/components/PostList';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import Post from './post/pages/Post';
import Profile from './user/pages/Profile';
import NewPost from './post/pages/NewPost';
import CollectionPosts from './collection/pages/CollectionPosts';
import NewCollection from './collection/pages/NewCollection';
import Home from './shared/pages/Home';

function App() {

  return (
    <div className="App">
      <Navbar />


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

        <Route path="/:userId" exact>
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

      <Footer />
    </div>
  );
}

export default App;
