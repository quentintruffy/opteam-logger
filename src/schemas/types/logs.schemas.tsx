import z from 'zod';

const parseISODate = (dateString: string): Date => {
  // Accepte les formats C# avec timezone: "2025-11-12T12:15:30.5099968+01:00"
  return new Date(dateString);
};

const LogSchema = z.object({
  id: z.number(),
  date: z.string().transform(val => parseISODate(val)),
  type: z.enum(['info', 'error', 'warn', 'debug']),
  action: z.string(),
  service: z.string(),
  message: z.string(),
});
const LogArraySchema = z.array(LogSchema);

type LogType = z.infer<typeof LogSchema>;
type LogArrayType = z.infer<typeof LogArraySchema>;

export { LogArraySchema, LogSchema };
export type { LogArrayType, LogType };
