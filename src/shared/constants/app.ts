import { ENV } from '@/env';
import { parseGwei } from 'viem';

export const REPO_PREFIX = 'codex';
export const BSC_GAS_PRICE = ENV === 'MAINNET' ? parseGwei('1') : parseGwei('10');
