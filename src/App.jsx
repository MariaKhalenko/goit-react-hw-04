import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

const App = () => {
  // Стан для зберігання списку зображень
  const [images, setImages] = useState([]);
  // Стан для зберігання поточної сторінки результатів
  const [currentPage, setCurrentPage] = useState(1);
  // Стан для зберігання загальної кількості сторінок результатів
  const [totalPages, setTotalPages] = useState(1);
  // Стан для зберігання поточного пошукового запиту
  const [searchQuery, setSearchQuery] = useState("");
  // Стан для відображення помилки
  const [error, setError] = useState(null);
  // Стан для відображення завантаження основного контенту
  const [mainLoading, setMainLoading] = useState(false);
  // Стан для відображення завантаження додаткового контенту
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  // Стан для відображення процесу пошуку нових зображень
  const [searching, setSearching] = useState(false);
  // Стан для зберігання вибраного зображення для модального вікна
  const [selectedImage, setSelectedImage] = useState(null);
  // Стан для відображення/приховування модального вікна
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (searchQuery !== "") {
      setMainLoading(true);
      setError(null); // Очищення помилки перед новим запитом
      setSearching(true);
      // Виконання HTTP-запиту при зміні пошукового запиту або номера сторінки
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${currentPage}&query=${searchQuery}&client_id=j2dKGfoZPwz7_wS0rkmgVXCHfszEyOuHoksVie8iG1Y`
        )
        .then((res) => {
          // Оновлення списку зображень та загальної кількості сторінок після успішного запиту
          setImages((prevImages) => [...prevImages, ...res.data.results]);
          setTotalPages(res.data.total_pages);
          if (res.data.results.length === 0) {
            toast.error("Nothing was found for your request");
          }
        })
        .catch((err) => {
          setError(err); // Зберігання помилки у стані
        })
        .finally(() => {
          setMainLoading(false);
          setLoadMoreLoading(false);
          setSearching(false);
        });
    }
  }, [searchQuery, currentPage]);

  // Функція для обробки відправки форми пошуку
  const handleSubmit = (searchQuery) => {
    if (searchQuery.trim() !== "") {
      setSearchQuery(searchQuery);
      // Скидання списку зображень та номера сторінки при новому пошуку
      setImages([]);
      setCurrentPage(1);
    } else {
      toast.error("Enter your search term!");
    }
  };

  // Функція для завантаження додаткових зображень
  const loadMoreImages = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      setLoadMoreLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Функція для відкриття модального вікна з вибраним зображенням
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Функція для закриття модального вікна
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      {/* Компонент рядка пошуку */}
      <SearchBar onSubmit={handleSubmit} />
      {/* Відображення повідомлення про помилку, якщо воно є */}
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage error={error} />}
      {/* Відображення індикатора завантаження під час виконання запиту */}
      {!error && mainLoading ? (
        <Loader />
      ) : (
        // Відображення галереї зображень при наявності даних і відсутності завантаження
        images.length > 0 && (
          <div>
            {/* Компонент галереї зображень */}
            <ImageGallery images={images} onImageClick={openModal} />
            {/* Компонент кнопки "Завантажити ще" */}
            {!searching && !loadMoreLoading && currentPage < totalPages && (
              <LoadMoreBtn onLoadMore={loadMoreImages} />
            )}
          </div>
        )
      )}

      {/* Компонент модального вікна */}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        image={selectedImage}
      />

      {/* Компонент для відображення сповіщень */}
    </div>
  );
};

export default App;
