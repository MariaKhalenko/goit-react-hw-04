import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Предотвращаем автоматическую прокрутку страницы
    onLoadMore(); // Вызываем функцию загрузки дополнительных изображений
  };

  return (
    <button className={css.loadMoreBtn} onClick={handleClick} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
