import Link from "next/link";

type Props = {
  topic: string;
  page: string | undefined;
  prevPage: string | null;
  nextPage: string | null;
};
function Footer({ topic, page, prevPage, nextPage }: Props) {
  if (!prevPage && !nextPage) return;

  const PageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      PageNums.push(i);
    }
  }

  const nextPageArea = nextPage ? (
    <Link
      href={`/results/${topic}/${nextPage}`}
      className={!prevPage ? "mx-auto" : ""}
    >
      {!prevPage ? "more" : null}
    </Link>
  ) : null;

  const prevPageArea = prevPage ? (
    <>
      <Link
        href={`/results/${topic}/${prevPage}`}
        className={!nextPage ? "mx-auto" : ""}
      >
        {!prevPage ? "more" : null}
      </Link>
      {PageNums.map((num) =>
        page && num === parseInt(page) ? (
          num
        ) : (
          <Link href={`/results/${topic}/${num}`} className="underline" >{num}</Link>
        )
      )}
    </>
  ) : null;

  return (
    <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto" >
        {prevPageArea}
        {nextPageArea}
    </footer>
  );
}

export default Footer;
