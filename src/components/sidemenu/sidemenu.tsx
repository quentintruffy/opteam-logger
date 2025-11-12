'use client';

import { LogArrayType } from '@/schemas';
import { useFilterStore } from '@/stores/useFilterStore';

const Sidemenu = ({ data }: { data: LogArrayType }) => {
  const { filters, setFilters, resetFilters } = useFilterStore();

  return (
    <div className="flex w-64 flex-col space-y-4 border-r border-neutral-200 p-2">
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm font-medium text-neutral-900">
          Filtres ({data.length})
        </p>

        <button
          onClick={resetFilters}
          className="cursor-pointer rounded-lg border border-neutral-200 px-2 py-1 text-sm text-neutral-600 duration-150 hover:border-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-medium text-neutral-900">Type</p>
        <ul className="[>li]:border-b-0 rounded-lg border border-neutral-200">
          <li className="flex flex-row items-center justify-between border-b border-neutral-200 px-2 py-1.5">
            <p className="flex flex-row items-center text-[13px]">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.info}
                onChange={() => setFilters({ ...filters, info: !filters.info })}
              />
              <span className="text-blue-600">Info</span>
            </p>
            <p className="rounded-lg bg-neutral-100 px-2 py-0.5 text-xs">
              {data.filter(log => log.type === 'info').length}
            </p>
          </li>
          <li className="flex flex-row items-center justify-between border-b border-neutral-200 px-2 py-1.5">
            <p className="flex flex-row items-center text-[13px]">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.error}
                onChange={() =>
                  setFilters({ ...filters, error: !filters.error })
                }
              />
              <span className="text-red-600">Error</span>
            </p>
            <p className="rounded-lg bg-neutral-100 px-2 py-0.5 text-xs">
              {data.filter(log => log.type === 'error').length}
            </p>
          </li>
          <li className="flex flex-row items-center justify-between border-b border-neutral-200 px-2 py-1.5">
            <p className="flex flex-row items-center text-[13px]">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.warn}
                onChange={() => setFilters({ ...filters, warn: !filters.warn })}
              />
              <span className="text-yellow-600">Warn</span>
            </p>
            <p className="rounded-lg bg-neutral-100 px-2 py-0.5 text-xs">
              {data.filter(log => log.type === 'warn').length}
            </p>
          </li>
          <li className="flex flex-row items-center justify-between px-2 py-1.5">
            <p className="flex flex-row items-center text-[13px]">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.debug}
                onChange={() =>
                  setFilters({ ...filters, debug: !filters.debug })
                }
              />
              Debug
            </p>
            <p className="rounded-lg bg-neutral-100 px-2 py-0.5 text-xs">
              {data.filter(log => log.type === 'debug').length}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Sidemenu };
