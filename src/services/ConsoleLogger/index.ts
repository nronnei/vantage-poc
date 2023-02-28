import { ILogger } from '../../interfaces/ILogger';

export class ConsoleLogger implements ILogger {
  info(...args: any[]) {
    console.info(...args);
  }
  warn(...args: any[]) {
    console.warn(...args);
  }
  error(...args: any[]) {
    console.error(...args);
  }
  debug(...args: any[]) {
    console.debug(...args);
  }
}

export default new ConsoleLogger();
