import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import Post from './views/Post'
import DressDetail from './components/DressDetail';
import EditDress from './views/EditDress';
import NewDress from './views/NewDress'
import PostDetail from './views/PostDetail';
import NewPost from './views/NewPost';
import EditPost from './views/EditPost';
import ProfileViews from './views/ProfileViews';
// import NewReview from './views/NewReview';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/dress/:dressId" element={<DressDetail />} />
        <Route path="/dress/:dressId/edit" element={<IsPrivate><EditDress /></IsPrivate>}  />
        <Route path="/dress/newdress" element={<IsPrivate><NewDress /></IsPrivate>}   />
        <Route path="/post/newpost" element={<IsPrivate><NewPost /></IsPrivate>}   />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post/:postId/edit" element={<IsPrivate><EditPost /></IsPrivate>} />
        {/* <Route path="/review/newreview" element={<NewReview />}  /> */}
        <Route path="/profile" element={<IsPrivate><ProfileViews /></IsPrivate>}  />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
