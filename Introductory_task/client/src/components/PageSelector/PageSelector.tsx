import { FC } from "react";
import "./PageSelector.css";

interface IPageSelectorProps {
  currentPage: number;
  canSelectNext: boolean;
  canSelectPrev: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export const PageSelector: FC<IPageSelectorProps> = ({
  currentPage,
  onNextClick,
  onPrevClick,
  canSelectNext,
  canSelectPrev,
}) => {
  return (
    <div className={"page-selector"}>
      <button
        disabled={!canSelectPrev}
        className={"page-selector__button"}
        onClick={onPrevClick}
      >
        {"<"}
      </button>
      <span className={"page-selector__page"}>{currentPage}</span>

      <button
        disabled={!canSelectNext}
        className={"page-selector__button"}
        onClick={onNextClick}
      >
        {">"}
      </button>
    </div>
  );
};
