import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin();
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    onLogin();
  };

  return (
    <Container fluid className="login-page" style={{ minHeight: '100vh', background: 'white' }}>
      <Row className="h-100">
        {/* Left Side - Branding */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center p-5" 
             style={{ background: 'linear-gradient(135deg, #635bff 0%, #7c75ff 100%)', color: 'white' }}>
          <div className="text-center" style={{ maxWidth: '400px' }}>
            <h1 className="mb-4" style={{ fontSize: '3rem', fontWeight: 'bold' }}>StudMoney</h1>
            <p className="mb-4" style={{ fontSize: '1.5rem', opacity: 0.9 }}>
              Gérer votre budget étudiant en toute simplicité
            </p>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
              Prenez le contrôle de vos finances et atteignez vos objectifs académiques 
              sans stress financier. Votre avenir commence ici.
            </p>
          </div>
        </Col>

        {/* Right Side - Login Form */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center p-5">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: '600', color: '#333' }}>
              Bienvenue
            </h2>
            <p className="mb-4" style={{ color: '#666' }}>
              Connectez-vous pour gérer votre budget
            </p>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '500', color: '#333' }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '500', color: '#333' }}>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!errors.password}
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    style={{
                      backgroundColor: '#635bff',
                      borderColor: '#635bff',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Se connecter
                  </Button>
                </Form>

                <div className="text-center mb-3">
                  <span style={{ color: '#999' }}>ou</span>
                </div>

                <Button
                  variant="outline-secondary"
                  className="w-100 mb-3"
                  onClick={handleGoogleLogin}
                  style={{
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: '500',
                    borderColor: '#ddd'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" className="me-2">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.965-2.184l-2.908-2.258c-.806.54-1.837.86-3.057.86-2.35 0-4.34-1.587-5.053-3.72H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.947 10.698c-.18-.54-.282-1.117-.282-1.698s.102-1.158.282-1.698V4.97H.957C.348 6.175 0 7.55 0 9s.348 2.825.957 4.03l2.99-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.97L3.947 7.302C4.66 5.167 6.65 3.58 9 3.58z"/>
                  </svg>
                  Continuer avec Google
                </Button>

                <div className="text-center mt-4">
                  <span style={{ color: '#666' }}>Pas encore de compte? </span>
                  <a href="#" style={{ color: '#635bff', textDecoration: 'none', fontWeight: '500' }}>
                    S'inscrire
                  </a>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
