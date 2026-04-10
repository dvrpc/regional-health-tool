import DVRPCMini from '@/assets/dvrpc-mini.svg';

export default function Header() {
  return (
    <header className="h-15 flex pl-8 pr-4 items-center gap-4 text-dvrpc-blue-3 border-b border-dvrpc-gray-7">
      <a
        href="https://www.dvrpc.org/"
        target="_blank"
        aria-label="DVRPC Main Website"
      >
        <div className="mt-3 h-12 text-dvrpc-blue-3">
          <DVRPCMini />
        </div>
      </a>
      <h1 className="text-3xl font-bold border-l-3 pl-4">
        Regional Health Tool
      </h1>
    </header>
  );
}
