const bDomNode = !!(typeof global=="object"&&global.process&&global.process.release&&global.process.release.name&&typeof HTMLCanvasElement=="undefined");
const bWorkerNode = !!(typeof global=="object"&&global.process&&global.process.release&&global.process.release.name);
const bSSR = !bDomNode && typeof self=="undefined";
const domGlobalThis = (bDomNode?global:(bSSR?{}:self)) as any;
const workerGlobalThis = (bWorkerNode?global:self) as any;

export { bDomNode, bWorkerNode, bSSR, domGlobalThis, workerGlobalThis }
