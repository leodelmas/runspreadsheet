import React, { useState } from 'react';

const Grid = () => {
  const initialGrid = Array(4).fill(Array(7).fill({ type: '', duration: '', interval: '', difficulty: '' }));

  const [grid, setGrid] = useState(initialGrid);
  const [isPopinOpen, setIsPopinOpen] = useState(false);
  const [currentCell, setCurrentCell] = useState(null); // Pour suivre la cellule actuelle (ligne, colonne)
  const [formData, setFormData] = useState({
    type: 'EC',
    duration: '',
    interval: '',
    difficulty: 1,
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

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Lundi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Mardi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Mercredi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Jeudi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Vendredi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Samedi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Dimanche</th>
          </tr>
        </thead>
        <tbody>
          {grid.map((week, weekIndex) => (
            <tr key={weekIndex} className="bg-white hover:bg-gray-50">
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className="border border-gray-300 px-4 py-2 text-center cursor-pointer"
                  onClick={() => openPopin(weekIndex, dayIndex)}
                >
                  {day.type ? `${day.type} (${day.duration}min)` : 'Cliquez pour ajouter'}
                </td>
              ))}
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
                  type="number"
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-2 py-1"
                  min="1"
                  max="10"
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
