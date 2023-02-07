import { Injectable } from '@nestjs/common';
import { ProgressManager } from './progress-manager';

const getRandomArbitrary = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

@Injectable()
export class AppService {
  constructor(private readonly progressManager: ProgressManager) {
    console.log(this.progressManager);
  }

  getIterationCount(): number {
    return 100;
  }

  async getData(token: string): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      this.progressManager.startSession(token, this.getIterationCount());
      try {
        const result = [];

        for (let i = 0; i < this.getIterationCount(); i++) {
          result.push(getRandomArbitrary(1, 9999));
          this.progressManager.step(token);
          await delay(getRandomArbitrary(100, 1000));
        }

        resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        this.progressManager.stopSession(token);
      }
    });
  }
}
