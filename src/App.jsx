import { useState, useEffect, useRef } from "react";
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
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [mainLoading, setMainLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (searchQuery !== "") {
      setMainLoading(true);
      setError(null);
      setSearching(true);

      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${currentPage}&query=${searchQuery}&client_id=j2dKGfoZPwz7_wS0rkmgVXCHfszEyOuHoksVie8iG1Y`
        )
        .then((res) => {
          setImages((prevImages) => [...prevImages, ...res.data.results]);
          setTotalPages(res.data.total_pages);
          if (res.data.results.length === 0) {
            toast.error("Nothing was found for your request");
          }
          scrollToLoadMore();
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setMainLoading(false);
          setLoadMoreLoading(false);
          setSearching(false);
        });
    }
  }, [searchQuery, currentPage]);

  const loadMoreButtonRef = useRef(null);

  const handleSubmit = (searchQuery) => {
    if (searchQuery.trim() !== "") {
      setSearchQuery(searchQuery);

      setImages([]);
      setCurrentPage(1);
    } else {
      toast.error("Enter your search term!");
    }
  };

  const loadMoreImages = () => {
    if (currentPage < totalPages) {
      setLoadMoreLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const scrollToLoadMore = () => {
    if (loadMoreButtonRef.current) {
      loadMoreButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />

      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage error={error} />}

      {!error && mainLoading ? (
        <Loader />
      ) : (
        images.length > 0 && (
          <div>
            <ImageGallery images={images} onImageClick={openModal} />

            {!searching && !loadMoreLoading && currentPage < totalPages && (
              <LoadMoreBtn
                onLoadMore={loadMoreImages}
                loadMoreButtonRef={loadMoreButtonRef}
              />
            )}
          </div>
        )
      )}

      <ImageModal
        isOpen={modalIsOpen}
        onCloseModal={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
