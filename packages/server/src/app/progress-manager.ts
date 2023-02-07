import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

export interface ProgressSession {
  token: string;
  total: number;
  counter: number;
  timerId: any;
}

@Injectable()
export class ProgressManager {
  public server: Server;
  private storage: Map<string, ProgressSession> = new Map();

  startSession(token: string, total: number, delay = 2000) {
    const currentSession = this.storage.get(token);
    if (currentSession) {
      return;
    }
    const timerId = setInterval(async () => {
      const currentSession: ProgressSession = this.storage.get(token);

      if (!currentSession) {
        return;
      }
      let progress = Math.ceil(
        (currentSession.counter / currentSession.total) * 100
      );
      if (progress > 100) {
        progress = 100;
      }
      this.server.emit(`progress-${token}`, progress);
    }, delay);
    this.storage.set(token, {
      token,
      total,
      counter: 0,
      timerId,
    });
  }

  step(token: string, value = 1) {
    const currentSession: ProgressSession = this.storage.get(token);
    if (!currentSession) {
      return;
    }
    const counter = currentSession.counter + value;
    this.storage.set(token, {
      ...currentSession,
      counter,
    });
  }

  stopSession(token: string) {
    const currentSession: ProgressSession = this.storage.get(token);
    if (currentSession) {
      clearInterval(currentSession.timerId);
      this.storage.delete(token);
    }
  }
}
