export interface GenerateAPIOptions {
    docUrl: string;
    requestLibPath: string;
    outDir?: string;
}
export declare function generateAPI(options: GenerateAPIOptions): void;
