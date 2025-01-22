// jest.setup.ts
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from 'text-encoding';

// Polyfill TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
