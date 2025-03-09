
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation avec des exemples de réservations
    let reservations = [
        
    ];
    let nextId = 4;
    
    // Éléments DOM
    const form = document.getElementById('reservationForm');
    const formMode = document.getElementById('formMode');
    const reservationId = document.getElementById('reservationId');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const destinationInput = document.getElementById('destination');
    const cooperativeSelect = document.getElementById('cooperative');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const reservationList = document.getElementById('reservationList');
    const statusMessage = document.getElementById('statusMessage');
    
    // Afficher les réservations existantes
    displayReservations();
    
    // Gestionnaire de soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (formMode.value === 'add') {
            // Ajouter une nouvelle réservation
            const newReservation = {
                id: nextId++,
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                phoneNumber: phoneNumberInput.value.trim(),
                destination: destinationInput.value.trim(),
                cooperative: cooperativeSelect.value
            };
            
            reservations.push(newReservation);
            showStatusMessage('Réservation ajoutée avec succès', 'success');
        } else {
            // Mettre à jour une réservation existante
            const id = parseInt(reservationId.value);
            const index = reservations.findIndex(r => r.id === id);
            
            if (index !== -1) {
                reservations[index] = {
                    id,
                    firstName: firstNameInput.value.trim(),
                    lastName: lastNameInput.value.trim(),
                    phoneNumber: phoneNumberInput.value.trim(),
                    destination: destinationInput.value.trim(),
                    cooperative: cooperativeSelect.value
                };
                
                showStatusMessage('Réservation mise à jour avec succès', 'success');
                resetForm();
            }
        }
        
        displayReservations();
        form.reset();
    });
    
    // Annuler l'édition
    cancelBtn.addEventListener('click', resetForm);
    
    // Fonction pour afficher les réservations
    function displayReservations() {
        reservationList.innerHTML = '';
        
        if (reservations.length === 0) {
            reservationList.innerHTML = '<li class="reservation-item">Aucune réservation trouvée</li>';
            return;
        }
        
        reservations.forEach(reservation => {
            const li = document.createElement('li');
            li.className = 'reservation-item';
            
            li.innerHTML = `
                <div class="reservation-info">
                    <strong>${reservation.firstName} ${reservation.lastName}</strong> - 
                    ${reservation.destination} (${reservation.cooperative})
                    <div>Tél: ${reservation.phoneNumber}</div>
                </div>
                <div class="action-buttons">
                    <button class="edit-button" data-id="${reservation.id}">Modifier</button>
                    <button class="delete-button" data-id="${reservation.id}">Supprimer</button>
                </div>
            `;
            
            reservationList.appendChild(li);
        });
        
        // Ajouter les écouteurs d'événements pour les boutons d'action
        document.querySelectorAll('.edit-button').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editReservation(id);
            });
        });
        
        document.querySelectorAll('.delete-button').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteReservation(id);
            });
        });
    }
    
    // Fonction pour éditer une réservation
    function editReservation(id) {
        const reservation = reservations.find(r => r.id === id);
        
        if (reservation) {
            formMode.value = 'edit';
            reservationId.value = id;
            
            firstNameInput.value = reservation.firstName;
            lastNameInput.value = reservation.lastName;
            phoneNumberInput.value = reservation.phoneNumber;
            destinationInput.value = reservation.destination;
            cooperativeSelect.value = reservation.cooperative;
            
            submitBtn.textContent = 'Mettre à jour';
            cancelBtn.style.display = 'block';
            
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Fonction pour supprimer une réservation
    function deleteReservation(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) {
            reservations = reservations.filter(r => r.id !== id);
            displayReservations();
            showStatusMessage('Réservation supprimée avec succès', 'success');
        }
    }
    
    // Fonction pour réinitialiser le formulaire
    function resetForm() {
        form.reset();
        formMode.value = 'add';
        reservationId.value = '';
        submitBtn.textContent = 'Ajouter';
        cancelBtn.style.display = 'none';
    }
    
    // Fonction pour afficher un message de statut
    function showStatusMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
        statusMessage.style.display = 'block';
        
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
    }
});
 