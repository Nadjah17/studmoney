import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import type { Budget } from '../types';
import { formatCurrency } from '../utils/currency';
import { saveBudget } from '../utils/localStorage';

interface SettingsProps {
  budget: Budget;
  onUpdateBudget: (budget: Budget) => void;
}

export const Settings: React.FC<SettingsProps> = ({ budget, onUpdateBudget }) => {
  const [totalBudget, setTotalBudget] = useState(budget.totalBudget.toString());
  const [alertThreshold, setAlertThreshold] = useState(budget.alertThreshold.toString());
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ totalBudget?: string; alertThreshold?: string }>({});

  useEffect(() => {
    setTotalBudget(budget.totalBudget.toString());
    setAlertThreshold(budget.alertThreshold.toString());
  }, [budget]);

  const validateForm = (): boolean => {
    const newErrors: { totalBudget?: string; alertThreshold?: string } = {};

    const budgetValue = parseFloat(totalBudget);
    if (!totalBudget || isNaN(budgetValue) || budgetValue <= 0) {
      newErrors.totalBudget = 'Le budget total doit être supérieur à 0';
    }

    const thresholdValue = parseFloat(alertThreshold);
    if (!alertThreshold || isNaN(thresholdValue) || thresholdValue < 0 || thresholdValue > 100) {
      newErrors.alertThreshold = 'Le seuil d\'alerte doit être entre 0 et 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    const newBudget: Budget = {
      totalBudget: parseFloat(totalBudget),
      alertThreshold: parseFloat(alertThreshold),
    };

    saveBudget(newBudget);
    onUpdateBudget(newBudget);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="dashboard" style={{ minHeight: '100vh', backgroundColor: '#f4f6fb' }}>
      <div className="container-fluid py-4">
        <h1 className="mb-4" style={{ fontWeight: 'bold', color: '#333', fontSize: '2.5rem' }}>
          Paramètres
        </h1>

        <div className="row">
          <div className="col-lg-8">
            <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
              <Card.Body className="p-4">
                <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
                  Configuration du budget
                </h4>

                {success && (
                  <Alert variant="success" className="mb-3" style={{ borderRadius: '8px' }}>
                    Paramètres sauvegardés avec succès!
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '500', color: '#333', fontSize: '1.1rem' }}>
                      Budget mensuel total
                    </Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="2000.00"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      isInvalid={!!errors.totalBudget}
                      style={{ borderRadius: '8px', padding: '12px', fontSize: '1.1rem' }}
                    />
                    <Form.Text className="text-muted">
                      Budget actuel: {formatCurrency(budget.totalBudget)}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.totalBudget}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '500', color: '#333', fontSize: '1.1rem' }}>
                      Seuil d'alerte (%)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      placeholder="80"
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(e.target.value)}
                      isInvalid={!!errors.alertThreshold}
                      style={{ borderRadius: '8px', padding: '12px', fontSize: '1.1rem' }}
                    />
                    <Form.Text className="text-muted">
                      Vous recevrez une alerte lorsque {budget.alertThreshold}% de votre budget sera utilisé.
                      Actuellement: {budget.alertThreshold}%
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.alertThreshold}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: '#635bff',
                      borderColor: '#635bff',
                      borderRadius: '8px',
                      padding: '12px 30px',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    Enregistrer les paramètres
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mt-4" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
              <Card.Body className="p-4">
                <h4 className="mb-3" style={{ fontWeight: '600', color: '#333' }}>
                  Informations
                </h4>
                <div style={{ color: '#666', lineHeight: '1.8' }}>
                  <p>
                    <strong>Budget mensuel:</strong> Définissez votre budget total pour le mois en cours.
                    Ce montant sera utilisé pour calculer vos dépenses restantes.
                  </p>
                  <p>
                    <strong>Seuil d'alerte:</strong> Définissez le pourcentage d'utilisation du budget 
                    à partir duquel vous souhaitez recevoir une alerte. Par exemple, 80% signifie que 
                    vous recevrez une alerte lorsque vous aurez dépensé 80% de votre budget.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

