import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../redux/reducers/userSlice'; // Assurez-vous que le chemin est correct
import '../style/user.css';

function User() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const [newUsername, setNewUsername] = useState(userData.userName || ''); // Initialisez avec l'ancien nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false); // État pour contrôler l'affichage du formulaire

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUsername(newUsername)); // Appeler le thunk pour mettre à jour le nom d'utilisateur
    setIsEditing(false); // Masquer le formulaire après la sauvegarde
  };

  const handleCancel = () => {
    setIsEditing(false); // Masquer le formulaire lorsque le bouton "Cancel" est cliqué
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userData.firstName} {userData.lastName}!
      </h1>
      {/* Afficher le bouton Edit Name si on n'est pas en mode édition */}
      {!isEditing && (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit Name
        </button>
      )}

      {/* Afficher le formulaire seulement si isEditing est vrai */}
      {isEditing && (
        <div>
          <h1>Edit user info</h1>
          <form onSubmit={handleUpdate}>
            <div className="edit-input">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                value={newUsername} // Utilisez la valeur d'état
                onChange={(e) => setNewUsername(e.target.value)} // Mettre à jour l'état lors de la saisie
              />
            </div>
            <div className="edit-input">
              <label htmlFor="first-name">First name:</label>
              <input
                type="text"
                id="first-name"
                defaultValue={userData.firstName}
                disabled={true}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="last-name">Last name:</label>
              <input
                type="text"
                id="last-name"
                defaultValue={userData.lastName}
                disabled={true}
              />
            </div>

            <div className="edit-form-buttons">
              <button className="edit-button" type="submit">
                Save
              </button>
              <button
                className="edit-button"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default User;
