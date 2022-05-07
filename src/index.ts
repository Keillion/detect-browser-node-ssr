const bNode = !!(typeof global=="object"&&global.process&&global.process.release&&global.process.release.name&&typeof HTMLCanvasElement=="undefined");
const bSSR = !bNode && typeof self=="undefined";
const globalThis = (bNode?global:(bSSR?{}:self)) as any;

export { bNode, bSSR, globalThis }
