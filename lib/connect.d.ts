export declare function runScriptBatch(commands: any, options?: object): Promise<{}>;
export declare function bind(func: any, config: any): (event: any, ctx: any, callback: any) => Promise<void>;
export interface IConnectOption {
    $env?: string;
    $init?: string;
    [key: string]: any;
}
export default function connect(config: IConnectOption, option: any): (origin: any) => void;
