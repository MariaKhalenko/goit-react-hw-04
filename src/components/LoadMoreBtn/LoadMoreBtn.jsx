import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  const handleClick = () => {
    onLoadMore();
  };

  return (
    <button
      className={css.loadMoreBtn}
      onClick={handleClick}
      type="button"
      autoFocus
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
