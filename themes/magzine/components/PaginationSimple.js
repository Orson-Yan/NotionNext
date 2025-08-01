import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 简易翻页插件
 * @param page 当前页码
 * @param totalPage 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationSimple = ({ page, totalPage }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const currentPage = +page
  const showNext = currentPage < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')

  return (
    <div className='my-10 flex justify-between font-medium text-black dark:text-gray-100 space-x-2'>
      <SmartLink
        href={{
          pathname:
            currentPage === 2
              ? `${pagePrefix}/`
              : `${pagePrefix}/page/${currentPage - 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        passHref
        rel='prev'
        className={`${
          currentPage === 1 ? 'invisible' : 'block'
        } text-center w-full duration-200 px-4 py-2 hover:border-gray-500 border-b-2 hover:font-bold`}>
        ←{locale.PAGINATION.PREV}
      </SmartLink>
      <SmartLink
        href={{
          pathname: `${pagePrefix}/page/${currentPage + 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        passHref
        rel='next'
        className={`${
          +showNext ? 'block' : 'invisible'
        } text-center w-full duration-200 px-4 py-2 hover:border-gray-500 border-b-2 hover:font-bold`}>
        {locale.PAGINATION.NEXT}→
      </SmartLink>
    </div>
  )
}

export default PaginationSimple
