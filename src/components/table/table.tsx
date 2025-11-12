'use client';

import { LogArrayType } from '@/schemas';
import { useFilterStore } from '@/stores/useFilterStore';

const Table = ({ data }: { data: LogArrayType }) => {
  const { filters } = useFilterStore();

  const filteredData = data.filter(row => {
    const hasActiveFilters = Object.values(filters).some(value => value);
    if (!hasActiveFilters) {
      return true;
    }
    return filters[row.type];
  });

  if (!filteredData || filteredData.length === 0) {
    return <p className="p-4 text-gray-500">Aucune donnée à afficher</p>;
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
            <tr>
              <th className="w-44 px-2 py-2 text-left font-sans text-sm font-normal text-neutral-600">
                Time
              </th>
              <th className="w-24 px-2 py-2 text-left font-sans text-sm font-normal text-neutral-600">
                Status
              </th>
              <th className="w-24 px-2 py-2 text-left font-sans text-sm font-normal text-neutral-600">
                Action
              </th>
              <th className="w-24 px-2 py-2 text-left font-sans text-sm font-normal text-neutral-600">
                Service
              </th>
              <th className="px-2 py-2 text-left font-sans text-sm font-normal text-neutral-600">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => {
              const date = new Date(row.date);

              const weekDay = date
                .toLocaleDateString('fr-FR', {
                  weekday: 'short',
                })
                .replace('.', '')
                .toUpperCase();

              const digits = date.toLocaleDateString('fr-FR', {
                day: '2-digit',
              });
              const time = date.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
              const milliseconds = date.toLocaleTimeString('fr-FR', {
                fractionalSecondDigits: 2,
              });
              return (
                <tr
                  key={rowIndex}
                  className="cursor-pointer hover:bg-neutral-100"
                >
                  <td className="px-2 align-middle tracking-wider">
                    <span className="text-[13px] text-neutral-500">
                      {weekDay}
                    </span>{' '}
                    <span className="text-[13px] text-neutral-500">
                      {digits}
                    </span>{' '}
                    <span className="text-[13px] text-neutral-800">{time}</span>
                    <span className="text-[13px] text-neutral-500">
                      .{milliseconds}
                    </span>
                  </td>
                  <td
                    className={`px-2 align-middle text-[13px] ${row.type === 'info' ? 'text-blue-600' : row.type === 'error' ? 'text-red-600' : row.type === 'warn' ? 'text-yellow-600' : 'text-neutral-600'}`}
                  >
                    {row.type}
                  </td>
                  <td className="px-2 align-middle text-[13px] text-neutral-600">
                    {row.action}
                  </td>
                  <td className="px-2 align-middle text-[13px] text-neutral-600">
                    {row.service}
                  </td>
                  <td className="px-2 align-middle text-[13px] text-neutral-600">
                    {row.message}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Table };
