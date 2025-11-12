'use client';

import { Sidemenu, Table } from '@/components';
import { LogArrayType } from '@/schemas';
import { useLiveStore } from '@/stores/useLiveStore';
import { getAllLogs } from '@/utils/redis';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Logger',
// };

export default function LogsPage() {
  const [logs, setLogs] = useState<LogArrayType | null>(null);
  const { liveMode } = useLiveStore();

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getAllLogs();
      setLogs(logs);
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const logs = await getAllLogs();
      setLogs(logs);
    }, 10);
    return () => clearInterval(interval);
  }, [liveMode]);

  if (!logs) {
    return <div>No logs found</div>;
  }
  return (
    <div className="flex h-full flex-row">
      <Sidemenu data={logs} />
      <div className="flex-1 overflow-auto">
        <Table data={logs} />
      </div>
    </div>
  );
}
