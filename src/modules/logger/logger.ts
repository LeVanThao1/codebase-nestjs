
export class Logger {
    private module: string;
    constructor(module: string) {
      this.module = module;
    }
  
    static getTime() {
      return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
  
    public static warn(...msg: any[]) {
      console.warn(Logger.getTime(), '\x1b[33m[WARN]\x1b[0m', ...msg);
    }
  
    public static error(...msg: any[]) {
      console.error(Logger.getTime(), '\x1b[31m[ERROR]\x1b[0m', ...msg);
    }
  
    public static info(...msg: any[]) {
      console.log(Logger.getTime(), '\x1b[34m[INFO]\x1b[0m', ...msg);
    }
  
    public static success(...msg: any[]) {
      console.log(Logger.getTime(), '\x1b[32m[INFO]\x1b[0m', ...msg);
    }
  
    public warn(...params: any[]) {
      Logger.warn(`[${this.module}]`, ...params);
    }
  
    public info(...params: any[]) {
      Logger.info(`[${this.module}]`, ...params);
    }
  
    public error(...params: any[]) {
      Logger.error(`[${this.module}]`, ...params);
    }
  
    public success(...params: any[]) {
      Logger.success(`[${this.module}]`, ...params);
    }
  }
  