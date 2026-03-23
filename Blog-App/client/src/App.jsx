import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import client from './apollo';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import NewPost from './pages/NewPost';

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-[calc(100vh-57px)]">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/new" element={<NewPost />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
