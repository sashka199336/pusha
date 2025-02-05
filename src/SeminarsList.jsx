import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import styles from "./SeminarsList.module.css"; // иМпорт css-мОДУЛЯ

// Установить элемент приложения для модального окна
Modal.setAppElement("#root");

const SeminarsList = () => {
  const [seminars, setSeminars] = useState([]); // Список семинаров
  const [isModalOpen, setIsModalOpen] = useState(false); // Статус модального окна
  const [currentSeminar, setCurrentSeminar] = useState(null); // Данный семинар для редактирования
  const [loading, setLoading] = useState(true); // Статус загрузки данных
  const [error, setError] = useState(null); // Ошибки при запросах

  // Загрузка данных семинаров
  useEffect(() => {
    axios
      .get("http://localhost:5000/seminars")
      .then((response) => {
        setSeminars(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Функция которое открывает модальное окно с выбранным семинаром
  const openEditModal = (seminar) => {
    setCurrentSeminar(seminar); // Настройка текущеего семинара
    setIsModalOpen(true); // Открыть модальное окно
  };

  // Функция для редактирования семинара
  const handleEdit = (updatedSeminar) => {
    axios
      .put(`http://localhost:5000/seminars/${updatedSeminar.id}`, updatedSeminar)
      .then(() => {
        setSeminars(
          seminars.map((seminar) =>
            seminar.id === updatedSeminar.id ? updatedSeminar : seminar
          )
        );
        setIsModalOpen(false); // Закрытие модального окна
      })
      .catch((err) => alert("Failed to update seminar: " + err.message));
  };

  // Функция для удаления семинара
  const deleteSeminar = (id) => {
    if (window.confirm("Are you sure you want to delete this seminar?")) {
      axios
        .delete(`http://localhost:5000/seminars/${id}`)
        .then(() => {
          setSeminars(seminars.filter((seminar) => seminar.id !== id)); // Удаление семинара из локального состояния
        })
        .catch((err) => alert("Failed to delete seminar: " + err.message));
    }
  };

  // Проверка состояния загрузки
  if (loading) return <p>Loading seminars...</p>;
  if (error) return <p>Error: {error}</p>;

  // Показ списка семинаров и модального окна
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Seminars</h2>
      <ul>
        {seminars.map((seminar) => (
          <li key={seminar.id} className={styles.seminarItem}>
            <h3>{seminar.title}</h3>
            <p>{seminar.description}</p>
            <p>Date: {seminar.date}</p>
            <button
              className={styles.editButton}
              onClick={() => openEditModal(seminar)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => deleteSeminar(seminar.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Модальное окно для редактирования семинара */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h2>Edit Seminar</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(currentSeminar);
            }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={currentSeminar.title}
                onChange={(e) =>
                  setCurrentSeminar({ ...currentSeminar, title: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={currentSeminar.description}
                onChange={(e) =>
                  setCurrentSeminar({
                    ...currentSeminar,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={currentSeminar.date}
                onChange={(e) =>
                  setCurrentSeminar({ ...currentSeminar, date: e.target.value })
                }
              />
            </div>
            <button className={styles.button} type="submit">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SeminarsList;