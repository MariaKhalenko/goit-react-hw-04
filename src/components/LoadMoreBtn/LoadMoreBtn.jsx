import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore, loadMoreButtonRef, firstNewImageRef }) => {
  const handleClick = () => {
    onLoadMore();
    scrollToFirstNewImage();
  };

  const scrollToFirstNewImage = () => {
    if (firstNewImageRef.current) {
      firstNewImageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <button
      ref={loadMoreButtonRef}
      className={css.loadMoreBtn}
      onClick={handleClick}
      type="button"
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
