import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';
import CreateEvent from './pages/CreateEvent';
import Participants from './pages/Participants';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:eventId/participants" element={<Participants />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
