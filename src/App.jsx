import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import VotingPage from './pages/VotingPage';

function AppInner() {
    const { user } = useAuth();
    return user ? <VotingPage /> : <LoginPage />;
}

export default function App() {
    return (
        <AuthProvider>
            <AppInner />
        </AuthProvider>
    );
}