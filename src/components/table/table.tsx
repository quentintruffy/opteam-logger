'use client';

import { LogArrayType, LogType } from '@/schemas';
import { useFilterStore } from '@/stores/useFilterStore';
import { useLiveStore } from '@/stores/useLiveStore';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

const Table = ({ data }: { data: LogArrayType }) => {
  const { filters } = useFilterStore();
  const [selectedLog, setSelectedLog] = useState<LogType | null>(null);
  const { liveMode, setLiveMode, resetLiveMode } = useLiveStore();

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
    <div className="flex h-full w-full overflow-hidden">
      <div className={`overflow-y-auto ${selectedLog ? 'flex-1' : 'w-full'}`}>
        <table className="w-full">
          <thead className="sticky top-0 z-10 h-12 border-b border-neutral-200 bg-white">
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
            <tr className="h-1"></tr>
            <tr className="bg-blue-100 text-sm font-medium tracking-wide text-blue-600">
              <td className="rounded-l-xl">
                <button
                  className="flex flex-row items-center gap-2 py-1.5 pl-2"
                  onClick={() => setLiveMode(!liveMode)}
                >
                  {liveMode ? (
                    <Pause className="fill-blue-600" size={14} />
                  ) : (
                    <Play className="fill-blue-600" size={14} />
                  )}{' '}
                  Live mode
                </button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td className="rounded-r-xl"></td>
            </tr>
            <tr className="h-1"></tr>
            {filteredData.map((row, rowIndex) => {
              const date = new Date(row.date);
              const isSelected = selectedLog?.id === row.id;

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
                  className={`cursor-pointer ${isSelected ? 'bg-yellow-100/75 hover:bg-yellow-100' : 'hover:bg-neutral-100'}`}
                  onClick={() => setSelectedLog(row)}
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
      {selectedLog && (
        <div className="flex h-full w-96 shrink-0 flex-col border-l border-neutral-200 bg-white">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 px-3">
            <h3 className="font-sans text-sm font-semibold text-neutral-800">
              Détails du log
            </h3>
            <button
              onClick={() => setSelectedLog(null)}
              className="rounded p-1 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
              aria-label="Fermer"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">
                  Date et heure
                </label>
                <p className="text-sm text-neutral-800">
                  {new Date(selectedLog.date).toLocaleString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">
                  Type
                </label>
                <p
                  className={`text-sm font-medium ${selectedLog.type === 'info' ? 'text-blue-600' : selectedLog.type === 'error' ? 'text-red-600' : selectedLog.type === 'warn' ? 'text-yellow-600' : 'text-neutral-600'}`}
                >
                  {selectedLog.type}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">
                  Action
                </label>
                <p className="text-sm text-neutral-800">{selectedLog.action}</p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">
                  Service
                </label>
                <p className="text-sm text-neutral-800">
                  {selectedLog.service}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">
                  Message
                </label>
                <p className="text-sm wrap-break-word whitespace-pre-wrap text-neutral-800">
                  {selectedLog.message}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">
                  Raw
                </label>
                <p className="text-sm text-neutral-800">{selectedLog.raw}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Table };
