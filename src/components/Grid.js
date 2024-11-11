import React, { useState } from 'react';
import Session from './Session';

const Grid = () => {
  const initialGrid = Array(4).fill(Array(7).fill({ type: '', duration: '', interval: '', difficulty: '' }));

  const [grid, setGrid] = useState(initialGrid);
  const [isPopinOpen, setIsPopinOpen] = useState(false);
  const [currentCell, setCurrentCell] = useState(null); // Pour suivre la cellule actuelle (ligne, colonne)
  const [formData, setFormData] = useState({
    type: 'EC',
    duration: '',
    interval: '',
    difficulty: '',
  });

  // Ouvrir la popin avec les données de la cellule
  const openPopin = (weekIndex, dayIndex) => {
    setCurrentCell({ week: weekIndex, day: dayIndex });
    setFormData(grid[weekIndex][dayIndex]);
    setIsPopinOpen(true);
  };

  // Fermer la popin
  const closePopin = () => {
    setIsPopinOpen(false);
    setCurrentCell(null);
  };

  // Sauvegarder les modifications dans la cellule
  const saveChanges = () => {
    if (currentCell) {
      const updatedGrid = grid.map((week, wIndex) =>
        week.map((day, dIndex) =>
          wIndex === currentCell.week && dIndex === currentCell.day ? formData : day
        )
      );
      setGrid(updatedGrid);
    }
    closePopin(); // Fermer la popin après sauvegarde
  };

  // Gérer les changements du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Ajouter une ligne
  const addRow = () => {
    const newRow = Array(7).fill({ type: '', duration: '', interval: '', difficulty: '' });
    setGrid([...grid, newRow]);
  };

  // Supprimer une ligne de la grille
  const deleteRow = (weekIndex) => {
    const updatedGrid = grid.filter((_, index) => index !== weekIndex);
    setGrid(updatedGrid);
  };

  // Fonction pour charger un programme depuis un JSON
  const loadProgram = (programData) => {
    const formattedGrid = programData.map(week => 
      week.days.map(day => ({
        type: day.type,
        duration: day.duration,
        interval: day.interval,
        difficulty: day.difficulty
      }))
    );
    setGrid(formattedGrid);
  };

  // Charge le fichier JSON et lance l'import
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const programData = JSON.parse(e.target.result);
        loadProgram(programData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex mb-4 space-x-4">
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={addRow}>Ajouter une ligne</button>
        <input type="file" onChange={handleFileUpload} className='content-center'/>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">SEM N°</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Lundi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Mardi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Mercredi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Jeudi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Vendredi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Samedi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Dimanche</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grid.map((week, weekIndex) => (
            <tr key={weekIndex} className="bg-white hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center font-bold">SEM {weekIndex + 1}</td>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                  onClick={() => openPopin(weekIndex, dayIndex)}
                >
                  <Session day={day} />
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => deleteRow(weekIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popin */}
      {isPopinOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modifier la cellule</h2>

            <form>
              {/* Champ Type */}
              <div className="mb-4">
                <label htmlFor="type" className="block mb-2 font-medium">Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-2 py-1"
                >
                  <option value="EC">EC</option>
                  <option value="EC (T)">EC (T)</option>
                  <option value="EPI">EPI</option>
                  <option value="Repos">Repos</option>
                  <option value="Course">Course</option>
                </select>
              </div>

              {/* Champ Duration */}
              <div className="mb-4">
                <label htmlFor="duration" className="block mb-2 font-medium">Durée (minutes)</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </div>

              {/* Champ Interval */}
              <div className="mb-4">
                <label htmlFor="interval" className="block mb-2 font-medium">Intervalle</label>
                <input
                  type="text"
                  id="interval"
                  name="interval"
                  value={formData.interval}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </div>

              {/* Champ Difficulty */}
              <div className="mb-4">
                <label htmlFor="difficulty" className="block mb-2 font-medium">Difficulté</label>
                <input
                  type="text"
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </div>

              {/* Boutons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closePopin}
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={saveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
