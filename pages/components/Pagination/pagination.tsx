import classNames from "classnames";
import React from "react";
import { PAGE, PAGE_SIZE, TOTAL } from '../../constants/pagination'
import styles from './pagination.module.css'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IProps {
    total ?: number
    page ?: number
    pageSize ?: number
    onPageChange: (page: number) => void
};

const {useState} = React;
const MAX_SHOW_PAGE_COUNT = 10
const PAGE_LEFT_BORDER = 5
const PAGE_SCALE = 3
const noop = () => {}

const Pagination: React.FC<IProps> = ({total = TOTAL, page = PAGE, pageSize = PAGE_SIZE, onPageChange = noop}) => { 
    const [currentPage, setCurrentPage] = useState(page);
    const pageCount = Math.ceil(total / pageSize)
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === pageCount
    //改变当前页面的动作
    const handleItemClick = (page: number) => {
        setCurrentPage(page)
        onPageChange(page)
    }
    //跳转到前一页
    const handlePrev = () => {
        if (isFirstPage) {
          return
        }
        handleItemClick(currentPage - 1)
    }
    //跳转到后一页
    const handleNext = () => {
        if (isLastPage) {
          return
        }
        handleItemClick(currentPage + 1)
    }
    const createPageItem = (page: number | string = ''): JSX.Element => {
        const isNumber = typeof page === 'number' //判断当前页面不为空
        return (
          <div
            key={page} 
            className={classNames(styles.item, currentPage === page && styles.active, !isNumber && styles.dotItem)}
            onClick={!isNumber ? noop : () => handleItemClick(page as number)} 
          >
            {isNumber ? page : '...'}
          </div>
        )
    }
    const createContinuousPageItems = (start: number, end: number) => {
        const pages: JSX.Element[] = []
        for (let i = start; i <= end; i++) {
          const pageItem = createPageItem(i)
          pages.push(pageItem)
        }
        return pages
    }
    const createPages = (elements: (JSX.Element | JSX.Element[])[]) => {
        let result: JSX.Element[] = []
        elements.forEach((item) => {
          const temp = Array.isArray(item) ? item : [item]
          result = [...result, ...temp]
        })
        return result
    } 
    const renderPages = () => {
        let result: JSX.Element[] = []  
        if (pageCount <= MAX_SHOW_PAGE_COUNT) {
            result = createContinuousPageItems(1, pageCount)
            return result
        }
        const KEY = {
            LEFT: 'LEFT',
            RIGHT: 'RIGHT',
        }
        const firstPage = createPageItem(PAGE)
        const lastPage = createPageItem(pageCount)
        const leftDot = createPageItem(KEY.LEFT)
        const rightDot = createPageItem(KEY.RIGHT)
        const PAGE_RIGHT_BORDER = pageCount - PAGE_LEFT_BORDER + 1
        if (currentPage <= PAGE_LEFT_BORDER) {
            result = createPages([firstPage, createContinuousPageItems(2, PAGE_LEFT_BORDER + PAGE_SCALE), rightDot, lastPage])
        } else if (currentPage >= PAGE_RIGHT_BORDER) {
            result = createPages([firstPage, leftDot, createContinuousPageItems(PAGE_RIGHT_BORDER - PAGE_SCALE, pageCount)])
        } else {
            result = createPages([
              firstPage,
              leftDot,
              createContinuousPageItems(currentPage - PAGE_SCALE, currentPage + PAGE_SCALE),
              rightDot,
              lastPage,
            ])
        }
        return result;
    }

    if (total < pageSize) {
        return null
    };

    return (
        <div className={styles.root}>
            <div className={classNames(styles.item, isFirstPage && styles.disabled)}onClick={handlePrev}>
                <ChevronLeftIcon />
            </div>
            <div className={styles.pages}>
                {renderPages()}
            </div>
            <div className={classNames(styles.item, isLastPage && styles.disabled)} onClick={handleNext}>
                <ChevronRightIcon />
            </div>
        </div>
    )
}

export default Pagination;